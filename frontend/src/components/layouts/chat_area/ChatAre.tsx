import { Incoming } from "./Incoming"

export const ChatArea = () => {
    return (
        <div className="w-full h-full overflow-y-auto flex flex-col-reverse">
            <Incoming />
        </div>
    )
}