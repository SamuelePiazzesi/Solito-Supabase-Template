import 'react-native-url-polyfill/auto'
import React, { createContext, useState, useEffect } from 'react'
import { supabaseNativeClient as supabase } from '../client/index.native'
import { Session } from '@supabase/supabase-js'

type UserNativeContextProps = { user?: Session | null }

export const UserNativeContext = createContext<UserNativeContextProps | null>(
  null
)

export const UserNativeProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <UserNativeContext.Provider value={{ user: session }}>
      {children}
    </UserNativeContext.Provider>
  )
}
