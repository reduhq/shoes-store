import { createClientSchema } from "@/models/client";
import { createClient } from "@/utils/supabase/client";

export const createNewClient = async (client: createClientSchema) => {
  const supabase = await createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (!user || userError) {
    console.error("Error obteniendo al usuario");
    return {success: false}
  }

  const { data, error } = await supabase
    .from("clientes")
    .insert({ ...client, usuario_id: user.user.id })
    .select();
  if (error) {
    console.error("Error al insertar nuevo cliente", error);
    return { success: false };
  }
  console.log("Cliente agregado", data);
  return { success: true };
};
