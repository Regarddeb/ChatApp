import { Reaction } from "@type/chat"
import { RenderEmoji } from "./RenderEmoji"
import rankReactions from "@utilities/rankReactions"

interface ChatReactionsProps {
    classes: string
    reactions: Reaction[]
}

export const ChatReactions: React.FC<ChatReactionsProps> = ({ classes, reactions }) => {

    const topReactions = rankReactions(reactions);

    return (
        <div className={`absolute rounded-full p-0 py-[0.3px] px-1 w-fit bg-white text-xs cursor-pointer ${classes}`}>
            <div className={`w-full h-full flex items-center justify-center text-nowrap`}>

                {topReactions.map((reaction, index) => (
                    <RenderEmoji key={index} unifiedCode={reaction.reaction} />
                ))}

                {reactions.length > 1 ? <span className="px-1">{reactions.length}</span> : null}
            </div>
        </div>
    )
}