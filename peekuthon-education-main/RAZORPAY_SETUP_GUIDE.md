# Razorpay Integration Setup Guide

This guide will help you integrate Razorpay payment gateway for the Live Doubt Session feature in LearnNest.

## Prerequisites

- A Razorpay account (Sign up at https://razorpay.com/)
- Node.js and npm installed
- Your LearnNest application setup

## Step 1: Create a Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account or log in if you already have one
3. Complete the KYC verification process (required for live mode)
4. For testing, you can use Test Mode without KYC

## Step 2: Get API Keys

1. In the Razorpay Dashboard, go to **Settings** → **API Keys**
2. Click on **Generate Test Keys** (for development) or **Generate Live Keys** (for production)
3. You'll get:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this secret and never expose it in frontend)

## Step 3: Install Backend Dependencies

Navigate to your backend directory and install the Razorpay SDK:

```powershell
cd Backend
npm install razorpay
```

## Step 4: Configure Backend Environment Variables

1. Open `Backend/.env` file (create it if it doesn't exist by copying `.env.example`)
2. Add your Razorpay credentials:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
```

**Important:** Never commit `.env` file to version control!

## Step 5: Configure Frontend Environment Variables

1. Open `frontend/.env.local` file (create it if it doesn't exist)
2. Add your Razorpay Key ID (only Key ID, NOT the secret):

```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
```

**Note:** Only the Key ID should be in the frontend. The secret key must remain in the backend only.

## Step 6: Start the Servers

### Start Backend Server

```powershell
cd Backend
npm start
```

The backend should start on `http://localhost:5000`

### Start Frontend Server

```powershell
cd frontend
npm run dev
```

The frontend should start on `http://localhost:5173`

## Step 7: Test the Payment Integration

1. Navigate to the **Live Doubt Session** page in your application
2. Fill in the student name and topic
3. Click **Pay ₹300 & start session**
4. The Razorpay payment modal will open
5. Use test credentials for testing:

### Test Card Details (Test Mode Only)

- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits (e.g., 123)
- **Expiry:** Any future date (e.g., 12/25)
- **Name:** Any name

### Test UPI (Test Mode Only)

- **UPI ID:** success@razorpay
- This will simulate a successful payment

### Test Net Banking

- Select any bank
- Username: `test`
- Password: `test`

## Step 8: Verify Payment Flow

After successful payment:

1. The payment should be verified on the backend
2. A meeting link should be generated
3. SMS notifications should be sent (if Twilio is configured)
4. The meeting link should be displayed on the page

## API Endpoints Created

The integration adds the following endpoints to your backend:

### 1. Create Order

- **Endpoint:** `POST /api/payments/create-order`
- **Purpose:** Creates a Razorpay order before payment
- **Body:**
  ```json
  {
    "amount": 300,
    "currency": "INR",
    "studentName": "John Doe",
    "topic": "Mathematics",
    "note": "Optional note"
  }
  ```

### 2. Verify Payment

- **Endpoint:** `POST /api/payments/verify-payment`
- **Purpose:** Verifies payment signature after successful payment
- **Body:**
  ```json
  {
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "signature_xxx",
    "studentName": "John Doe",
    "topic": "Mathematics",
    "note": "Optional note"
  }
  ```

### 3. Get Payment Details

- **Endpoint:** `GET /api/payments/payment/:paymentId`
- **Purpose:** Fetches payment details from Razorpay

## Security Best Practices

1. **Never expose your Key Secret** - It should only be in the backend `.env` file
2. **Always verify payment signatures** - This is done automatically in the backend
3. **Use HTTPS in production** - Razorpay requires HTTPS for live mode
4. **Enable webhook signature verification** - Set up webhooks for payment notifications
5. **Keep your dependencies updated** - Regularly update the Razorpay SDK

## Webhook Setup (Optional but Recommended)

Webhooks allow Razorpay to notify your server about payment events:

1. In Razorpay Dashboard, go to **Settings** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/payments/webhook`
3. Select events to listen to:
   - `payment.authorized`
   - `payment.failed`
   - `payment.captured`
4. Copy the webhook secret
5. Implement webhook handler in your backend (you can extend the `payments.js` route)

## Going Live

To switch from test mode to live mode:

1. Complete KYC verification in Razorpay Dashboard
2. Generate live API keys (Settings → API Keys)
3. Update both backend and frontend `.env` files with live keys:
   - Backend: `rzp_live_xxx` for both Key ID and Secret
   - Frontend: `rzp_live_xxx` for Key ID only
4. Test thoroughly with real small amounts
5. Deploy to production with HTTPS enabled

## Troubleshooting

### Payment modal not opening

- Check if Razorpay script is loaded: Open browser console and check for errors
- Verify `VITE_RAZORPAY_KEY_ID` is set correctly in frontend `.env.local`

### Payment verification failing

- Check backend console for errors
- Verify `RAZORPAY_KEY_SECRET` is correct in backend `.env`
- Ensure the order ID matches between frontend and backend

### CORS errors

- Make sure backend CORS is configured to allow your frontend URL
- Check `FRONTEND_URL` in backend `.env`

### Amount mismatch

- Razorpay expects amount in paise (1 INR = 100 paise)
- The backend automatically converts ₹300 to 30000 paise

## Support

For more information:

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Node.js SDK](https://github.com/razorpay/razorpay-node)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)

## Cost Information

- **Razorpay Transaction Fee:** 2% + GST per transaction
- For ₹300 payment: ₹6 + GST (~₹7.08) total fees
- Net amount received: ~₹292.92

## Next Steps

After successful integration, consider:

1. Setting up proper database models to store payment records
2. Implementing payment history for students
3. Adding invoice generation
4. Setting up automatic refund handling
5. Creating admin dashboard for payment management
