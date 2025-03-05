'use server'
import { createClient } from "@/utils/supabase/server";

export const getClientsByUser = async()=>{
  const supabase = await createClient()
  const {data: user, error:userError} = await supabase.auth.getUser()
  if (!user || userError) {
    console.error("Error obteniendo al usuario");
    return {success: false}
  }

  const {data, error} = await supabase.from('clientes').select('*').eq('usuario_id', user.user.id)
  if (error) {
    return { success: false };
  }
  return { success: true, data};
}
