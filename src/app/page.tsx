import { createClient } from "./utils/supabase/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolderOpen, faMicrochip, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CardHome from "./components/CardHome";


export default async function Home() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*');

  const { data: components } = await supabase
    .from('components')
    .select('*');

  const projectCount = projects?.length || 0;
  const componentCount = components?.length || 0;

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header section with clean design */}
      <header className="mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Welcome to Bench
          </h1>
          <p className="text-slate-400 text-lg mt-1 font-light">
            Il tuo spazio di lavoro per la progettazione elettronica
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
          <span>Nuovo Progetto</span>
        </Link>
      </header>

      {/* KPI / Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <CardHome title="Progetti Totali" totalProjects={projectCount.toString()} icon={faFolderOpen} />
        <CardHome title="Componenti" totalProjects={componentCount.toString()} icon={faMicrochip} />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects List */}
        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Progetti Recenti</h2>
            <Link href="/projects" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group transition-colors">
              <span>Vedi tutti</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {projectCount === 0 ? (
            <div className="bg-slate-800/10 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
              <FontAwesomeIcon icon={faFolderOpen} className="text-slate-600 text-4xl mb-4" />
              <p className="text-slate-400 text-lg">Nessun progetto trovato</p>
              <p className="text-slate-500 text-sm mt-1 mb-6">Inizia a creare il tuo primo progetto di elettronica.</p>
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-4 py-2 rounded-xl transition-all"
              >
                <span>Crea Progetto</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map((project) => (
                <div key={project.id} className="group bg-slate-850/40 border border-slate-800 rounded-2xl p-5 hover:border-slate-600/50 hover:bg-slate-800/30 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {project.image_url ? (
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-4 relative bg-slate-900 border border-slate-800">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-36 rounded-xl mb-4 bg-slate-900/30 border border-slate-800 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMicrochip} className="text-slate-700 text-4xl" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2 font-light">{project.description || "Nessuna descrizione fornita."}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between items-center">
                    <span className="text-xs text-slate-500">ID: {project.id}</span>
                    <Link href={`/projects/${project.id}`} className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1">
                      <span>Apri</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sidebar Info Panel */}

      </div>
    </div>
  );
}
