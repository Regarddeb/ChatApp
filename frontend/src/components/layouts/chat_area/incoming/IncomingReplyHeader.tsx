import { IconArrowBackUp } from "@tabler/icons-react"

import { Reply } from "@type/chat"
import { userAtom } from "@atoms/userAtoms"
import { useAtomValue } from "jotai"

interface IncomingReplyHeaderProps {
    reply: Reply
}

export const IncomingReplyHeader: React.FC<IncomingReplyHeaderProps> = ({ reply }) => {
    const user = useAtomValue(userAtom);

    return (
        <div className="max-w-[70%]">
            <p className="text-xs opacity-80 text-start flex items-center space-x-1 mb-1">
                <IconArrowBackUp size={15} /><span>{reply.user.username} replied to {reply.user.id === user.id ? reply.user.username : 'themself'}</span>
            </p>
            <p className="bg-[#F1F3F5] w-fit bg-opacity-90 opacity-70 text-xs pb-5 mb-[-20px] px-3 pt-2 rounded-full rounded-bl-sm truncate">
                {reply.message}
            </p>
        </div>
    )
}