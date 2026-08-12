import { createClient } from "@/utils/supabase/server"
import CreateProjectForm from "./CreateProjectForm"

export default async function CreateProjectFormLoader() {
    const supabase = await createClient()

    const { data: componenti, error } = await supabase
        .from("Component")
        .select("*")

    if (error) {
        console.error("Errore fetch componenti:", error)
    }

    return <CreateProjectForm componenti={componenti || []} />
}