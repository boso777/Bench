import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image"; // Opzionale se usi il componente Image di Next.js

export default async function CompDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Query singola con Join e recupero dell'immagine
  const { data: project } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      cover_img, 
      Component:projects_components(
        component:Component(id, Name, Cost)
      )
    `)
    .eq("id", id)
    .maybeSingle();

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full shadow-xl">
          <p className="text-red-400 font-medium text-lg mb-4">Progetto non trovato</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors w-full"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  // Estrazione componenti pulita
  const components = project.Component?.map((item: any) => item.component).filter(Boolean) || [];

  // Calcolo totale costi
  const totalCost = components.reduce((acc: number, curr: any) => acc + (curr.Cost || 0), 0);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Glow di sfondo decorativo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* --- IMMAGINE IN ALTO --- */}
        {project.cover_img ? (
          <div className="relative w-full h-56 bg-slate-950 overflow-hidden border-b border-slate-800">
            <Image
              src={project.cover_img}
              alt={project.title}
              fill
              className="object-cover"
            />
            {/* Gradiente di sfumatura sopra l'immagine */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

            {/* Pulsante "Torna indietro" sovrapposto all'immagine */}
            <Link
              href="/"
              className="absolute top-4 left-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-950/60 hover:bg-slate-950 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 transition-all"
            >
              ← Torna ai progetti
            </Link>
          </div>
        ) : (
          /* Se non c'è immagine, mostra solo il link back classico */
          <div className="pt-6 px-6 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-colors"
            >
              ← Torna ai progetti
            </Link>
          </div>
        )}

        {/* --- CONTENUTO SCHEDA --- */}
        <div className="p-6 md:p-8">

          {/* Header Progetto */}
          <header className="mb-8 border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              {project.title}
            </h1>
            {project.description ? (
              <p className="text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
            ) : (
              <p className="text-slate-600 text-sm italic">Nessuna descrizione fornita.</p>
            )}
          </header>

          {/* Sezione Componenti */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Componenti usati ({components.length})
              </h2>
              {components.length > 0 && (
                <span className="text-xs font-mono text-indigo-400 bg-indigo-950/50 border border-indigo-800/50 px-2 py-1 rounded">
                  Totale: {totalCost} €
                </span>
              )}
            </div>

            {components.length > 0 ? (
              <div className="space-y-2">
                {components.map((comp: any) => (
                  <div
                    key={comp.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <span className="text-sm font-medium text-slate-200">
                      {comp.Name}
                    </span>
                    <span className="text-sm font-mono font-semibold text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-800/30">
                      {comp.Cost} €
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/30 border border-dashed border-slate-800 text-center">
                <p className="text-slate-500 text-sm italic">Nessun componente associato a questo progetto.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}