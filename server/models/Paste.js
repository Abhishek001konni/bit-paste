import mongoose from "mongoose";
import { nanoid } from "nanoid";

const pasteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(10),
  },
  title: {
    type: String,
    default: "Untitled Paste",
  },
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "plaintext",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
});

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Paste", pasteSchema);
