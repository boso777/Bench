import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faArrowUpRightFromSquare, faMicrochip } from "@fortawesome/free-solid-svg-icons";

export type Component = {
    id: number;
    created_at: string;
    Name: string;
    Category: string;
    Cost: number;
    Cover_img: string;
    Datasheet: string | null;
};

export default function ComponentCard({ item }: { item: Component }) {
    const code = `${String(item.id).padStart(4, "0")}`;




    return (
        <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden">
            <div>
                {/* --- MEDIA COVER --- */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950/80 border-b border-slate-800/60">
                    {item.Cover_img ? (
                        <Image
                            src={item.Cover_img}
                            alt={item.Name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="eager"
                        />
                    ) : (
                        <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-600 gap-2">
                            <FontAwesomeIcon
                                icon={faMicrochip}
                                className="text-3xl text-slate-700 group-hover:text-amber-400/80 transition-colors duration-300"
                            />
                            <span className="text-[10px] font-mono text-slate-600 tracking-wider">
                                NO PREVIEW
                            </span>
                        </div>
                    )}

                    {/* Gradiente sfumato inferiore */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 pointer-events-none" />

                    {/* Serial Code (In alto a sinistra dell'immagine) */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center rounded-md bg-slate-950/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono font-semibold tracking-wider text-amber-400 border border-amber-500/30 shadow-sm">
                            #{code}
                        </span>
                    </div>

                    {/* Badge Categoria (In alto a destra dell'immagine) */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-slate-300 border border-slate-700/60 shadow-sm">
                            {item.Category}
                        </span>
                    </div>
                </div>

                {/* --- CONTENUTO CARD --- */}
                <div className="p-5 flex flex-col gap-3">
                    {/* Titolo e Costo */}
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="font-sans text-sm font-semibold leading-snug text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {item.Name}
                        </h3>
                        <span className="inline-block font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-md shrink-0">
                            {item.Cost ?? 0} €
                        </span>
                    </div>
                </div>
            </div>

            {/* --- FOOTER: DATASHEET LINK --- */}
            <div className="px-5 pb-4 pt-3 border-t border-slate-800/80 mt-auto">
                {item.Datasheet ? (
                    <a
                        href={item.Datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full text-xs font-medium text-slate-400 hover:text-amber-400 transition-colors group/link"
                    >
                        <span className="inline-flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={faFileLines}
                                className="h-3.5 w-3.5 text-slate-500 group-hover/link:text-amber-400 transition-colors"
                            />
                            Scheda tecnica
                        </span>
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="h-3 w-3 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
                        />
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-2 text-xs text-slate-600 italic">
                        <FontAwesomeIcon icon={faFileLines} className="h-3.5 w-3.5 opacity-40" />
                        Nessuna scheda tecnica
                    </span>
                )}
            </div>
        </div>
    );
}