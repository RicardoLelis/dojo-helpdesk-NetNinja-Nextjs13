import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request){
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if(code){
        const supabase = createRouteHandlerClient({cookies})
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(url.origin) // go to base url
}

//http://localhost:3000/api/auth/callback?code=8fd329cf-5812-4097-b4ed-b962b06cddc7