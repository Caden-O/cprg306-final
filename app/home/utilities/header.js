import { useUserAuth } from "../../_utils/auth-context"

export default function Header({ channel, signOutEnabled }){
  const { firebaseSignOut } = useUserAuth();

  function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSignOut(){
    firebaseSignOut();
    // window.location.href = '/home';
  }

  return(
    <section className="flex flex-row items-center h-full">
      <div className="ml-3 w-1/6">
        <h1 className="font-bold text-4xl">WebChat</h1>
      </div>
      <div className="grow">
        <p className="text-center text-2xl">{capitalizeFirstLetter(channel)}</p>
      </div>
      <div className="mr-3 w-1/6 text-right">
        {signOutEnabled? (
          <button onClick={handleSignOut} className="p-2 bg-red-800 rounded hover:cursor-pointer hover:underline h-full w-20">sign out</button>
        ):(
          <button className="p-2 bg-red-900 rounded hover:cursor-not-allowed h-full w-20 text-neutral-400">sign out</button>
        )}
      </div>
    </section>
  )
}