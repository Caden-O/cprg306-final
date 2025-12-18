"use client";

import Link from "next/link";
import Header from "../utilities/header";
import MemberList from "../utilities/user_list";
import TextChannel from "../utilities/text_channel";
import ChannelSurfer from "../utilities/channel_surfer";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import { listenToMessages, getUsers, getChannels } from "@/app/_service/database-service";
import { useRouter } from "next/navigation";

export default function Chatroom(){
  const { user, firebaseSignOut } = useUserAuth();
  const [ retrievedMessages, setRetrievedMessages ] = useState([]);
  const [ sortedMessages, setSortedMessages] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ channelList, setChannelList ] = useState([]);
  const [ selectedChannel, setSelectedChannel ] = useState("general");
  const [ reportWindowOpen, setReportWindowOpen ] = useState(false);
  const router = useRouter();

  useEffect(() => {
  if (user !== null){
    loadUsers();
    loadChannels();
    const unsubscribe = listenToMessages(
      selectedChannel, (messages) => {setRetrievedMessages(messages);}
    ); 
    return () => unsubscribe();
  }
}, [user, selectedChannel]);
  
  useEffect(()=>{
    sortMessages();
  }, [retrievedMessages])

  useEffect(()=>{
    setReportWindowOpen(false)
  }, [selectedChannel])

  async function loadUsers() {
    await user;
    try {
      getUsers().then(users => {
        setUserList([...users])
      })
    } catch(error) {
      console.log(error);
    }
  }

  async function loadChannels() {
    await user;
    try {
      getChannels().then(channels => {
        setChannelList([...channels])
      })
    } catch(error) {
      console.log(error);
    }
  }

  function sortMessages(){
    const sortList = [...retrievedMessages];
    sortList.sort((a, b) => (a.date.toString().localeCompare(b.date.toString())));
    setSortedMessages([...sortList])
  }

  function handleSignOut(){
    firebaseSignOut();
    router.replace('/home')
  }

  if(user !== null){
    return(
      <main>
        <div className="flex flex-col h-screen w-screen">
          <div className="h-1/12">
            <div className="p-4 border-b-2 border-neutral-600 hover:cursor-default h-full">
              <Header middleText={selectedChannel} signOut={handleSignOut}/>
            </div>
          </div>
          <div className="h-11/12 grow">
            <div className="flex flex-row h-full">
              {/* channel section */}
              <div className="p-4 border-r-2 border-neutral-600 hover:cursor-default min-w-fit w-1/6">
                <ChannelSurfer channels={channelList} handleSelectChannel={setSelectedChannel}/>
              </div>
              {/* Main messages section */}
              <div className="p-2 border-neutral-600 hover:cursor-default grow overflow-hidden max-w-4/6">
                <TextChannel messages={sortedMessages} users={userList} channel={selectedChannel} reportWindowOpen={reportWindowOpen} setReportWindowOpen={setReportWindowOpen}/>
              </div>
              {/* Member list section */}
              <div className="p-4 border-l-2 border-neutral-600 hover:cursor-default min-w-fit w-1/6">
                <MemberList users={userList}/>
              </div>
            </div>
          </div>
        </div>
      </main> 
    )
  }else if(user==null){
    return(
      <main>
        <div className="flex flex-col items-center">
          <p className="mt-5 p-3 text-4xl font-semibold text-neutral-500">You arent signed in!</p>
          <p className="m-2 italic text-lg text-neutral-500">returning to home page...</p>
          <p className="m-2 italic text-lg text-neutral-500">if the page doesnt automatically open within a few seconds, you can manually redirect with this link.</p>
          <Link href={'/home'} className="m-2 italic text-lg text-blue-200 hover:underline">
              <p>manual redirect...</p>
          </Link>
        </div>
      </main>
    )
  }
}