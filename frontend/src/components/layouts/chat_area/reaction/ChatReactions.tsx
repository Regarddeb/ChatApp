import { RenderEmoji } from "./RenderEmoji"

interface ChatReactionsProps {
    classes: string
}

export const ChatReactions: React.FC<ChatReactionsProps> = ({ classes, }) => {
    return (
        <div className={`absolute rounded-full p-0 py-[0.3px] px-1 w-fit bg-white text-xs cursor-pointer ${classes}`}>
            <div className={`w-full h-full flex items-center justify-center text-nowrap`}>
                <RenderEmoji unifiedCode="1f60d" />
                <RenderEmoji unifiedCode="1f60d" />
                <RenderEmoji unifiedCode="1f60d" />
                <span className="px-1">3</span>
            </div>
        </div>
    )
}   