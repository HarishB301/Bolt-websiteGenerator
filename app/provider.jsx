'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/custom/Header'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessagesContext } from '@/context/Messages'
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import  GetUser  from '@/convex/users'
const Provider = ({children}) => {
  const[messages,setMessages]=useState();
  const[userDetail,setUserDetail]=useState()
  const convex =useConvex();

  useEffect(()=>{
    IsAuthenticate()
  },[])
  const IsAuthenticate=async()=>{
    if(typeof window!==undefined){
      const user =JSON.parse(localStorage.getItem('user'));
       const result = await convex.query(api.users.GetUser,{
        email:user?.email
       })
       setUserDetail(result)
      //  console.log(result);
       

    }
  }
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
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
     </UserDetailContext.Provider>
     </GoogleOAuthProvider>
  )
}

export default Provider
