'use client'
import React, { useState } from 'react'
import Header from '@/components/custom/Header'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessagesContext } from '@/context/Messages'
const Provider = ({children}) => {
  const[messages,setMessages]=useState()
  return (
    <MessagesContext.Provider value={{messages,setMessages}}>
     <NextThemesProvider
     attribute="class"
     defaultTheme="dark"
     enableSystem
     disableTransitionOnChange>
      <Header/>
      {children}
     
     </NextThemesProvider>
     </MessagesContext.Provider>
  )
}

export default Provider
