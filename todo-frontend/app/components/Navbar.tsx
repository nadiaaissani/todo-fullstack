"use client";

import Link from "next/link";
import { FaUserPlus } from "react-icons/fa"; // icône pour Inscription
import { MdDashboard } from "react-icons/md"; // icône style tableau

export default function Navbar() {
    return (
        <nav className="sticky top-0 bg-gray-400 text-gray-800 p-4 flex justify-between items-center shadow-md z-50">

            {/* Logo du site */}
            <div className="flex items-center space-x-2">
                <MdDashboard size={32} className="text-blue-500 animate-spin" /> {/* style “tache” */}
                <h1 className="text-4xl font-bold">Mon Site</h1>
            </div>

            {/* Liens de navigation */}
            <div className="flex items-center space-x-6">
                <Link href="/" className="text-xl">Accueil</Link>

                <Link href="/register" className="flex items-center space-x-1">
                    <FaUserPlus size={18} />
                    <span className="text-xl">Inscription</span>
                </Link>
            </div>
        </nav>
    );
}
