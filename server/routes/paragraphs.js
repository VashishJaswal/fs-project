import express from "express";
import Paragraph from "../models/Paragraph.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback paragraphs from local JSON if MongoDB is not available or empty
function getLocalParagraphs() {
  const p = path.join(__dirname, "..", "paragraphs.json");
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf-8"));
    return data.paragraphs || [];
  } catch (e) {
    return [];
  }
}

router.get("/random", async (req, res) => {
  try {
    // Try Mongo first
    let count = 0;
    try {
      count = await Paragraph.estimatedDocumentCount();
    } catch (e) {
      // ignore if no DB
      count = 0;
    }

    if (count > 0) {
      const rand = Math.floor(Math.random() * count);
      const doc = await Paragraph.findOne().skip(rand);
      return res.json({ paragraph: doc.text, source: "mongo" });
    }

    // Fallback to local JSON
    const arr = getLocalParagraphs();
    if (arr.length === 0) return res.status(500).json({ error: "No paragraphs available" });
    const idx = Math.floor(Math.random() * arr.length);
    return res.json({ paragraph: arr[idx], source: "local" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
