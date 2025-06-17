import express from "express";
import { createOrder } from "../controllers/paymentController.js";
import { verifyPayment } from "../controllers/paymentController.js"; // ✅ This must be defined

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment); // ✅ This must be defined

export default router;
