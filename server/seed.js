import dotenv from "dotenv";
import mongoose from "mongoose";
import Paragraph from "./models/Paragraph.js";
import fs from "fs";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("No MONGODB_URI in env. Nothing to seed.");
  process.exit(0);
}

const local = JSON.parse(fs.readFileSync("./paragraphs.json", "utf-8")).paragraphs;

(async () => {
  try {
    await mongoose.connect(uri, { dbName: "typing_speed" });
    await Paragraph.deleteMany({});
    await Paragraph.insertMany(local.map(text => ({ text })));
    console.log(`Seeded ${local.length} paragraphs.`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
