import { createClient } from "@/utils/supabase/client";

export const signUpNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_URL}/confirm-account`,
      data: { name },
    },
  });
  if (error) {
    console.error("There was a problem signing up ", error);
    return { success: false, error };
  }
  return { success: true, data };
};

export const signInUser = async (email:string, password:string)=>{
  const supabase = await createClient()
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

export const signOut = async () =>{
  const supabase = await createClient()
  const {error} = await supabase.auth.signOut()
  console.log('signing out')
  if(error){
    console.error('there was an error: ', error)
  }
}
