import express from "express";
import { createPaste, getPaste } from "../controllers/pasteController.js";

const router = express.Router();

// Route to create a new paste
router.post("/", createPaste);

// Route to get a paste by ID
router.get("/:id", getPaste);

export default router;
