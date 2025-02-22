import { supabase } from "./supabaseClient";

export const signUpNewUser = async (email:string, password: string)=>{
    const {data, error} = await supabase.auth.signUp({
        email,
        password
    })
    if(error){
        console.error('There was a problem signing up ', error)
        return {success: false, error}
    }
    return {success: true, data}
}