"use client";

import Link from "next/link"
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getUsers, addUserIfNotExists } from "../_service/messages-service";


export default function Home(){
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [ userList, setUserList ] = useState([]);
  const [ connected, setConnected ] = useState(false);

  useEffect(() => {
    if(user!== null) {
      addUserIfNotExists(user);
    }
  }, [user]);

  async function handleSignIn(){
    console.log('(handleSignIn())\nHandling sign in...');
    await gitHubSignIn();
    if(user !== null){
      // window.location.href = './chatroom';
    }
  }
  
  async function loadUsers() {
    await user;
    console.log('(loadUsers())\ntrying to load users...');
    try {
      getUsers().then(users => {
        console.log('(loadUsers())\nuserList:\n',userList);
        setUserList([...users])
        console.log("(loadUsers())\nLoading users\n", [...users]);
      })
    } catch(error) {
      console.log(error);
    }
  }

  if(user==null){
    return(
      <main className="overflow-clip h-screen flex flex-col">
        <section className="flex flex-row items-center h-1/12 border-b-2 border-neutral-600 hover:cursor-default">
          <div className="ml-3 w-1/6">
            <h1 className="font-bold text-4xl">WebChat</h1>
          </div>
        </section>
        <div className="h-full bg-gray-900 flex flex-row">
          <div className="w-1/6">
          </div>
          <div className="grow bg-gray-800 m-10 p-5 rounded-4xl w-auto h-9/12 flex flex-col">
            <h2 className="m-5 text-4xl font-semibold">Welcome, User!</h2>
            <p className="text-2xl m-5">Welcome to WebChat! You are not currently signed in, to continue to the chatroom, sign in with the link below!</p>
            <button onClick={handleSignIn} className="text-4xl hover:bg-blue-600 hover:cursor-pointer hover:underline bg-blue-700 w-full h-full text-center rounded-4xl">
              <p>Click here to sign in!</p>
            </button>
          </div>
          <div className="w-1/6">
          </div>
        </div>
      </main>
    )
  }else{  
    // window.location.href = './home/chatroom';
    return(
      <main className="overflow-clip h-screen flex flex-col">
        <section className="flex flex-row items-center h-1/12 border-b-2 border-neutral-600 hover:cursor-default">
          <div className="ml-3 w-1/6">
            <h1 className="font-bold text-4xl">WebChat</h1>
          </div>
        </section>
        <div className="h-full bg-gray-900 flex flex-row">
          <div className="w-1/6">
          </div>
          <div className="grow bg-gray-800 m-10 p-5 rounded-4xl w-auto h-9/12 flex flex-col">
            <h2 className="m-5 text-4xl font-semibold">Welcome, {user.displayName}!</h2>
            <p className="text-2xl m-5">You are signed in!</p>
            <p className="text-2xl m-5">We are trying to redirect you to the chatroom. If this doesnt work, you can manually redirect with the link below.</p>
            <Link href={'./home/chatroom'} className="text-4xl hover:bg-blue-600 hover:cursor-pointer hover:underline bg-blue-700 w-full h-full text-center rounded-4xl justify-center items-center flex">
              <div>
                <p className="self-center text-center h-full">Open chatroom...</p>
              </div>
            </Link>
          </div>
          <div className="w-1/6">
          </div>
        </div>
      </main>
    )
  }
}