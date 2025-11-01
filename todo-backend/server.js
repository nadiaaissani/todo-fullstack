import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Connexion MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB connecté"))
    .catch((err) => console.log(" Erreur MongoDB :", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur démarré sur le port ${PORT}`));
