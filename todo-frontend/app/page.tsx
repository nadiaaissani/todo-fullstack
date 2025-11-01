"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Veuillez renseigner tous les champs s’il vous plaît !");
      return;
    }

    try {
      //  Utiliser la bonne route pour la connexion
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Récupérer le token
      const { token } = response.data;
      console.log("token jwt", token);
      localStorage.setItem("token", token);

      // Redirection vers le dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Erreur serveur, réessayez !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Connectez-vous</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {error && (
            <p className="text-red-600 text-sm text-center mb-3 font-medium">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-3 font-semibold hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Pas encore de compte ?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
}
