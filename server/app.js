import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/database.js";
import pasteRoutes from "./routes/pasteRoutes.js";

// Env variables
dotenv.config();

// Connect MongoDB
await connectDB();

const app = express();
const PORT = process.env.PORT;

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.use("/api/pastes", pasteRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
