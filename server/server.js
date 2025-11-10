import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paragraphsRouter from "./routes/paragraphs.js";

dotenv.config();

const app = express();
app.use(express.json());

const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
app.use(cors({ origin: ORIGIN }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Optional Mongo connection
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { dbName: "typing_speed" })
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("MongoDB connection failed (fallback to local JSON):", e.message));
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/api/paragraphs", paragraphsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
