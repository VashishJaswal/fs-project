import mongoose from "mongoose";

const ParagraphSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Paragraph || mongoose.model("Paragraph", ParagraphSchema);
