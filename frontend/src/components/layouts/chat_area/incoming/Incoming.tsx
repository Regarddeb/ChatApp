import { IconArrowBackUp, IconMoodSmile } from "@tabler/icons-react"

import { ChatData } from "@type/chat"
import { IncomingReplyHeader } from "./IncomingReplyHeader"

interface IncomingProps {
    chatData: ChatData
}

export const Incoming: React.FC<IncomingProps> = ({ chatData }) => {

    return (
        <div className="w-full p-2 flex flex-col items-start">

            <div className="flex w-full items-end space-x-1 mb-1">

                {/* img */}
                <div className="bg-gray-200 h-[30px] w-[30px] rounded-full"></div>

                {/* chat */}
                <div className="w-[65%] flex flex-col">

                    {chatData.reply ? <IncomingReplyHeader reply={chatData.reply} /> : null}

                    <div className="flex flex-col w-full">
                        {!chatData.reply_to ? <p className="text-xs text-start mb-[-5px] pl-1 opacity-80">{chatData.user?.username}</p> : null}
                        <div className="flex w-full space-x-1 items-end mt-2 group">

                            <div className="bg-secondary max-w-[86%] rounded-t-xl rounded-br-xl text-sm text-start p-2.5 group-hover:shadow-sm">
                                <p className="opacity-90 text-gray-900">
                                    {chatData.message}
                                </p>
                            </div>

                            <div className="space-x-2 flex opacity-0 group-hover:opacity-100">
                                <button className="flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconArrowBackUp size={17} /></button>
                                <button className="flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconMoodSmile size={17} /></button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <img className="rounded-lg bg-gray-400 ml-9 aspect-square w-52 h-52 max-w-52 max-h-52">

            </img>
        </div>
    )
}
