import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Mon Site",
  description: "Site créé avec Next.js et Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex flex-col min-h-screen ">
        {/* Navbar en haut */}
        <Navbar />

        {/* Main qui prend tout l'espace disponible */}
        <main className="grow w-full bg-gray-50">{children}</main>

        {/* Footer toujours en bas */}
        <Footer />
      </body>
    </html>
  );
}
