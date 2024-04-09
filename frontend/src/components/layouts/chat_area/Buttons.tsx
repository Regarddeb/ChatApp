import { IconArrowBackUp, IconMoodSmile } from "@tabler/icons-react"

interface ButtonsProps {
    chat_id: number
    message: string
}

export const Buttons: React.FC<ButtonsProps> = ({ chat_id, message }) => {

    const handleReplyClick = () => {
        console.log(chat_id, message);
    }

    const handleReactClick = () => {
        console.log(chat_id);
    }

    const classStyle = 'flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100'

    return (
        <div className="space-x-2 flex pr-2 opacity-0 group-hover:opacity-100">
            <button className={classStyle} onClick={handleReplyClick}>
                <IconArrowBackUp size={17} />
            </button>
            <button className={classStyle} onClick={handleReactClick}>
                <IconMoodSmile size={17} />
            </button>
        </div>
    )
}