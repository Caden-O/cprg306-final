import { useState, useEffect } from "react"

export default function ChannelSurfer({ channels, handleSelectChannel }){
  const [ channelList, setChannelList ] = useState([])
  useEffect(() =>{
    setChannelList([...channels])
  }, [channels])

  if(channelList !== null){    
    return(
      <section className="flex flex-col h-full">
        <div>
          <h2 className="text-xl text-center font-semibold">
            Channels
          </h2>
          <hr className="m-3 text-neutral-600"/>
        </div>
          <div className="size-full">
              {channelList.map((channel) => {
                return(
                  <button onClick={() => handleSelectChannel(channel.id)} key={channel.id} className="text-xl text-left m-1 p-1 pb-3 hover:text-blue-200 hover:cursor-pointer hover:bg-neutral-900 border-b border-neutral-800 w-full h-fit rounded-lg">
                    <p>- {channel.id}</p>
                  </button>
                )
              })}
          </div>
      </section>
    )
  }
}