import { useMemo, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Lightbulb,
  CalendarClock,
  MessageCircle,
  ShieldCheck,
  Clock,
  Video,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { sendParentSms, sendTeacherSms } from "@/lib/sms";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api-config";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const featureHighlights = [
  {
    icon: Brain,
    title: "Live Mentoring",
    description: "Connect with subject experts who explain concepts visually and interactively.",
  },
  {
    icon: Lightbulb,
    title: "Doubt Solving",
    description: "Share whiteboard snapshots or questions and get instant clarifications.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Slots",
    description: "Book 1-hour sessions whenever you need urgent help before tests.",
  },
  {
    icon: MessageCircle,
    title: "Career Guidance",
    description: "Discuss roadmaps, higher studies, and competitive exam strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Private",
    description: "Secure links shared only with student and assigned mentor via SMS.",
  },
  {
    icon: Clock,
    title: "Session Recording",
    description: "Downloadable recap link emailed to you for revision (coming soon).",
  },
];

const formatTime = (date: Date | null) => {
  if (!date) return null;
  return date.toLocaleString("en-IN", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  });
};

const LiveDoubtSession = () => {
  const [studentName, setStudentName] = useState("");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      setPaymentStatus("error");
      setStatusMessage("Failed to load payment gateway. Please refresh the page.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sessionSummary = useMemo(() => {
    if (!studentName || !topic || !sessionExpiresAt) return "";
    return `${studentName} booked a Live Doubt Session on "${topic}" valid until ${formatTime(
      sessionExpiresAt
    )}. Join link: ${meetLink}`;
  }, [studentName, topic, sessionExpiresAt, meetLink]);

  const generateMeetLink = () => {
    const slug = `LearnNest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    return `https://meet.jit.si/${slug}`;
  };

  const handlePaymentSuccess = async (
    paymentId: string,
    orderId: string,
    signature: string
  ) => {
    try {
      setStatusMessage("Verifying payment...");
      
      // Verify payment with backend
      const response = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
          studentName,
          topic,
          note,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const { meetLink: link, expiresAt } = data.data;
        setMeetLink(link);
        setSessionExpiresAt(new Date(expiresAt));

        // Send SMS notifications
        const parentSmsBody = `Your child has spent ₹5 for Live doubt session on ${topic}. Session link sent to student.`;
        const studentSmsBody = `Live session confirmed for ${studentName} on ${topic}. Join: ${link} (valid till ${formatTime(
          new Date(expiresAt)
        )}).`;

        await Promise.all([
          sendParentSms(parentSmsBody),
          sendTeacherSms(
            `New Live Doubt Session - Student: ${studentName}, Topic: ${topic}. Join: ${link}`
          ),
        ]);

        setPaymentStatus("success");
        setStatusMessage("Payment successful! Meeting link shared via SMS.");
      } else {
        throw new Error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Payment verification failed. Please contact support."
      );
    } finally {
      setIsPaying(false);
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!studentName.trim() || !topic.trim()) {
      setPaymentStatus("error");
      setStatusMessage("Please fill in student name and topic to proceed.");
      return;
    }

    if (!razorpayLoaded) {
      setPaymentStatus("error");
      setStatusMessage("Payment gateway is loading. Please wait and try again.");
      return;
    }

    setIsPaying(true);
    setPaymentStatus("idle");
    setStatusMessage("Creating payment order...");

    try {
      // Create order on backend
      const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 5,
          currency: "INR",
          studentName,
          topic,
          note,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment order");
      }

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "LearnNest",
        description: `Live Doubt Session - ${topic}`,
        order_id: data.order.id,
        handler: function (response: any) {
          handlePaymentSuccess(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: studentName,
          email: "",
          contact: "",
        },
        notes: {
          studentName,
          topic,
          note: note || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setIsPaying(false);
            setPaymentStatus("error");
            setStatusMessage("Payment cancelled by user.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      setPaymentStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while setting up the payment. Please try again."
      );
      setIsPaying(false);
    }
  };

  const handleCopyLink = async () => {
    if (!meetLink) return;
    try {
      await navigator.clipboard.writeText(meetLink);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy link"), 1200);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Premium support</p>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Live Doubt Solving Sessions</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Book a 1-hour interactive meeting with our mentors for instant clarification, exam prep, or
              career guidance. Pay ₹5 via UPI and get the secure meet link instantly.
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            ₹5 / 1 hour
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Why learners love live sessions</CardTitle>
            <CardDescription>Personalised, fast, and designed for real exam pressure.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-muted/30 p-4 flex gap-3 items-start"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
          <CardHeader>
            <CardTitle>Pay ₹5 now & secure your slot</CardTitle>
            <CardDescription>Razorpay secure payment • instant confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handlePayment}>
              <div className="space-y-2">
                <Label htmlFor="studentName">Student name</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student full name"
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Focus topic / subject</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Organic chemistry, Calculus revision"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Additional note (optional)</Label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Share syllabus context, exam date, or preferred mentor."
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Pay ₹5 & start session"}
              </Button>
            </form>

            {statusMessage && (
              <div
                className={cn(
                  "mt-4 rounded-lg border px-3 py-2 text-sm flex items-center gap-2",
                  paymentStatus === "success"
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-600"
                    : paymentStatus === "error"
                      ? "border-destructive/40 bg-destructive/10 text-destructive"
                      : "border-primary/40 bg-primary/5 text-primary"
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusMessage}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {meetLink && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Live meeting dashboard
              </CardTitle>
              <CardDescription>
                Share this link with anyone who needs to join. Session expires {formatTime(sessionExpiresAt)}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input value={meetLink} readOnly />
                <Button type="button" variant="outline" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  {copyLabel}
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p>
                  • We have SMSed the secure meet link to both student and mentor.
                  <br />
                  • Click the button below to join the live session in a new window.
                </p>
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => window.open(meetLink, '_blank', 'noopener,noreferrer')}
              >
                <Video className="w-5 h-5 mr-2" />
                Join Live Session Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Session brief</CardTitle>
              <CardDescription>Keep this summary handy for your mentor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground space-y-2">
                <p>
                  <span className="font-semibold text-foreground">Student:</span> {studentName || "—"}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Topic focus:</span> {topic || "—"}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Session valid till:</span>{" "}
                  {formatTime(sessionExpiresAt) || "—"}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Notes:</span> {note || "No extra notes"}
                </p>
              </div>
              <div className="rounded-lg border bg-primary/5 text-primary p-3 text-sm">
                {sessionSummary || "Complete the payment to receive the meet summary."}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LiveDoubtSession;

