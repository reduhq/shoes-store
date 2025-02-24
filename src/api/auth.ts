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

export const signOut = async () =>{
  // para ver si hay una sesion activa
  // const {data} = await supabase.auth.getSession()
  // console.log(data)
  const {error} = await supabase.auth.signOut()
  console.log('signing out')
  if(error){
    console.error('there was an error: ', error)
  }
}

export const refreshAccessToken = async () =>{
  const {data, error} = await supabase.auth.refreshSession()
  if(error){
    console.error('There was an error refreshing the access token: ', error)
  }
  return {success: true, data}
}