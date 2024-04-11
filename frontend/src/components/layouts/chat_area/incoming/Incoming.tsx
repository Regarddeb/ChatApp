import { Buttons } from "../Buttons"
import { ChatData } from "@type/chat"
import { IncomingReplyHeader } from "./IncomingReplyHeader"
import { AttachmentDisplay } from "./AttachmentDisplay"
import no_dp from '@assets/images/illustration/no_dp.svg';
import { ChatReactions } from "../reaction/ChatReactions";

interface IncomingProps {
    chatData: ChatData
}

export const Incoming: React.FC<IncomingProps> = ({ chatData }) => {

    return (
        <div className="w-full p-2 flex flex-col items-start">
            <div className="flex w-full items-end space-x-1 mb-1">

                {/* img */}
                <img
                    src={`${chatData.user?.display_picture_path ? import.meta.env.VITE_API_URL + '/storage/' + chatData.user?.display_picture_path : no_dp}`}
                    alt=""
                    className="bg-gray-200 h-[30px] w-[30px] object-cover border rounded-full"
                />

                {/* chat */}
                <div className="w-[65%] flex flex-col">

                    {chatData.reply ? <IncomingReplyHeader reply={chatData.reply} /> : null}

                    <div className="flex flex-col w-full">

                        {!chatData.reply_to ? <p className="text-xs text-start mb-[-5px] pl-1 opacity-80">{chatData.user?.username}</p> : null}

                        <div className="flex w-full space-x-1 items-center mt-2 group">
                            <div className="bg-secondary relative max-w-[86%] rounded-t-xl rounded-br-xl text-sm text-start p-2.5 group-hover:shadow-sm">
                                <p className="opacity-90 text-gray-900">
                                    {chatData.message}
                                </p>

                                {(chatData.reaction.length !== 0 && !chatData.has_attachment) ?
                                    <ChatReactions classes="left-0 mt-1.5" reactions={chatData.reaction} />
                                    : null
                                }
                            </div>

                            {!chatData.has_attachment ?
                                <Buttons
                                    chat_id={chatData.chat_id}
                                    message={chatData.message}
                                    reactions={chatData.reaction}
                                />
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            {chatData.has_attachment ?
                <AttachmentDisplay
                    attachment={chatData.attachment}
                    chat_id={chatData.chat_id}
                    message={chatData.message}
                    reactions={chatData.reaction}
                />
                : null
            }
        </div>
    )
}
