import { IconArrowBackUp } from "@tabler/icons-react";
import { ChatIconButton } from "@sharedComponents/button/ChatIconButton";
import { ReactionMenu } from "./reaction/ReactionMenu";
import { ButtonsProps } from "@type/buttonsProps";
import { replyToChatAtom } from "@atoms/chatAtoms";
import { useSetAtom } from "jotai";

export const Buttons: React.FC<ButtonsProps> = ({ chat_id, message, reactions, has_attachment, user_id, username }) => {
    const setReplyTo = useSetAtom(replyToChatAtom);

    const handleReplyClick = () => {
        setReplyTo({
            chat_id: chat_id,
            user_id: user_id,
            message: message,
            has_attachment: has_attachment,
            username: username
        })
    };

    return (
        <div className="space-x-2 flex pr-2 opacity-0 group-hover:opacity-100">
            <ChatIconButton classes="p-1 text-lg" onClick={handleReplyClick}>
                <IconArrowBackUp size={17} />
            </ChatIconButton>

            <ReactionMenu chat_id={chat_id} reactions={reactions} />
        </div>
    );
};
