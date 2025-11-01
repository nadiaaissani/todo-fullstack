import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/:projectId", async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des tâches" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, projectId } = req.body;
        if (!title || !description || !projectId) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        const task = new Task({ title, description, projectId });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la création de la tâche" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json({ message: "Tâche supprimée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la suppression de la tâche" });
    }
});

export default router;
