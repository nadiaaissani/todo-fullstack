import express from "express";
import Project from "../models/Project.js";
const router = express.Router();

// Visualiser tous les projets
router.get("/", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Ajouter un projet
router.post("/", async (req, res) => {
    try {
        const project = new Project(req.body); // créer un nouveau projet avec les données reçues
        const savedProject = await project.save(); // sauvegarder dans la base
        res.status(201).json(savedProject); // renvoyer le projet créé
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création du projet" });
    }
});

// Modifier un projet
router.put("/:id", async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });
    res.json(project);
});

// Supprimer un projet
router.delete("/:id", async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });
    res.json({ message: "Projet supprimé" });
});

export default router;
