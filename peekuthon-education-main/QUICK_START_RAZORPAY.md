# Quick Setup Commands

## 1. Install Razorpay in Backend

```powershell
cd Backend
npm install razorpay
```

## 2. Configure Backend Environment

Create or update `Backend/.env`:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY
```

## 3. Configure Frontend Environment

Create or update `frontend/.env.local`:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

## 4. Start Backend Server

```powershell
cd Backend
npm start
```

## 5. Start Frontend Server

```powershell
cd frontend
npm run dev
```

## Test Payment Details (Test Mode)

**Card Number:** 4111 1111 1111 1111  
**CVV:** 123  
**Expiry:** 12/25  
**Name:** Any name

**UPI:** success@razorpay

## Get Razorpay Keys

1. Sign up at https://dashboard.razorpay.com/
2. Go to Settings → API Keys
3. Generate Test Keys
4. Copy Key ID and Key Secret

That's it! Your Razorpay integration is ready to test.
