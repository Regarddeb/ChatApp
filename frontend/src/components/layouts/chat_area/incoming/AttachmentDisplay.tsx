import { Attachment, Reaction } from "@type/chat"
import { Buttons } from "../Buttons"
import { ChatReactions } from "../reaction/ChatReactions"

interface AttachmentProps {
    attachment: Attachment
    chat_id: number
    message: string
    reactions: Reaction[]
}

export const AttachmentDisplay: React.FC<AttachmentProps> = ({ attachment, chat_id, message, reactions }) => {
    return (
        <div className="flex items-center group pl-9 space-x-2">
            <div className="relative">
                <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${attachment.attachment_path}`}
                    alt="attachment"
                    className="rounded-lg bg-gray-400 max-w-52 max-h-52 aspect-square object-cover hover:opacity-80 cursor-pointer"
                />
                {reactions.length !== 0 ? <ChatReactions classes="left-0 mt-[-4px]" reactions={reactions} /> : null}
            </div>
            <Buttons chat_id={chat_id} message={message} reactions={reactions} />
        </div>
    )
}