
interface AttachmentNameProps {
    attachment: File | null;
}

export const AttachmentName: React.FC<AttachmentNameProps> = ({ attachment }) => {
    return (
        <div className='bg-gray-100 max-w-20 text-xs h-fit p-1 rounded-md flex items-center'>
            <p className='truncate'>{attachment?.name}</p>
        </div>
    )
}