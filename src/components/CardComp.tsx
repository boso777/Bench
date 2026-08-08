import Image from "next/image";


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
        <div className="mt-6 mx-6 flex w-full max-w-sm overflow-hidden rounded-2xl bg-[#171512] shadow-lg shadow-black/30">
            {/* Stub laterale: taglio "biglietto" con codice e categoria in verticale */}
            <div className="relative flex w-14 shrink-0 flex-col items-center justify-between border-r border-dashed border-[#4A463F] bg-[#1D1A16] py-4">
                <span
                    className="font-mono text-[10px] tracking-widest text-[#C9A961]"
                    style={{ writingMode: "vertical-rl" }}
                >
                    {item.Category.toUpperCase()}
                </span>
                <span
                    className="font-mono text-[10px] tracking-widest text-[#8A8578]"
                    style={{ writingMode: "vertical-rl" }}
                >
                    {code}
                </span>
                {/* notch a metà, effetto ticket */}
                <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#0B0A08]" />
            </div>

            {/* Corpo card */}
            <div className="flex flex-1 flex-col">
                <div className="relative h-36 w-full bg-[#0B0A08]">
                    <Image
                        src={item.Cover_img}
                        alt={item.Name}
                        fill
                        sizes="(max-width: 400px) 100vw, 320px"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-sans text-base font-semibold leading-tight text-[#F1EDE4]">
                            {item.Name}
                        </h3>
                        <span className="whitespace-nowrap rounded-md bg-[#C9A961]/15 px-2 py-0.5 font-mono text-xs font-medium text-[#C9A961]">
                            {item.Cost} pt
                        </span>
                    </div>



                    <div className="mt-auto pt-2">
                        {item.Datasheet ? (
                            <a
                                href={item.Datasheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C9A961] underline-offset-2 hover:underline"
                            >
                                <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                                Vedi scheda tecnica
                            </a>
                        ) : (
                            <span className="text-xs text-[#4A463F]">Nessuna scheda tecnica</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}