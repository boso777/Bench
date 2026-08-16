import ComponentCard from "@/components/ComponentCard";
import { createClient } from "@/utils/supabase/client";

export default async function Comp() {
  const supabase = await createClient();

  const { data: componenti, error } = await supabase
    .from("Component")
    .select("*");

  if (error) console.error("Errore fetch:", error);



  return (
    <>
      {componenti?.map((component) => (
        <ComponentCard key={component.id} item={component} />
      ))}
    </>
  );
}
