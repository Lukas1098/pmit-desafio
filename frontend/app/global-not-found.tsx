'use client'

import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap",
});

export default function GlobalNotFound() {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <html lang="es" className={manrope.className}>
            <body className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br bg-white px-4">
                <div className="animate-fadeIn space-y-6">
                    <h1 className="text-8xl font-bold bg-clip-text text-black">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-black">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        Lo sentimos, la página que estás buscando no existe o fue movida.
                    </p>
                    <button
                        onClick={handleGoHome}
                        className="inline-block mt-6 py-3 text-black rounded-full transition-colors cursor-pointer"
                    >
                        Volver al inicio
                    </button>
                </div>
            </body>
        </html>
    );
}