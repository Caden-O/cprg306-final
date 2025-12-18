import { Icon } from "@iconify/react";

export default function Message({ user, text, date, reportMessage, deleteMessage }){
  return(
    <li className="list-none min-w-fit">
      <div className="flex flex-row m-2 p-2 h-auto items-center">
        <div className="self-start size-16 min-w-16">
          {user.img && (
            <img 
            src={user.img}
            alt="profile image"
            width={50}
            height={50} className="size-auto rounded-full object-cover"/>
          )}
        </div>
        <div className="flex flex-col grow mx-3 text-lg h-auto">
          <div className="flex flex-row w-full min-w-fit text-nowrap">
            <div className="self-start grow">
              <p className="font-bold">
                {user.displayName}
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
        {reportMessage&&(
          <div className="text-center">
            <button onClick={reportMessage} className="size-12 font-bold text-red-800 text-4xl hover:cursor-pointer">
              <Icon icon="material-symbols:flag-rounded" className="size-full"/>
            </button>
          </div>
        )}
        {deleteMessage&&(
          <div className="text-center">
            <button onClick={deleteMessage} className="size-12 font-bold text-red-800 text-4xl hover:cursor-pointer">
              <Icon icon="mdi:trash" className="size-full"/>
            </button>
          </div>
        )}
      </div>
    </li>
  )
}