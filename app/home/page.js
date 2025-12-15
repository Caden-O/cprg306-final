"use client";

import Link from "next/link"
import { useUserAuth } from "./_utils/auth-context";

export default function Page(){
  const { user, gitHubSignIn, fireBaseSignOut } = useUserAuth();
  if(user==null){
    
    return(
      <main>
        <p>aaaaaaah! sign in motherfucker!!!!</p>
        <button onClick={gitHubSignIn}>sign in</button>
      </main>
    )
  }else{
    return(
      <main>
        aaah!
        <Link href={`./home/chatroom`}>Open room</Link>
        <button onClick={fireBaseSignOut}>sign out</button>
      </main>
    )
  }
}