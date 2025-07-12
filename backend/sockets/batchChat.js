import BatchMessage from "../models/BatchMessage.js"; // Your Mongoose model

export default function(io) {
  io.on("connection", (socket) => {
    // Join a batch room
    socket.on("joinBatch", ({ batchId, userId }) => {
      socket.join(batchId);
    });

    // Leave a batch room
    socket.on("leaveBatch", ({ batchId, userId }) => {
      socket.leave(batchId);
    });

    // Handle sending a message
    socket.on("sendBatchMessage", async (msgObj) => {
      // Save to DB (optional, but recommended)
      const saved = await BatchMessage.create({
        batch: msgObj.batchId,
        user: msgObj.userId,
        message: msgObj.message,
        name: msgObj.name,
        timestamp: msgObj.timestamp,
      });
      // Broadcast to room
      io.to(msgObj.batchId).emit("batchMessage", {
        ...msgObj,
        id: saved._id,
      });
    });
  });
}