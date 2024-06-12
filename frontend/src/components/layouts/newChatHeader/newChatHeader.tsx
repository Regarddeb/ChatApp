import { TextInput } from "@mantine/core"

export const NewChatHeader: React.FC = () => {
    return (
        <div className="w-full py-1.5 px-2">
            <p className="font-light">To: </p>
            <TextInput variant="" />
        </div>
    )
}