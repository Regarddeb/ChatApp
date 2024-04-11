import { IconArrowBackUp } from "@tabler/icons-react";
import { ChatIconButton } from "@sharedComponents/button/ChatIconButton";
import { ReactionMenu } from "./reaction/ReactionMenu";
import { Reaction } from "@type/chat";

interface ButtonsProps {
    chat_id: number;
    message: string;
    reactions: Reaction[]
}

export const Buttons: React.FC<ButtonsProps> = ({ chat_id, message, reactions }) => {

    const handleReplyClick = () => {
        console.log(chat_id, message);
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
