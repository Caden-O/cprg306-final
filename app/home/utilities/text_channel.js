"use client";
import { useState, useEffect } from "react"
import { sendMessage, deleteMessage, createReport } from "@/app/_service/messages-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import { Icon } from "@iconify/react";
import Message from "./message"
import TextareaAutosize from 'react-textarea-autosize';

export default function TextChannel({messages, users, channel, reportWindowOpen, setReportWindowOpen}){  
  const { user } = useUserAuth();
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [reportValues, setReportValues] = useState(
    {messageID: ''},
    {userID: ''}
  )
  const [reportText, setReportText] = useState('');
  const [TextAreaSize, setValue] = useState('');

  useEffect(()=>{
    setMessageList([...messages])
  }, [users, messages])

  function updateMessage(event){
    setMessageInput(event.target.value);
  }

  function handleSubmit(event){
    if(reportWindowOpen == false){
      event.preventDefault();
      const today = new Date().getTime();
      sendMessage(user.uid, messageInput, today, channel);
      setMessageInput("");
      console.log("submitted successfully!");
    }
  }

  function tryDeleteMessage(messageid, userid){
    if(userid == user.uid){
      deleteMessage(channel, messageid);
    }else{
      console.log(`this is not your message!\n( ${userid} !== ${user.uid} )`);
    }
  }

  function report(messageid, userid){
    console.log(`report: ${messageid}, ${userid}`);
    setReportValues({messageID:messageid},{userID:userid})
    setReportWindowOpen(true)
  }

  function closeReport(){
    setReportValues({messageID:''},{userID:''})
    setReportWindowOpen(false)
  }

  function submitReport(){
    const today = new Date().getTime();
    // createReport(reportValues.userID, user.uid, reportValues.messageID, reportText, today, reportValues.channel);
    closeReport();
  }

  function updateReportText(event){
    setReportText(event.target.value)
  }

  function AutoGrowingTextarea({placeholderText}){
    const [textValue, setTextValue] = useState('');
    return (
      <TextareaAutosize
        value={textValue}
        onChange={(event)=> setTextValue(event.target.value)}
        minRows={1}
        maxRows={10}
        placeholder={placeholderText}
        className="size-full p-4 text-xl resize-none placeholder:italic border border-neutral-700 rounded-xl"
      />
    );
  };
  
  if(reportWindowOpen == true){
    return(
      <section className="flex flex-col h-full w-auto">
        <div className="grow flex flex-col-reverse h-full overflow-y-auto">
          <div className="w-auto h-full m-5 border-2 border-neutral-600 overflow-y-scroll">
            <div className="flex w-full items-center justify-center h-1/12 border-b-2 border-neutral-600 overflow-hidden">
              <div className="w-1/6">
                <button onClick={closeReport} className="hover:cursor-pointer m-2 p-2 bg-neutral-800 rounded size-auto">
                  <Icon icon={'weui:back-filled'} className="size-full"></Icon>
                </button>
              </div>
              <div className="grow text-center h-fit">
                <p>Reporting Message:</p>
              </div>
              <div className="w-1/6"></div>
            </div>
            <div className="grow p-5 flex flex-col h-11/12 justify-end">
              <div>
                  {messageList.map((msg) => {
                    if(msg.hidden == false){
                      const date = new Date (msg.date).toUTCString()
                      var iUser = [];
                      users.forEach(aUser => {
                        if(aUser.userID == msg.userID){
                          iUser = aUser;
                        }
                      });                    
                      if(msg.id == reportValues.messageID){
                        return(
                          <div key={msg.id} className="border border-neutral-800 min-w-fit">
                            <Message 
                            displayName={iUser.displayName}
                            text={msg.text}
                            date={date}
                            imageURL={iUser.img}
                            key={msg.id}/>
                          </div>
                        )
                      }
                    }
                  })}
              </div>
              {/* <div className="grow h-full"></div> */}
              <div className="border border-neutral-700 rounded-xl h-fit text-wrap">
                {/* <input
                  type="text"
                  value={reportText}
                  placeholder="reason for report..."
                  onChange={updateReportText}
                  className="size-full p-2 w-full"
                /> */}
                <AutoGrowingTextarea placeholderText='reason for report...'/>
              </div>
              <div className="rounded-xl mt-1 grow h-16 bg-red-950 hover:bg-red-900">
                <button className="w-full h-full hover:cursor-pointer p-2" onClick={submitReport}>Submit Report</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }else{
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
              if(msg.userID == user.uid){
                return(
                  <div key={msg.id} className="border-t border-neutral-800">
                    <Message 
                    displayName={iUser.displayName}
                    text={msg.text}
                    date={date}
                    imageURL={iUser.img}
                    deleteMessage={()=>tryDeleteMessage(msg.id, msg.userID)}
                    key={msg.id}/>
                  </div>
                )
              }else{
                return(
                  <div key={msg.id} className="border-t border-neutral-800">
                    <Message 
                    displayName={iUser.displayName}
                    text={msg.text}
                    date={date}
                    imageURL={iUser.img}
                    reportMessage={()=>report(msg.id, msg.userID)}
                    key={msg.id}/>
                  </div>
                )
              }
            }
            
          })}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row w-auto h-full">
            {/* <div className="border border-neutral-700 rounded-xl p-2 grow">
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
            </div> */}
              <AutoGrowingTextarea placeholderText='Message...'/>
            <div className="self-center w-1/12 min-w-10 h-full border-3 border-blue-800 rounded-xl ml-2 bg-blue-500 hover:bg-blue-400">
              <div className="w-full h-full items-center justify-center text-blue-200 flex-nowrap grid grid-cols-1 grid-rows-1">
                <Icon icon='material-symbols:send-rounded' className="w-full h-10 col-start-1 row-start-1 "/>
                {/* <input 
                  type="submit"
                  value="send"
                  className="size-auto col-start-1 row-start-1 hover:cursor-pointer"
                /> */}
              </div>
            </div>
          </div>
      </form>
      </section>
    )
  }
}