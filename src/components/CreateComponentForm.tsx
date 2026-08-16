'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Category {
    id: number;
    Category: string;
}

interface CreateComponentFormProps {
    onClose: () => void;
}

export default function CreateComponentForm({ onClose }: CreateComponentFormProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    // Effettua la fetch delle categorie al montaggio del componente
    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from("Category")
                    .select("*");

                if (error) throw error;
                setCategories(data || []);
            } catch (err) {
                console.error("Errore fetch categorie:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                {/* Pulsante per chiudere il modal */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-slate-100 mb-4">Nuovo Componente</h2>

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Nome</label>
                        <input type="text" placeholder='Nome del componente...' className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Categoria</label>
                        <select name="category" id="category" className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100">
                            {loading ? (
                                <option>Caricamento...</option>
                            ) : (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.Category}</option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="cost">Costo</label>
                        <input type="number" placeholder='€' className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="image">Immagine Componente</label>
                        <input type="file" name="image" id="image" accept="image/*" className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="datasheet">Datasheet</label>
                        <input type="file" name="datasheet" id="datasheet" accept=".pdf" className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="quantity">Quantità</label>
                        <input type="number" name="quantity" id="quantity" className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <input type="submit" value="Crea" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg p-2 cursor-pointer transition-colors" />
                    </div>
                </form>
            </div>
        </div>
    );
}
