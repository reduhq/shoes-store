import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export const getInstallmentsByLoanId = async(loanId:string) =>{
  const supabase = await createClient()
  const {data, error} = await supabase.from('cuotas').select('*').eq('prestamo_id', loanId)
  if(error){
    redirect('/loans')
  }
  return data
}