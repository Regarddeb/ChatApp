

interface ChatIconButtonProps {
    classes: string
    children: React.ReactNode
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}

export const ChatIconButton: React.FC<ChatIconButtonProps> = ({ classes, children, onClick }) => {
    return (
        <button
            className={`flex rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100 ${classes}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}