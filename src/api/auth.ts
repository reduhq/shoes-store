import { supabase } from "./supabaseClient";

export const signUpNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_URL}/confirm-account`,
      data: { name },
    },
  });
  if (error) {
    console.error("There was a problem signing up ", error);
    return { success: false, error };
  }
  console.log({ success: true, data })
  return { success: true, data };
};

export const signInUser = async (email:string, password:string)=>{
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error){
    console.error("Sign in error occurred: " ,error)
    return {success: false, error}
  }
  console.log("sign in success: ", data)
  return {success: true, data}
}