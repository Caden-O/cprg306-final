"use client";
import Image from "next/image"
import { useUserAuth } from "../../_utils/auth-context";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function MemberList({ users }){
  const { user } = useUserAuth();
  const [userList, setUserList] = useState([]);

  useEffect(()=>{
    setUserList(users)
  }, [users])

  function User({photoURL, displayName, email}){
    return(
      <div className="my-5 flex h-16">
        {photoURL ? (
          <Image 
          alt={`${displayName}'s profile image.`}
          width={50}
          height={50}
          src={photoURL}
          className="size-auto rounded-full object-cover"/>
        ) : (
            <img
            alt={`missing profile image.`}
            width={50}
            height={50}
            source="./img/Screenshot2025-12-16201634.png"
            className="size-auto rounded-full object-cover"/>
        )}
          <div className="size-full flex justify-center flex-col grow ml-2">
            <p className="text-lg">{displayName}</p>
            <p className="text-neutral-500 text-sm">{email}</p>
          </div>
      </div>
    )
  }

  return(
    <section className="flex flex-col h-full">
        <div className="h-auto">
          <h2 className="text-xl text-center font-semibold">
            Members
          </h2>
          <hr className="m-3 text-neutral-600"/>
        </div>

        <div className="grow overflow-y-auto overflow-x-scroll">
          {userList.map((mUser)=>{            
            if(mUser.userID !== user.uid && mUser.status !== 'muted'){
              return(
                <User photoURL={mUser.img} displayName={mUser.displayName} email={mUser.email} key={mUser.userID}/>
              )
            }
          })}
        </div>

        <div className="h-auto overflow-x-auto">
          <hr className="m-3 text-neutral-600"/>
          <div className="flex h-fit">
            <Image 
              alt="your profile image."
              width={50}
              height={50}
              src={user.photoURL}
              className="size-auto rounded-full object-cover"/>
              <div className="size-full flex justify-center flex-col grow ml-2">
                <p className="text-lg">{user.displayName}</p>
                <p className="text-neutral-500 text-sm">{user.email}</p>
              </div>
          </div>
        </div>
    </section>
  )
}