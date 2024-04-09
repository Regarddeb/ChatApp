import { IconArrowBackUp } from "@tabler/icons-react"

import { Reply } from "@type/chat"
import { userAtom } from "@atoms/userAtoms"
import { useAtomValue } from "jotai"

interface OutgoingReplyHeaderProps {
    reply: Reply
}

export const OutgoingReplyHeader: React.FC<OutgoingReplyHeaderProps> = ({ reply }) => {
    const user = useAtomValue(userAtom);

    return (
        <div className="text-end w-full flex flex-col items-end">
            <p className="text-xs opacity-80 flex items-center space-x-1 mb-1">
                <IconArrowBackUp size={15} /><span>You replied to {reply.user.id === user.id ? 'yourself' : reply.user.username}</span>
            </p>
            <p className="w-fit text-end truncate text-xs bg-[#F1F3F5] bg-opacity-90 opacity-70 pb-5 mb-[-10px] z-1 pt-2 pr-2 pl-3 rounded-full rounded-br-sm">
                {reply.message}
            </p>
        </div>
    )
}