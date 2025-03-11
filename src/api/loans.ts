import { createLoanSchema } from "@/models/loan"
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

export const getLoanById = async(id: string)=>{
  const supabase = await createClient()
  const {data, error} = await supabase.from('prestamos').select('*').eq('id', id).single()
  if(error){
    redirect('/clients')
  }
  return data
}

export const createNewLoan = async (loanData: createLoanSchema) =>{
  const supabase = await createClient()
  // // Getting the currentUserId
  // const {data: user, error: userError} = await supabase.auth.getUser()
  // if(!user || userError){
  //   redirect('/auth/login')
  // }


  const {data, error} = await supabase.from('prestamos').insert({...loanData, cliente_id: loanData.cliente_id}).select()
  if(error){
    console.log(error)
    return {success: false, error}
  }
  return {success: true, data}
}