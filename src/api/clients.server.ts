"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getClientsByUser = async () => {
  const supabase = await createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (!user || userError) {
    console.error("Error obteniendo al usuario");
    return { success: false };
  }

  const { data, error } = await supabase
    .from("clientes")
    .select("*, prestamos:prestamos(count)")
    .eq("usuario_id", user.user.id)
    .eq("prestamos.estado", "pendiente");
  if (error) {
    return { success: false };
  }
  return { success: true, data };
};

export const getClientById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    redirect("/not-found");
  }
  return { success: true, data };
};
