import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Increase payload limits
app.use(express.json({ limit: "50mb" }));  // Increase JSON payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));  // Increase URL-encoded data limit

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173",
    credentials: true,
  })
);

// Health check endpoint for ping script
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
