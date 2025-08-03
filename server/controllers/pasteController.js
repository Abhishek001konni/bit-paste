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

// Get a paste by ID
export const getPaste = async (req, res) => {
  try {
    const { id } = req.params;
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    // Check if paste has expired
    if (paste.expiresAt && paste.expiresAt < new Date()) {
      await Paste.findByIdAndDelete(id);
      return res.status(410).json({ error: "Paste has expired" });
    }

    res.status(200).json(paste);
  } catch (err) {
    console.error("Error fetching Paste: ", err);
    res.status(500).json({ error: "Server error" });
  }
};
