"use client";

import Link from "next/link"
import { useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { addUserIfNotExists } from "../_service/messages-service";
import { useRouter } from "next/navigation";
import Header from "./utilities/header";
import { Icon } from "@iconify/react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Home(){
  const { user, gitHubSignIn } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
  if (user == null) return;
  const redirect = async () => {
    await addUserIfNotExists(user);
    router.replace("/home/chatroom");
  };

    redirect();
  }, [user, router]);

  async function handleGitHubSignIn(){
    console.log('(handleSignIn())\nHandling sign in...');
    await gitHubSignIn();
  }

  if(user==null){
    return(
      <GoogleOAuthProvider clientId="12267094954-3u7l2mf2fkibpo1a62npge4h5pkhdgeq.apps.googleusercontent.com">
        <main className="h-screen flex flex-col">
          <div className="h-1/12">
            <div className="p-4 mb-2 border-b-2 border-neutral-600 hover:cursor-default h-full">
              <Header/>
            </div>
          </div>
          <div className="h-full bg-gray-900 flex flex-row min-h-fit">
            <div className="w-1/6">
            </div>
            <div className="grow bg-gray-800 m-10 p-5 rounded-4xl w-auto h-10/12 flex flex-col">
              <h2 className="m-5 text-4xl font-semibold">Welcome, User!</h2>
              <p className="text-2xl m-5">Welcome to WebChat! You are not currently signed in. To continue to the chatroom, sign in with you GitHub or Google account!</p>
              <div className="size-full">
                <div className="h-1/2 p-3">
                  <button onClick={handleGitHubSignIn} className=" bg-white hover:bg-neutral-200 hover:cursor-pointer hover:underline w-full h-full text-center rounded-4xl">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                      <Icon icon={'mdi:github'} className="text-black size-18 mr-2"/>
                      <p className="text-4xl text-black">Sign in with</p>
                      <Icon icon={'logos:github'} className="size-24 ml-2" width="100" height="100"/>
                    </div>
                  </button>
                </div>
                <div className="h-1/2 p-3 min-h-fit overflow-auto">
                  <button onClick={handleGitHubSignIn} className=" bg-white hover:bg-neutral-200 hover:cursor-pointer hover:underline w-full h-full text-center rounded-4xl">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                      <Icon icon={'material-icon-theme:google'} className="text-black size-18 mr-2"/>
                      <p className="text-4xl text-black">Sign in with</p>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="115" height="115" viewBox="0 0 128 128" className="ml-2 mt-2 text-black"><path fill="currentColor" d="M31.85 57.91H17.09v4.38h10.47c-.52 6.14-5.63 8.76-10.45 8.76a11.7 11.7 0 0 1 0-23.4A11.36 11.36 0 0 1 25 50.82l3.07-3.18A15.6 15.6 0 0 0 17 43.26a16.09 16.09 0 1 0 .23 32.18c8.61 0 14.92-5.9 14.92-14.63a13 13 0 0 0-.27-2.9zm12.09-3.17a10.34 10.34 0 1 0 10.38 10.38a10.22 10.22 0 0 0-10.38-10.38M44 58.8a6.29 6.29 0 1 1-5.92 6.26A5.95 5.95 0 0 1 44 58.8m22.56-4.06a10.34 10.34 0 1 0 10.37 10.38a10.22 10.22 0 0 0-10.37-10.38m.06 4.06a6.29 6.29 0 1 1-5.92 6.26a5.95 5.95 0 0 1 5.92-6.26m22.11-4.05c-5.56 0-9.93 4.87-9.93 10.33a10.2 10.2 0 0 0 9.83 10.35a6.83 6.83 0 0 0 5.67-2.51v2c0 3.57-2.17 5.7-5.44 5.7A5.73 5.73 0 0 1 83.58 77l-4 1.66a10 10 0 0 0 9.3 6.09c5.53 0 9.74-3.48 9.74-10.78v-18.6h-4.31v1.75a7.32 7.32 0 0 0-5.58-2.37m.4 4.05c2.73 0 5.52 2.33 5.52 6.3s-2.79 6.27-5.58 6.27a5.88 5.88 0 0 1-5.72-6.23c0-4 2.86-6.34 5.78-6.34m28.8-4.08c-5.24 0-9.65 4.17-9.65 10.33a10 10 0 0 0 10.15 10.38a10.49 10.49 0 0 0 8.66-4.54l-3.58-2.38a5.79 5.79 0 0 1-5.07 2.85a5.32 5.32 0 0 1-5.07-3.13l13.87-5.75l-.72-1.69a9.36 9.36 0 0 0-8.6-6.06zm.18 4a4.12 4.12 0 0 1 3.83 2.21l-9.26 3.87a5.74 5.74 0 0 1 5.43-6.08m-16.44 16.1h4.56V44.33h-4.56z" stroke-width="1" stroke="currentColor"/></svg> */}
                      <Icon icon={'devicon:google-wordmark'} className="size-20 scale-150 ml-7 mt-2 text-black"/>
                    </div>
                  </button>
                </div>
                <div>
                  <h2>React Google Login</h2>
                  <GoogleLogin/>
                </div>
              </div>
            </div>
            <div className="w-1/6">
            </div>
          </div>
        </main>
      </GoogleOAuthProvider>
    )
  }else{
    return(
      <main>
        <div className="flex flex-col items-center">
          <p className="mt-5 p-3 text-4xl font-semibold text-neutral-500">redirecting...</p>
          <p className="m-2 italic text-lg text-neutral-500">if the page doesnt automatically open within a few seconds, you can manually redirect with this link.</p>
          <Link href={'./home/chatroom'} className="m-2 italic text-lg text-blue-200 hover:underline">
              <p>manual redirect...</p>
          </Link>
        </div>
      </main>
    )
  }
}