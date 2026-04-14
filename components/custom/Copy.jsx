"use client";
import { MessagesContext } from "@/context/Messages";
import { api } from "@/convex/_generated/api";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useContext, useState ,useEffect} from "react";
import { Loader2Icon } from "lucide-react";
const Copy = () => {
    const [active, setActive] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const{messages,setMessages}=useContext(MessagesContext)
  const UpdatedFiles = useMutation(api.workspace.UpdateFiles)
  const {id}=useParams();
  const convex=useConvex()
  const[loading,setLoading]=useState(false);
 
  useEffect(()=>{
       id && GetFiles()
  },[id])

  const GetFiles=async()=>{
    setLoading(true)
    const result = await convex.query(api.workspace.GetWorkspace,{
      workspaceId:id,

    });
 console.log("11111111111111111111...........");
 console.log(result);
 
 
    const mergedFiles = {...Lookup.DEFAULT_FILE,...result?.fileData}
    setFiles(mergedFiles);
    setLoading(false)
  }
  useEffect(() => {
      if (messages?.length > 0) {
        const role = messages[messages?.length - 1].role;
        if (role === "user") {
          GenerateAiCode();
        }
      }
    }, [messages]);

  const GenerateAiCode=async()=>{
    setLoading(true)
    const PROMPT =JSON.stringify(messages)+" "+Prompt.CODE_GEN_PROMPT
    console.log(PROMPT);
    
    const result=await axios.post('/api/gen-ai-code',{
      prompt:PROMPT
    })
    console.log("22222222222222222222222...........");
    
    console.log(result);
    const aiResp =result.data
    const mergedFiles={...Lookup.DEFAULT_FILE,...aiResp?.files}
    setFiles(mergedFiles)
    await UpdatedFiles({
      workspaceId:id,
      files:aiResp?.files
    })
    setLoading(false)
  }
  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 ">
        <div className="flex items-center flex-wrap shrink-0 gap-3 w-[140px] bg-black p-1">
          <h2
            onClick={() => setActive("code")}
            className={`text-sm cursor-pointer ${
              active === "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-30 text-white p-1 px-2 rounded-full"
            } `}
          >
            Code
          </h2>
          <h2
            onClick={() => setActive("preview")}
            className={`text-sm cursor-pointer ${
              active === "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-30 text-white p-1 px-2 rounded-full"
            } `}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
        files={files}
        options={{
          externalResources:['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
        }}
      >
        <SandpackLayout>
          {active === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <SandpackPreview style={{ height: "80vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>

      <div className="p-10 bg-grey-900 opacity-50 absolute top-0 rounded-lg w-full flex
      items-center justify-center">
         {
          loading && 
         (<>
             <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
            <h2 className="text-white">Generating Files...</h2>
         </>)
         }
      </div>
    </div>
  )


export default Copy
