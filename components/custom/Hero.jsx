'use client'
import React, { useContext, useState } from "react";
import Lookup from "@/data/Lookup";
import { ArrowRight ,Link} from "lucide-react";
import Colors from "@/data/Colors";
import { MessagesContext } from "@/context/Messages";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
const Hero = () => {
  const router =useRouter()
  const[userInput,setUserInput]=useState()
  const{messages,setMessages} = useContext(MessagesContext)
  const{userDetail,setUserDetail}=useContext(UserDetailContext)
  const[openDialog,setOpenDialog]=useState(false)
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)

  const onGenerate=async(input)=>{
    if(!userDetail?.name){
      setOpenDialog(true);
      return;
    }

    const msg ={
      role:'user',
      content:input
    }
     setMessages(msg)

     const workspaceId = await CreateWorkspace({
      user:userDetail._id,
      messages:[msg]
     });

     console.log(workspaceId);
     router.push('/workspace/'+ workspaceId);
     
  }
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-grey-400 font-medium text-sm">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3" style={{backgroundColor:Colors.BACKGROUND}}>
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER} onChange={(e)=>setUserInput(e.target.value)}
            className="overflow-hidden outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {
            userInput &&  <ArrowRight onClick={() => onGenerate(userInput)}
            className="bg-blue-500 h-8 p-2 w-8 rounded-md cursor-pointer" />
          }
        </div>
        <div>
          <Link className="h-5 w-5"></Link>
        </div>
      </div>

      <div className="flex flex-wrap max-w-2xl justify-center  gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion,index)=>(

         <h2 onClick={() => onGenerate(suggestion)}
         key={index} className="text-sm p-1 px-2   border border-gray-300 hover:border-blue-500  rounded-full cursor-pointer
         text-grey-400">{suggestion}</h2>
        ))}
      </div>
        <SignInDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(false)}></SignInDialog>
    </div>
  );
};

export default Hero;
