import {
  faArrowRight,
  faFolderOpen,
  faMicrochip,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CardHome from "@/components/CardHome";
import Card from "@/components/card";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/ModalButton";
import ModalButton from "@/components/ModalButton";

export default async function Home() {
  const supabase = createClient();

  // Fetch dei dati da Supabase
  const { data: projects } = await supabase.from("projects").select("*");
  const { data: components } = await supabase.from("components").select("*");

  const projectCount = projects?.length || 0;
  const componentCount = components?.length || 0;

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full">

      {/* Header section */}
      <header className="mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Welcome to Bench
          </h1>
          <p className="text-slate-400 text-lg mt-1 font-light">
            Il tuo spazio di lavoro per la progettazione elettronica
          </p>
        </div>
        <ModalButton />
      </header>

      {/* KPI / Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <CardHome
          title="Progetti Totali"
          totalProjects={projectCount.toString()}
          icon={faFolderOpen}
        />
        <CardHome
          title="Componenti"
          totalProjects={componentCount.toString()}
          icon={faMicrochip}
        />
      </section>

      {/* Title Progetti Recenti */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-2xl font-bold text-white">Progetti Recenti</h2>
        <Link
          href="/projects"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group transition-colors"
        >
          <span>Vedi tutti</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Griglia Card Unica e Responsive */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {projects?.map((project) => (
          <Card
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            img={project.cover_img}
          />
        ))}
      </section>

    </div>
  );
}