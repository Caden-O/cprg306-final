"use client";
import { useState } from "react"
import Message from "./message"

export default function TextChannel(){
  const [message, setMessage] = useState("");

  function updateMessage(event){
    setMessage(event.target.value);
  }
  function handleSubmit(event){
    event.preventDefault();
    setMessage("");
    console.log("submitted successfully!");
    
  }
  return(
    <section className="flex flex-col h-full">
      <div className="grow flex flex-col-reverse">
        <Message user="me" text="aaah!" date="Jan 1st, 2025"/>
      </div>

      <form  
        onSubmit={handleSubmit}
        className="flex flex-row w-auto h-16"
      >
        <div className="border-2 border-neutral-700 rounded-xl p-2 grow">
          <input
            type="text"
            required={true}
            name="message"
            id="message"
            value={message} 
            placeholder="Message..."
            onChange={updateMessage}
            className="w-full h-full placeholder:text-xl placeholder:italic font-thin"
          />
        </div>
        <div className="self-center w-15 border-3 border-blue-950 rounded-xl ml-2 h-full bg-blue-800">
          <input 
            type="submit"
            value="Send"
            className="w-full h-full hover:cursor-pointer items-center text-blue-200"
          />
        </div>
      </form>
    </section>
  )
}