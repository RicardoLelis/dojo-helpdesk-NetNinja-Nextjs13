"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

// components
import AuthForm from "../AuthForm"
import { useRouter } from "next/navigation"

const Login = () => {

  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async(e, email, password) => {
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
    }

    if(!error){
      router.push('/')
    }

  }
  
  return (
      <div>
        <h2 className="text-center">Login</h2>

        <AuthForm  handleSubmit={handleSubmit} />
        {error && (
          <div className="error">{error}</div>
        )}
      </div>
    )
  }
  
  export default Login 
  