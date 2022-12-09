import React, { createContext, useState } from 'react'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

type UserContextProps = { user?: Session | null }

export const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ ssrUserData, children }: any) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={ssrUserData}
    >
      {children}
    </SessionContextProvider>
  )
}
