import { createClient } from "@/app/utils/supabase/client";
import Card from "@/app/components/card";

export default async function Projects() {

    const supabase = await createClient();


    const { data: projects } = await supabase
        .from('projects')
        .select('*');





    return (
        <>
            {projects?.map((project) => {
                return <Card key={project.id} title={project.title} description={project.description} id={project.id} />
            })}
        </>
    );
}
