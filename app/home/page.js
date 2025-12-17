"use client";

import Link from "next/link"
import { useUserAuth } from "../_utils/auth-context";


export default function Home(){
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  if(user==null){
    return(
      <main>
        <div className="flex flex-col items-center">
          <h1 className="mt-5 p-3 text-4xl font-semibold">aaaaaaah! sign in motherfucker!!!!</h1>
          <button 
          onClick={gitHubSignIn}
          className="m-4 p-4 bg-neutral-700 rounded hover:text-blue-400 hover:cursor-pointer hover:underline">
              sign in
          </button>
        </div>
      </main>
    )
  }else{

    return(
      <main>
        <p>aaah!</p>
        <Link href={`./home/chatroom`} className="m-4 p-4 bg-neutral-700 rounded hover:text-blue-400 hover:cursor-pointer hover:underline">Open room</Link>
        <button onClick={firebaseSignOut} className="m-4 p-4 bg-neutral-700 rounded hover:text-blue-400 hover:cursor-pointer hover:underline">sign out</button>
      </main>
    )
  }
}