import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "YouTube Clone API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/videos", videoRoutes);

app.use("/api/comments", commentRoutes);

export default app;