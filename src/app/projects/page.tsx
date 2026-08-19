import ProjectCard from "@/components/ProjectCard";
import CreateProjectModal from "@/components/CreateProjectModal";
import CreateProjectFormLoader from "@/components/CreateProjectFormLoader";
import { createClient } from "@/utils/supabase/client";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Projects() {
  const supabase = await createClient();

  const { data: projects } = await supabase.from("projects").select("*");

  return (
    <main className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full min-h-screen">
      {/* Header section */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 font-sans flex items-center gap-3">
            <FontAwesomeIcon icon={faFolderOpen} className="text-blue-400 text-2xl" />
            I tuoi progetti
          </h1>
          <p className="text-slate-400 text-base mt-1 font-light">
            I progetti di elettronica e prototipazione che hai ideato
          </p>
        </div>
        <CreateProjectModal>
          <CreateProjectFormLoader />
        </CreateProjectModal>
      </header>

      {/* Griglia Progetti */}
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              id={project.id}
              img={project.cover_img}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 text-center my-8">
          <FontAwesomeIcon icon={faFolderOpen} className="text-4xl text-slate-700 mb-3" />
          <h3 className="text-lg font-semibold text-slate-300">Nessun progetto trovato</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Non hai ancora creato nessun progetto. Clicca sul pulsante in alto per iniziare.
          </p>
        </div>
      )}
    </main>
  );
}

