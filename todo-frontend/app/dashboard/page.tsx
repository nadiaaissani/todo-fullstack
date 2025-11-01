"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Project {
    _id: string;
    title: string;
    description: string;
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // Récupérer les projets
    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/projects");
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Ajouter un projet
    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/projects", {
                title,
                description,
            });
            setProjects([...projects, res.data]);
            setTitle("");
            setDescription("");
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    // Supprimer un projet
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`);
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // Commencer à modifier
    const handleEdit = (project: Project) => {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditDescription(project.description);
    };

    // Sauvegarder modification
    const handleSaveEdit = async (id: string) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/projects/${id}`, {
                title: editTitle,
                description: editDescription,
            });
            setProjects(projects.map((p) => (p._id === id ? res.data : p)));
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Bouton pour afficher le formulaire */}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Annuler" : "Create Project"}
            </button>

            {/* Formulaire pour ajouter un projet */}
            {showForm && (
                <form onSubmit={handleAddProject} className="mb-6 space-y-3">
                    <input
                        type="text"
                        placeholder="Titre du projet"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Ajouter
                    </button>
                </form>
            )}

            {/* Liste des projets */}
            <ul className="space-y-3">
                {projects.map((project) => (
                    <li
                        key={project._id}
                        className="border p-4 flex justify-between items-center rounded"
                        onClick={() => router.push(`/tasks/${project._id}`)}
                    >
                        <div className="flex-1">
                            {editingId === project._id ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="border p-1 w-full rounded"
                                    />
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="border p-1 w-full rounded"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-semibold">{project.title}</h2>
                                    <p>{project.description}</p>
                                </>
                            )}
                        </div>

                        <div className="flex space-x-2 ml-4">
                            {editingId === project._id ? (
                                <button
                                    onClick={() => handleSaveEdit(project._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    💾
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    ✏️
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
