import { createClient } from "@/utils/supabase/client";

export default async function CompDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold">Project not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col border-2 border-black bg-gray-100 p-6 rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-blue-950">
          {project.title}
        </h2>
        {project.description && (
          <p className="text-gray-700">{project.description}</p>
        )}
      </div>
    </div>
  );
}
