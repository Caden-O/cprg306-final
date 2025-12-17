"use client";
import { useState, useEffect } from "react"
import { sendMessage, deleteMessage } from "@/app/_service/messages-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import Message from "./message"

export default function TextChannel({messages, users, channel}){  
  const { user } = useUserAuth();
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(()=>{
    setMessageList([...messages])
  }, [users, messages])

  function updateMessage(event){
    setMessageInput(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    const today = new Date().getTime();
    sendMessage(user.uid, messageInput, today, channel);
    setMessageInput("");
    console.log("submitted successfully!");
  }

  function report(messageid, userid){
    console.log(`report: ${messageid}, ${userid}`);
  }

  function tryDeleteMessage(messageid, userid){
    if(userid == user.uid){
      deleteMessage(channel, messageid);
    }else{
      console.log(`this is not your message!\n( ${userid} !== ${user.uid} )`);
    }
  }

  return(
    <section className="flex flex-col h-full">
      <div className="grow flex flex-col-reverse h-full overflow-y-auto">
        <ul>
          {messageList.map((msg) => {
            if(msg.hidden == false){
              const date = new Date (msg.date).toUTCString()
              var iUser = [];
              users.forEach(aUser => {
                if(aUser.userID == msg.userID){
                  iUser = aUser;
                }
              });
              return(
                <Message 
                displayName={iUser.displayName}
                text={msg.text}
                date={date}
                imageURL={iUser.img}
                report={()=>report(msg.id, msg.userID)}
                deleteMessage={()=>tryDeleteMessage(msg.id, msg.userID)}
                key={msg.id}/>
              )
            }
          })}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row w-auto h-16">
          <div className="border border-neutral-700 rounded-xl p-2 grow">
            <input
              type="text"
              required={true}
              name="message"
              id="message"
              value={messageInput} 
              placeholder="Message..."
              onChange={updateMessage}
              className="w-full h-full placeholder:text-xl placeholder:italic font-thin"
            />
          </div>
          <div className="sticky self-center w-15 border-3 border-blue-800 rounded-xl ml-2 h-full bg-blue-500">
            <input 
              type="submit"
              value="Send"
              className="w-full h-full hover:cursor-pointer items-center text-blue-200"
            />
          </div>
        </div>
      </form>
    </section>
  )
}