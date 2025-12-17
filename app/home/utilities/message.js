import { Icon } from "@iconify/react";

export default function Message({ displayName, text, date, imageURL, report, deleteMessage }){
  return(
    <li>
      <div className="flex flex-row m-2 p-2 h-auto items-center border-t border-neutral-800">
        <div className="self-start size-16 min-w-16">
          {imageURL && (
            <img 
            src={imageURL}
            alt="your profile image."
            width={50}
            height={50} className="size-auto rounded-full object-cover"/>
          )}
        </div>
        <div className="flex flex-col grow mx-3 text-lg h-auto">
          <div className="flex flex-row w-full">
            <div className="self-start grow">
              <p className="font-bold">
                {displayName}
              </p>
            </div>
            <div className="self-end">
              <p className="text-neutral-500">
                {date}
              </p>
            </div>
          </div>
          <div className="text-xl wrap-anywhere h-auto">
            <p>{text}</p>
          </div>
        </div>
        <div className="text-center">
          <button onClick={report} className="size-12 font-bold text-red-800 text-4xl hover:cursor-pointer">
            <Icon icon="material-symbols:flag-rounded" className="size-full"/>
          </button>
        </div>
        <div className="text-center">
          <button onClick={deleteMessage} className="size-12 font-bold text-red-800 text-4xl hover:cursor-pointer">
            <Icon icon="mdi:trash" className="size-full"/>
          </button>
        </div>
      </div>
    </li>
  )
}