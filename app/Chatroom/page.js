"use client";

import Header from "@/app/utilities/header"
import MemberList from "@/app/utilities/member_list"
import TextChannel from "@/app/utilities/text_channel"
import ChannelSurfer from "@/app/utilities/channel_surfer"

export default function home(){
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