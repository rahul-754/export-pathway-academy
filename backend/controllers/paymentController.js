import Razorpay from "razorpay";
import Payment from "../models/payment_schema.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("🟢 Razorpay initialized with key:", process.env.RAZORPAY_KEY_ID);

// CREATE ORDER
export const createOrder = async (req, res) => {
  const { amount, userId } = req.body;
  console.log("🛒 Creating order → Amount:", amount, "UserId:", userId);

  const options = {
    amount: amount ,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);

    // Simulated values for Postman test
    const dummy_payment_id = `pay_${Math.random().toString(36).substring(2, 15)}`;
    const body = order.id + "|" + dummy_payment_id;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Save to DB
    await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "created",
      receipt: order.receipt,
      user: userId || null,
    });

    // Return everything you need to test verify API
    res.status(200).json({
      success: true,
      message: "Order created. Use details to test /verify-payment.",
      orderDetails: {
        order_id: order.id,
        dummy_payment_id,
        simulated_signature: signature,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (err) {
    console.error("❌ Razorpay order creation failed:", err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("🔎 Verifying Payment:");
  console.log("↪️ Order ID:", razorpay_order_id);
  console.log("↪️ Payment ID:", razorpay_payment_id);
  console.log("↪️ Signature:", razorpay_signature);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log("🧮 Expected Signature:", expectedSignature);

  const isValid = expectedSignature === razorpay_signature;

  if (isValid) {
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "paid", paymentId: razorpay_payment_id }
    );
    return res.json({ success: true, message: "✅ Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "❌ Invalid signature" });
  }
};
