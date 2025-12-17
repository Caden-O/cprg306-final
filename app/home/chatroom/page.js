"use client";

import Link from "next/link";
import Header from "../utilities/header";
import MemberList from "../utilities/member_list";
import TextChannel from "../utilities/text_channel";
import ChannelSurfer from "../utilities/channel_surfer";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import { getMessages, getUsers, getChannels } from "@/app/_service/messages-service";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/_utils/firebase";

export default function Chatroom(){
  const{ user } = useUserAuth();
  const [ retrievedMessages, setRetrievedMessages ] = useState([]);
  const [ sortedMessages, setSortedMessages] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ channelList, setChannelList ] = useState([]);
  const [ selectedChannel, setSelectedChannel ] = useState("general");
  const [ connected, setConnected ] = useState(false);

  async function checkConnection(){
    await user;    
    if(connected == false){
      try{
        loadUsers();
        userList.forEach(aUser => {
          if(aUser.userID == user.uid){
            // console.log(`(page.js[...chatroom])\nParsing users\naUser.UserID: ${aUser.userID}\n user.uid: ${user.uid}`);
            setConnected(true);
          }
        });
      } catch(error) {
        console.log(error);
      }
    }
  }
  
  useEffect(() => {
  
  }, [selectedChannel, user]);

  useEffect(()=>{
    if (user !== null){
      const q = query(collection(db, "messages", selectedChannel, "messages"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const message= doc.data()
          message.id = doc.id
          messages.push(message)
        });
        setRetrievedMessages(messages);
      });
      return () => unsubscribe();
    }
    loadUsers(),
    loadChannels(),
    loadMessages()
  }, [user, selectedChannel])

  useEffect(()=>{
    sortMessages()
  }, [retrievedMessages])

  useEffect(()=>{
    checkConnection()
  }, [user, userList])

  async function loadMessages() {
    await user;
    try {
      getMessages(selectedChannel).then(messages => {
        setRetrievedMessages([...messages])
        // console.log("Loading messages", [...messages]);
      })
    } catch(error) {
      console.log(error);
    }
    sortMessages();
  }

  async function loadUsers() {
    await user;
    try {
      getUsers().then(users => {
        setUserList([...users])
        console.log("Loading users", [...users]);
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
        // console.log("Loading channels", [...channels]);
      })
    } catch(error) {
      console.log(error);
    }
  }

  function sortMessages(){
    const sortList = [...retrievedMessages];
    // console.log('sorting...');
    sortList.sort((a, b) => (a.date.toString().localeCompare(b.date.toString())));
    setSortedMessages([...sortList])
  }

  if(user==null){
    return(
      <main>
        <h1 className="m-4 p-4 text-2xl">You aren't signed in!</h1>
        <Link href={`../home`} className="m-4 p-4 bg-neutral-700 rounded hover:text-blue-400 hover:cursor-pointer hover:underline">Take me to the landing page</Link>
      </main>
    )
  }else if(user !== null && connected == true){
    return(
      <main>
        <div className="flex flex-col h-screen w-screen">
          <div className="h-1/12">
            <div className="p-4 mb-2 border-b-2 border-neutral-600 hover:cursor-default h-full">
              <Header channel={selectedChannel} signOutEnabled={true}/>
            </div>
          </div>
          <div className="h-11/12 grow">
            <div className="flex flex-row h-full grow">
              {/* channel section */}
              <div className="p-4 border-r-2 border-neutral-600 hover:cursor-default min-w-1/6">
                <ChannelSurfer channels={channelList} handleSelectChannel={setSelectedChannel}/>
              </div>
              {/* Main messages section */}
              <div className="p-2 border-neutral-600 hover:cursor-default grow overflow-hidden">
                <TextChannel messages={sortedMessages} users={userList}  channel={selectedChannel}/>
              </div>
              {/* Member list section */}
              <div className="p-4 border-l-2 border-neutral-600 hover:cursor-default min-w-1/6">
                <MemberList users={userList}/>
              </div>
            </div>
          </div>
        </div>
      </main> 
    )
  }else if(user !== null && connected == false){
    return(
      <main>
        <h1>Uh oh! You are signed in, but your account is not connected to our database yet!</h1>
      </main>
    )
  }
}