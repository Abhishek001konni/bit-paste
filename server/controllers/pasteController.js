import Paste from "../models/Paste.js";

// Create a new paste
export const createPaste = async (req, res) => {
  try {
    const { title, content, language, expiresAt } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required!" });
    }

    const paste = await Paste.create({ title, content, language, expiresAt });
    res.status(201).json(paste);
  } catch (err) {
    console.error("Error creating Paste: ", err);
    res.status(500).json({ error: "Server error" });
  }
};
