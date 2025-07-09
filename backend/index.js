import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import router from "./routes/router.js";
import connectToDatabase from "./DB/database.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import paymentRoutes from "./routes/payment.js";
import batchRoutes from "./routes/batchRoutes.js";

import batchChatSocket from "./sockets/batchChat.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Pass io to your socket handler
batchChatSocket(io);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", router);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/batches", batchRoutes);

// Start server with HTTP server (not app.listen)
server.listen(port, () => {
  connectToDatabase();
  //console.log(`Example app listening on port ${port}`);
});
