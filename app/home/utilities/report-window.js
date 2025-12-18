import { useEffect, useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { Icon } from "@iconify/react";

export default function ReportWindow({messages, users, setReportWindowOpen}){
  const { user } = useUserAuth();
  const [messageList, setMessageList] = useState([]);
  const [reportText, setReportText] = useState('');
  const [reportValues, setReportValues] = useState(
    {messageID: ''},
    {userID: ''}
  )

  useEffect(()=>{
    setMessageList([...messages])
  }, [users, messages])
  
  
  return(
        <section className="flex flex-col h-full w-auto">
          <div className="grow flex flex-col-reverse h-full overflow-y-auto">
            <div className="w-auto h-full m-5 border-2 border-neutral-600 overflow-y-scroll">
              <div className="flex w-full items-center justify-center h-1/12 border-b-2 border-neutral-600 overflow-hidden">
                <div className="w-1/6">
                  <button onClick={closeReport} className="hover:cursor-pointer m-2 p-2 bg-neutral-800 rounded size-auto">
                    <Icon icon={'weui:back-filled'} className="size-full"></Icon>
                  </button>
                </div>
                <div className="grow text-center h-fit">
                  <p>Reporting Message:</p>
                </div>
                <div className="w-1/6"></div>
              </div>
              <div className="grow p-5 flex flex-col h-11/12 justify-end">
                <div>
                    {messageList.map((msg) => {
                      if(msg.hidden == false){
                        const date = new Date (msg.date).toUTCString()
                        var iUser = [];
                        users.forEach(aUser => {
                          if(aUser.userID == msg.userID){
                            iUser = aUser;
                          }
                        });                    
                        if(msg.id == reportValues.messageID){
                          return(
                            <div key={msg.id} className="border border-neutral-800 min-w-fit">
                              <Message 
                              user={iUser}
                              text={msg.text}
                              date={date}
                              key={msg.id}/>
                            </div>
                          )
                        }
                      }
                    })}
                </div>
                <div className="grow h-full"></div>
                <div className="border border-neutral-700 rounded-xl h-fit text-wrap">
                  <input
                    type="text"
                    value={reportText}
                    placeholder="reason for report..."
                    onChange={updateReportText}
                    className="size-full p-2 w-full"
                  />
                </div>
                <div className="rounded-xl mt-1 grow h-16 bg-red-950 hover:bg-red-900">
                  <button className="size-full hover:cursor-pointer p-2" onClick={submitReport}>Submit Report</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )

      function closeReport(){
        setReportValues({messageID:''},{userID:''})
        setReportWindowOpen(false)
      }

      function submitReport(){
        const today = new Date().getTime();
        createReport(reportValues.userID, user.uid, reportValues.messageID, reportText, today, reportValues.channel);
        closeReport();
      }

      function updateReportText(event){
        setReportText(event.target.value)
      }
}