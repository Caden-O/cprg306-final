export default function Header({ middleText, signOut }){

  function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return(
    <section className="flex flex-row items-center h-full">
      <div className="ml-3 w-1/6">
        <h1 className="font-bold text-4xl">WebChat</h1>
      </div>
      <div className="grow">
        {middleText? (
          <p className="text-center text-2xl">{capitalizeFirstLetter(middleText)}</p>
        ):(
          <p className="text-center text-2xl"></p>
        )}
      </div>
      <div className="mr-3 w-1/6 text-right">
        {signOut&& (
          <button onClick={signOut} className="p-2 bg-red-800 rounded hover:cursor-pointer hover:underline h-full w-20">sign out</button>
        )}
      </div>
    </section>
  )
}