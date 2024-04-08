import { IconArrowBackUp, IconMoodSmile } from "@tabler/icons-react"

import { ChatData } from "@type/chat"
import { OutgoingReplyHeader } from "./OutgoingReplyHeader"

interface OutgoingProps {
    chatData: ChatData
}

export const Outgoing: React.FC<OutgoingProps> = ({ chatData }) => {
    return (
        <div className="w-full flex flex-col justify-end items-end p-2 group">

            <div className="flex flex-col justify-end items-end space-x-1 max-w-[65%] mb-1">

                {chatData.reply ? <OutgoingReplyHeader reply={chatData.reply} /> : null}

                <div className="flex flex-row-reverse items-end w-full z-10">
                    <div className="outgoing rounded-t-lg rounded-bl-lg p-2 text-start pl-3 text-sm max-w-[85%] group-hover:shadow-sm">
                        <p className="opacity-95 text-gray-50 w-full">
                            {chatData.message}
                        </p>
                    </div>
                    <div className="space-x-2 flex pr-2 opacity-0 group-hover:opacity-100">
                        <button className="flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconArrowBackUp size={17} /></button>
                        <button className="flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconMoodSmile size={17} /></button>
                    </div>
                </div>
            </div>

            <img className="rounded-lg bg-gray-400 ml-9 aspect-square w-52 h-52 max-w-52 max-h-52">
                
            </img>

        </div>
    )
}