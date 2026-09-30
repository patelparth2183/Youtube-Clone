import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/auth", authRoutes);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "YouTube Clone API is running"
  });
});

export default app;