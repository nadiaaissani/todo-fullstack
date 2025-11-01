"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Task {
    _id: string;
    title: string;
    description: string;
    projectId: string;
}

export default function TasksPage() {
    const params = useParams();
    const projectId = params.projectId; // corrigé ici

    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tasks/${projectId}`);
            setTasks(res.data);
        } catch (err) {
            console.error("Erreur fetchTasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/tasks", {
                title,
                description,
                projectId,
            });
            setTasks([...tasks, res.data]);
            setTitle("");
            setDescription("");
            setShowForm(false);
        } catch (err) {
            console.error("Erreur handleAddTask:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Erreur handleDelete:", err);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleSaveEdit = async (id: string) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
                title: editTitle,
                description: editDescription,
            });
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
            setEditingId(null);
        } catch (err) {
            console.error("Erreur handleSaveEdit:", err);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Tâches du projet</h1>

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Annuler" : "Ajouter une tâche"}
            </button>

            {showForm && (
                <form onSubmit={handleAddTask} className="mb-6 space-y-3">
                    <input
                        type="text"
                        placeholder="Titre"
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

            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li key={task._id} className="border p-4 flex justify-between items-center rounded">
                        <div className="flex-1">
                            {editingId === task._id ? (
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
                                    <h2 className="font-semibold">{task.title}</h2>
                                    <p>{task.description}</p>
                                </>
                            )}
                        </div>

                        <div className="flex space-x-2 ml-4">
                            {editingId === task._id ? (
                                <button
                                    onClick={() => handleSaveEdit(task._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    💾
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    ✏️
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(task._id)}
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
