"use client";
import Image from "next/image";

export default function Message({ user, text, date }){
  return(
    <div className="flex flex-row m-2 p-2 h-15 items-center outline">
        <div className="self-center w-10 h-10 bg-green-500 outline">
          <p>1</p>
        </div>
        <div className="flex flex-col grow mx-2">
              <div className="w-1/12 font-bold">
                {user}
              </div>
              <div className="text-lg">
                {text}
              </div>
        </div>
          <div className="self-end  outline">
            <p className="text-neutral-500 mx-2">{date}</p>
          </div>
          <div className="text-center outline">
            <button className="w-10 font-bold text-red-500 text-4xl hover:cursor-pointer">
              !
            </button>
          </div>
    </div>
  )
}