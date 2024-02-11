import { Incoming } from "./incoming/Incoming"
import { Outgoing } from "./outgoing/Outgoing"

export const ChatArea: React.FC = () => {
    return (
        <div className="w-full h-full overflow-y-auto flex flex-col-reverse">
            <Incoming />
            <Outgoing />
        </div>
    )
}