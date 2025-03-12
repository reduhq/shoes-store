import { CreatePaymentSchema } from "@/models/payment"
import { createClient } from "@/utils/supabase/client"

export const createNewPayment = async(paymentData: CreatePaymentSchema)=>{
  const supabase = await createClient()
  const {data, error} = await supabase.from('pagos').insert(paymentData).select()
  if(error){
    return {error}
  }
  return {data}
}