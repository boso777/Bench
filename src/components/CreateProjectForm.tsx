'use client'

import { useContext, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { CreateProjectModalContext } from "./CreateProjectModal"
import { User } from "@supabase/supabase-js"

type ComponentType = {
    id: number
    created_at: string
    Name: string
    Category: string
    Cost: number
    Cover_img: string
    Datasheet: string | null
}

type FormInputs = {
    title: string
    description: string
    state: "non iniziato" | "iniziato" | "completato"
    image: FileList
    components: string[]
}

export default function CreateProjectForm({ componenti }: { componenti: ComponentType[] }) {

    const { setIsOpen } = useContext(CreateProjectModalContext)
    const router = useRouter()

    const supabase = createClient();

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                setUser(data.user);
            }
        };
        fetchUser();
    }, []);


    // 2. Inizializzazione di React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        defaultValues: {
            state: "non iniziato",
            components: []
        }
    })

    // 3. Gestione del submit
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        let coverImgUrl = "";




        // Caricamento dell'immagine di copertina su Supabase Storage
        if (data.image && data.image.length > 0) {
            const file = data.image[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("projects-image")
                .upload(filePath, file);

            if (uploadError) {
                alert("Errore nel caricamento dell'immagine: " + uploadError.message);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("projects-image")
                .getPublicUrl(filePath);

            coverImgUrl = publicUrl;
        }

        const { data: newProject, error } = await supabase
            .from("projects")
            .insert({
                title: data.title,
                description: data.description,
                state: data.state,
                cover_img: coverImgUrl || null,
                user_id: user.id,
            })
            .select("id")
            .single();

        if (error || !newProject) {
            alert("Errore nella creazione del progetto: " + (error?.message || "Impossibile recuperare l'ID del progetto"));
            return;
        }

        // Inserimento dei componenti nella tabella pivot
        if (data.components && data.components.length > 0) {
            const pivotData = data.components.map((compId) => ({
                project_id: newProject.id,
                component_id: Number(compId),
            }));

            const { error: pivotError } = await supabase
                .from("projects_components")
                .insert(pivotData);

            if (pivotError) {
                alert("Errore nell'associazione dei componenti: " + pivotError.message);
                return;
            }
        }

        router.refresh(); // Ricarica la pagina per mostrare il nuovo progetto
        setIsOpen(false); // Chiude la modale a fine operazione
    }

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Nuovo Progetto</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nome Progetto */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Nome Progetto *</label>
                        <input
                            type="text"
                            {...register("title", { required: "Il nome del progetto è obbligatorio" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                            placeholder="Es. Bench Power Supply V1"
                        />
                        {errors.title && (
                            <span className="text-rose-500 text-xs mt-1 block">{errors.title.message}</span>
                        )}
                    </div>

                    {/* Descrizione Progetto */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Descrizione del Progetto</label>
                        <textarea
                            {...register("description")}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                            placeholder="Descrizione del progetto..."
                            rows={4}
                        />
                    </div>

                    {/* Stato Progetto */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Stato Progetto</label>
                        <select
                            {...register("state")}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="non iniziato">Non iniziato</option>
                            <option value="iniziato">In corso</option>
                            <option value="completato">Completato</option>
                        </select>
                    </div>

                    {/* Immagine di Copertina */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Immagine di copertina</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30"
                        />
                    </div>

                    {/* Componenti Checklist */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Componenti</label>
                        {componenti.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800">
                                {componenti.map((comp) => (
                                    <label key={comp.id} className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer hover:text-white">
                                        <input
                                            type="checkbox"
                                            value={comp.id}
                                            {...register("components")}
                                            className="rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>{comp.Name}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-xs italic">Nessun componente disponibile</p>
                        )}
                    </div>

                    {/* Azioni */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm font-medium"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium disabled:opacity-50"
                        >
                            {isSubmitting ? "Salvataggio..." : "Salva"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
