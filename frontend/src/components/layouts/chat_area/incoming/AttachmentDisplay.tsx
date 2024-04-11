import { Buttons } from "../Buttons"
import { ChatReactions } from "../reaction/ChatReactions"
import { AttachmentProps } from "@type/attachmentProps"

export const AttachmentDisplay: React.FC<AttachmentProps> = (
    {
        attachment,
        chat_id,
        message,
        reactions,
        user_id,
        username }
) => {
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
            <Buttons chat_id={chat_id} message={message} reactions={reactions} has_attachment={1} user_id={user_id} username={username} />
        </div>
    )
}