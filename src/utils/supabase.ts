import { SupabaseClient } from "@supabase/supabase-js"


export async function getUser(supabaseClient:SupabaseClient){
    const result = await supabaseClient.auth.getSession()
    return result
}