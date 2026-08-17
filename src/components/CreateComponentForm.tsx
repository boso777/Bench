'use client';
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

//inserire gli altri tipi  di input e finire il submit di datasheet e immagini

type Inputs = {
    name: string
    category: number
}

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


    // fetch delle categorie al montaggio del componente
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


    //react hook form , inizializzazione states

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    //logica di submit react hook form

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        const { data: insertedData, error } = await supabase
            .from('Component')
            .insert({ Name: formData.name, Category: formData.category })
            .select()

        if (error) {
            console.error("Errore Supabase:", error.message)
            return
        }

        console.log("Inserito con successo:", insertedData);

        onClose();

    }

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

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Nome</label>
                        <input type="text" placeholder='Nome del componente...' {...register("name")} className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Categoria</label>

                        <select id="category" defaultValue=""
                            {...register("category", { required: "Seleziona una categoria valida" })}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                        >
                            <option value="" disabled>Seleziona Categoria</option>

                            {loading ? (
                                <option value="" disabled>Caricamento...</option>
                            ) : (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.Category}
                                    </option>
                                ))
                            )}
                        </select>
                        {/* L'errore va posto FUORI dal select */}
                        {errors.category && (
                            <span className="text-rose-500 text-xs mt-1">{errors.category.message}</span>
                        )}
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
