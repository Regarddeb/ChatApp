import { replyToChatAtom } from "@atoms/chatAtoms"
import { useAtom } from "jotai"
import { IconButton } from "@sharedComponents/button/IconButton";

import { replyToInitial } from "@type/replyToChat";
import { IconPaperclip } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

export const ReplyTo: React.FC = () => {
    const [replyToChat, setReplyTo] = useAtom(replyToChatAtom);

    const handleCancelReply = () => {
        setReplyTo(replyToInitial);
    }

    return (
        <div className="w-full flex justify-between border-y px-3 py-3">
            <div className="flex flex-col text-start max-w-[50%] space-y-1">
                <p className="text-xs font-semibold truncate space-x-1 flex items-center">
                    {replyToChat.has_attachment ? <IconPaperclip size={15} /> : null}
                    <span>Replying to {replyToChat.username ? replyToChat.username : ' yourself'}</span>
                </p>

                <p className="text-xs truncate">{replyToChat.message}</p>
            </div>

            <div className="h-fit mt-[-5px] mr-[-5px]">
                <IconButton
                    icon={<IconX size={17} />}
                    className="p-1.5"
                    onClick={handleCancelReply}
                />
            </div>
        </div>
    )
}