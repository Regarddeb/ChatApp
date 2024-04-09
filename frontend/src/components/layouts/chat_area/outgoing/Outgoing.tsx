import { Buttons } from "../Buttons"
import { ChatData } from "@type/chat"
import { OutgoingReplyHeader } from "./OutgoingReplyHeader"
import { AttachmentDisplay } from "./AttachmentDisplay"

interface OutgoingProps {
    chatData: ChatData
}

export const Outgoing: React.FC<OutgoingProps> = ({ chatData }) => {
    return (
        <div className="w-full flex flex-col justify-end items-end p-2 group">

            <div className="flex flex-col justify-end items-end space-x-1 max-w-[65%] mb-1">

                {chatData.reply ? <OutgoingReplyHeader reply={chatData.reply} /> : null}

                <div className="flex flex-row-reverse items-end w-full z-10">
                    <div className="outgoing rounded-t-lg rounded-bl-lg p-2 text-start pl-3 text-sm group-hover:shadow-sm">
                        <p className="opacity-95 text-gray-50">
                            {chatData.message}
                        </p>
                    </div>
                    {!chatData.has_attachment ?
                        <Buttons
                            chat_id={chatData.chat_id}
                            message={chatData.message}
                        />
                        : null
                    }
                </div>

            </div>

            {chatData.has_attachment ?
                <AttachmentDisplay
                    attachment={chatData.attachment}
                    chat_id={chatData.chat_id}
                    message={chatData.message}
                />
                : null
            }

        </div>
    )
}

