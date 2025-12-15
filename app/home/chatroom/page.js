"use client";

import Header from "../utilities/header";
import MemberList from "../utilities/member_list";
import TextChannel from "../utilities/text_channel";
import ChannelSurfer from "../utilities/channel_surfer";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function Page(){
  const{ user } = useUserAuth();

  if(user==null){
    return(
      <main>
        <h1 className="m-4 p-4 text-2xl">You aren't signed in!</h1>
        <Link href={`../home`} className="m-4 p-4 bg-neutral-700 rounded hover:text-blue-400 hover:cursor-pointer hover:underline">Take me to the landing page</Link>
      </main>
    )
  }else{
    return(
      <main className="flex flex-col h-screen">
        <header className="p-4 m-3 border-3 rounded-2xl border-neutral-600 hover:cursor-default w-auto">
          <Header/>
        </header>
        <div className="flex flex-row h-full">
          {/* channel section (might not implement🥺) */}
          <div className="p-4 mb-3 mx-3 border-3 rounded-2xl border-neutral-600 hover:cursor-default w-1/6">
            <ChannelSurfer/>
          </div>
          {/* Main messages section */}
          <div className="p-2 mb-3 border-3 rounded-2xl border-neutral-600 hover:cursor-default grow">
            <TextChannel/>
          </div>
          {/* Member list section */}
          <div className="p-4 mb-3 mx-3 m border-3 rounded-2xl border-neutral-600 hover:cursor-default w-1/6">
            <MemberList/>
          </div>
        </div>
        
      </main> 
    )
  }
}