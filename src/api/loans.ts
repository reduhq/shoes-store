import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export const getLoansByClientId = async(clientId: string) =>{
  const supabase = await createClient()
  const {data, error} = await supabase.from('prestamos').select('*').eq('cliente_id', clientId)
  if(error){
    redirect('/clients')
  }
  return data
}