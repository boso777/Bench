import ProjectCard from "@/components/ProjectCard";
import { createClient } from "@/utils/supabase/client";

export default async function Projects() {
  const supabase = await createClient();

  const { data: projects } = await supabase.from("projects").select("*");

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start p-8 text-center bg-gradient-to-b from-slate-950 to-slate-900 ">
      {/* Header centrato */}
      <div className="my-12 flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-blue-200">I tuoi progetti</h1>
        <p className="text-md font-medium text-blue-200">
          I progetti che hai ideato
        </p>
      </div>

      {/* Griglia/Flex progetti centrata */}
      <div className="flex w-full flex-row flex-wrap justify-center gap-6 ">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            id={project.id}
            img={project.cover_img}
          />
        ))}
      </div>
    </main>
  );
}
