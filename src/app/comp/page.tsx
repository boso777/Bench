import ComponentCard from "@/components/ComponentCard";
import ModalOpenComponentForm from "@/components/ModalOpenComponentForm";
import { createClient } from "@/utils/supabase/client";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Comp() {
  const supabase = await createClient();

  const { data: componenti, error } = await supabase
    .from("Component")
    .select("*");

  if (error) console.error("Errore fetch:", error);

  return (
    <main className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full min-h-screen">
      {/* Header section */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 font-sans flex items-center gap-3">
            <FontAwesomeIcon icon={faMicrochip} className="text-amber-400 text-2xl" />
            Componenti
          </h1>
          <p className="text-slate-400 text-base mt-1 font-light">
            Tutti i componenti disponibili nella tua officina
          </p>
        </div>
        <ModalOpenComponentForm />
      </header>

      {/* Griglia Componenti */}
      {componenti && componenti.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {componenti.map((component) => (
            <ComponentCard key={component.id} item={component} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 text-center my-8">
          <FontAwesomeIcon icon={faMicrochip} className="text-4xl text-slate-700 mb-3" />
          <h3 className="text-lg font-semibold text-slate-300">Nessun componente trovato</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Non hai ancora aggiunto alcun componente. Clicca il pulsante "Nuovo Componente" per registrarne uno.
          </p>
        </div>
      )}
    </main>
  );
}

