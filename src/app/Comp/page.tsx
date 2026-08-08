import CardComp from "@/components/CardComp";
import { createClient } from "@/utils/supabase/server";

export default async function Comp() {
  const supabase = await createClient();

  const { data: componenti, error } = await supabase
    .from("Component")
    .select("*");

  if (error) console.error("Errore fetch:", error);

  return (
    <>
      {componenti?.map((component) => (
        <CardComp key={component.id} item={component} />
      ))}
    </>
  );
}
