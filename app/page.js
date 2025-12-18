"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
  const router = useRouter();

  useEffect(() => {
    const syncAndRedirect = async () => {
      router.replace("/home");
    };
    syncAndRedirect();
  }, [router]);
  return(
    <main>
      <div className="flex flex-col items-center">
        <p className="mt-5 p-3 text-4xl font-semibold text-neutral-500">aaah! this page should redirect to '/home'!</p>
        <p className="m-2 italic text-lg text-neutral-500">if it doesnt, you can navigate there with the link below:</p>
        <Link className="m-2 italic text-lg text-blue-200 hover:underline" href={`/home`}>manual redirect...</Link>
      </div>
    </main>
  )
}