import { supabase } from "./supabaseClient";

export const signUpNewUser = async (email:string, password: string)=>{
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options:{emailRedirectTo:`${process.env.NEXT_PUBLIC_HOST_URL}/confirm-account`}
    },)
    if(error){
        console.error('There was a problem signing up ', error)
        return {success: false, error}
    }
    return {success: true, data}
}