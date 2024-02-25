import { IconMoodEmpty } from "@tabler/icons-react"

interface EmptyResultProps {
    message: string
}

export const EmptyResult: React.FC<EmptyResultProps> = ({ message }) => {
    return (
        <div className="w-full flex flex-col space-y-3 justify-center items-center">
            <IconMoodEmpty size={50} style={{ opacity: 0.5 }} />
            <p className="text-sm opacity-80">{message}</p>
        </div>
    )
}