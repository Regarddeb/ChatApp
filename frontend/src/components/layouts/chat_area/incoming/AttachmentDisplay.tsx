import { Attachment } from "@type/chat"
import { Buttons } from "../Buttons"

interface AttachmentProps {
    attachment: Attachment
    chat_id: number
    message: string
}

export const AttachmentDisplay: React.FC<AttachmentProps> = ({ attachment, chat_id, message }) => {
    return (
        <div className="flex items-end group pl-9 space-x-2">
            <img
                src={`${import.meta.env.VITE_API_URL}/storage/${attachment.attachment_path}`}
                alt="attachment"
                className="rounded-lg bg-gray-400 max-w-52 max-h-52 aspect-square object-cover hover:opacity-80 cursor-pointer"
            >
            </img>
            <Buttons chat_id={chat_id} message={message} />
        </div>
    )
}