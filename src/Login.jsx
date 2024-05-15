import React, { useEffect, useState } from 'react'
import { supabase } from './database.js'

export default function login() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession()
    setSession(session)
    setUser(session?.user)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch(event) {
        case "SIGNED_IN":
          setUser(session?.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
          break;
      }
    });

    // Cleanup function
    return () => {
      supabase.removeAllChannels()
    };
  }, []);

  async function githubLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  async function logout() {
    const { data, error } = await supabase.auth.signOut()
  }

  return (
    <div>
      {user ? 
      <div>
      <h1>Authenticated. </h1> 
      <button onClick={logout}>Logout</button>
      </div>
      : <button onClick={githubLogin}>Login with Github</button>}
    </div>
  )
}
