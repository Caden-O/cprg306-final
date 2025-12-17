import { useUserAuth } from "../../_utils/auth-context"

export default function Header({ channel }){
  const { firebaseSignOut } = useUserAuth();
  return(
    <section className="flex flex-row items-center h-full">
      <div className="ml-3 w-1/6">
        <h1 className="font-bold text-4xl">WebChat</h1>
      </div>
      <div className="grow">
        <p className="text-center">{channel}</p>
      </div>
      <div className="mr-3 w-1/6 text-right">
        <button onClick={firebaseSignOut} className="p-2 bg-red-800 rounded hover:cursor-pointer hover:underline h-full w-20">sign out</button>
      </div>
    </section>
  )
}