"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-linear-to-r  from-gray-400 to-gray-700 border border-gray-400 shadow-xl rounded-xl p-6 ">
            <div className="flex flex-col sm:flex-row justify-between flex-wrap">

                {/* Section 1 : Infos site */}
                <div className="w-full sm:w-auto mx-5 p-5">
                    <h3 className="text-lg font-bold mb-3">Mon Site</h3>
                    <p className="text-gray-700 mb-1">Adresse : 123 rue Exemple</p>
                    <p className="text-gray-700 mb-1">Téléphone : 0123456789</p>
                    <p className="text-gray-700">Email : contact@monsite.com</p>
                </div>

                {/* Section 2 : Liens rapides */}
                <div className="w-full sm:w-auto mx-5 p-5">
                    <h4 className="text-lg font-bold mb-3">Liens rapides</h4>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="/" className="text-green-900 hover:text-cyan-950 text-lg">Accueil</a></li>
                        <li><a href="/register" className="text-green-900 hover:text-cyan-950 text-lg">Inscription</a></li>
                        <li><a href="/login" className="text-green-900 hover:text-cyan-950 text-lg">Connexion</a></li>
                        <li><a href="/contact" className="text-green-900 hover:text-cyan-950 text-lg">Contact</a></li>
                    </ul>
                </div>

                {/* Section 3 : Réseaux sociaux + Newsletter */}
                <div className="w-full sm:w-auto mx-5 p-5">
                    <h4 className="text-lg font-bold mb-3">Suivez-nous</h4>
                    <ul className="flex space-x-4 mb-4">
                        <li className="flex items-center space-x-2">
                            <FaFacebookF size={24} className="text-blue-800 hover:text-blue-700" />
                            <span>Facebook</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaTwitter size={24} className="text-blue-400 hover:text-blue-600" />
                            <span>Twitter</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaInstagram size={24} className="text-pink-500 hover:text-pink-700" />
                            <span>Instagram</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaLinkedinIn size={24} className="text-blue-700 hover:text-blue-900" />
                            <span>LinkedIn</span>
                        </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="border border-cyan-100 p-2 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none w-full sm:w-auto"
                        />
                        <button className="bg-green-900 text-white font-semibold rounded-lg p-2 hover:bg-green-800 transition w-full sm:w-auto">
                            S'abonner
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright en bas */}
            <div className="mt-6 border-t border-gray-300 pt-4">
                <p className="text-center text-gray-600 font-semibold">© 2025 Mon Site. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
