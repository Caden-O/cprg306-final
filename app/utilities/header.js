export default function Header(){
  return(
    <section className="flex flex-row items-center">
      <div className="ml-3 w-1/6">
        <h1 className="font-bold text-4xl">WebChat</h1>
      </div>
      <div className="grow">
        <p className="text-center">center!</p>
      </div>
      <div className="mr-3 w-1/6 text-right">
        <button className=" text-neutral-500 hover:cursor-not-allowed">sign in</button>
      </div>
    </section>
  )
}