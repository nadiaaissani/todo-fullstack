"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Fonction d'inscription
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // Vérifications simples avant envoi
        if (!formData.name || !formData.email || !formData.password || !formData.confirmpassword) {
            setError("Tous les champs doivent être remplis !");
            return;
        }

        if (formData.password !== formData.confirmpassword) {
            setError("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            // Envoi vers le backend
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // Gestion de la réponse
            if (!res.ok) {
                const data = await res.text();
                setError(data || "Erreur lors de l’inscription");
                return;
            }

            setMessage("Inscription réussie 🎉");
            setFormData({ name: "", email: "", password: "", confirmpassword: "" });
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Erreur serveur, réessayez plus tard.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom complet"
                        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <input
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirmer le mot de passe"
                        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.confirmpassword}
                        onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                    />

                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {message && <p className="text-green-600 text-center">{message}</p>}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded p-3 font-semibold hover:bg-green-700 transition"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-700">
                    Déjà un compte ?{" "}
                    <a href="/" className="text-green-600 hover:text-green-800 underline">
                        Se connecter
                    </a>
                </p>
            </div>
        </div>
    );
}
