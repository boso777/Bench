'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

type Inputs = {
    name: string;
    category: number;
    cost: number;
    quantity: number;
    image: FileList;
    datasheet: FileList;
};

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const supabase = createClient();

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    //funzione generica che gestisce l'upload di qualsiasi file in uno specifico bucket di Supabase, rinomina il file con timestamp e lo rende pubblico
    //returna l'url pubblico del file
    const uploadFile = async (bucket: string, file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
    };

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        setIsSubmitting(true);
        try {
            let imageUrl = null;
            let datasheetUrl = null;

            // Upload Immagine se presente
            if (formData.image && formData.image.length > 0) {
                imageUrl = await uploadFile('comp-images', formData.image[0]);
            }

            // Upload Datasheet se presente
            if (formData.datasheet && formData.datasheet.length > 0) {
                datasheetUrl = await uploadFile('Datasheet', formData.datasheet[0]);
            }

            // Inserimento a DB
            const { data: insertedData, error } = await supabase
                .from('Component')
                .insert({
                    Name: formData.name,
                    Category: formData.category,
                    Cost: formData.cost,
                    Quantity: formData.quantity,
                    Cover_img: imageUrl,
                    Datasheet: datasheetUrl,
                })
                .select();

            if (error) throw error;

            console.log("Inserito con successo:", insertedData);
            onClose();
        } catch (err: any) {
            console.error("Errore durante il submit:", err.message || err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-slate-100 mb-4">Nuovo Componente</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">Nome</label>
                        <input
                            type="text"
                            placeholder="Nome del componente..."
                            {...register("name", { required: "Il nome è obbligatorio" })}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                        />
                        {errors.name && <span className="text-rose-500 text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-slate-300">Categoria</label>
                        <select
                            id="category"
                            defaultValue=""
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
                        {errors.category && <span className="text-rose-500 text-xs">{errors.category.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="cost" className="text-sm font-medium text-slate-300">Costo</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="€"
                            {...register("cost")}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="quantity" className="text-sm font-medium text-slate-300">Quantità</label>
                        <input
                            type="number"
                            {...register("quantity")}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="image" className="text-sm font-medium text-slate-300">Immagine Componente</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image")}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="datasheet" className="text-sm font-medium text-slate-300">Datasheet (PDF)</label>
                        <input
                            type="file"
                            id="datasheet"
                            accept=".pdf"
                            {...register("datasheet")}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-lg p-2 transition-colors"
                        >
                            {isSubmitting ? "Salvataggio..." : "Crea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}