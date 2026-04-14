import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import uuid4 from "uuid4";
import Lookup from "@/data/Lookup"; 
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


const SignInDialog = ({openDialog,closeDialog}) => {
  const{userDetail,setUserDetail}=useContext(UserDetailContext)
  const CreateUser = useMutation(api.users.CreateUser)
   const googleLogin = useGoogleLogin({
     flow: "implicit",
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer '+ tokenResponse?.access_token } },
    );

    console.log(userInfo);
    const user = userInfo.data;
    await CreateUser({
      name:user?.name,
      email:user?.email,
      picture:user?.picture,
      uid:uuid4()
    })

    if(typeof window!== "undefined"){
      localStorage.setItem('user',JSON.stringify(user))
    }
    setUserDetail(userInfo?.data)
    closeDialog(false)
  },
  onError: errorResponse => console.log(errorResponse),
});


  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            
               <div className='flex flex-col items-center justify-center'>
                 <h2 className="font-bold text-2xl text-center text-white">{Lookup.SIGNIN_HEADING}</h2>
                 <div className="mt-2 text-center text-lg">{Lookup.SIGNIN_SUBHEADING}</div>
                 <Button onClick={googleLogin}  className='bg-blue-500 text-white hover:bg-blue-400 mt-3 cursor-pointer' >Sign In with Google</Button>
                 <div className="text-sm">{Lookup?.SIGNIn_AGREEMENT_TEXT}</div>
               </div>
              
           
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
