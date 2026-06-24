import { supabase } from "@/lib/supabase";

export async function getMessages(
  telefono: string
) {

  const { data, error } =
    await supabase
      .from("messages")
      .select("*")
      .eq("telefono", telefono)
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data;
}