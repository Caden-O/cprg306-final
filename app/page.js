"use client";

import Link from "next/link"
window.location.href = './home';

export default function Page(){
  return(
    <main>
      <div className="flex flex-col items-center">
        <p className="mt-5 p-3 text-4xl font-semibold">aaah! this page should redirect to '/home'!</p>
        <p className="m-2 italic text-lg">if it doesnt, you can navigate there with the link below:</p>
        <Link className="m-2 italic text-lg text-blue-200 hover:underline visited:text-purple-200" href={`/home`}>(Take me to the home page!)</Link>
      </div>
    </main>
  )
}