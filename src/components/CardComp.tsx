import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export type Component = {
    id: number;
    created_at: string;
    Name: string;
    Category: string;
    Cost: number;
    Cover_img: string;
    Datasheet: string | null;
};

export default function ItemCard({ item }: { item: Component }) {
    const code = `XC-${String(item.id).padStart(4, "0")}`;

    return (
        <div className="m-6 group relative flex flex-col w-[30%] h-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg shadow-black/40 transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-amber-500/5">

            {/* --- MEDIA COVER --- */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-950 border-b border-slate-800/60">
                {item.Cover_img ? (
                    <Image
                        src={item.Cover_img}
                        alt={item.Name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-700 text-xs font-mono">
                        NO_PREVIEW_IMG
                    </div>
                )}

                {/* Gradiente sfumato inferiore */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

                {/* Badge Categoria (In alto a destra dell'immagine) */}
                <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center rounded-md bg-slate-950/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-slate-300 border border-slate-700/50">
                        {item.Category}
                    </span>
                </div>

                {/* Serial Code (In alto a sinistra dell'immagine) */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center rounded-md bg-slate-950/70 backdrop-blur-md px-2 py-1 text-[10px] font-mono font-semibold tracking-wider text-amber-400 border border-amber-500/20">
                        {code}
                    </span>
                </div>
            </div>

            {/* --- CONTENUTO CARD --- */}
            <div className="flex flex-1 flex-col justify-between p-4 gap-3">

                {/* Titolo e Costo */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-sans text-sm font-semibold leading-snug text-slate-100 group-hover:text-white transition-colors line-clamp-2">
                        {item.Name}
                    </h3>
                    <div className="shrink-0 text-right">
                        <span className="inline-block font-mono text-xs font-bold text-amber-400 bg-amber-950/30 border border-amber-800/40 px-2 py-0.5 rounded-md">
                            {item.Cost} pt
                        </span>
                    </div>
                </div>

                {/* --- FOOTER: DATASHEET LINK --- */}
                <div className="pt-3 border-t border-slate-800/80 mt-auto">
                    {item.Datasheet ? (
                        <a
                            href={item.Datasheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full text-xs font-medium text-slate-400 hover:text-amber-400 transition-colors group/link"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faFileLines} className="h-3.5 w-3.5 text-slate-500 group-hover/link:text-amber-400 transition-colors" />
                                Scheda tecnica
                            </span>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                    ) : (
                        <span className="text-[11px] text-slate-600 italic">
                            Nessuna scheda tecnica
                        </span>
                    )}
                </div>

            </div>

        </div>
    );
}