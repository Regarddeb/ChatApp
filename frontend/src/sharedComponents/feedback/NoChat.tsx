import no_chat from '@assets/images/illustration/no_chat.svg';

export const NoChat = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div>
                <img src={no_chat} alt="no thread open" height={300} width={300} />
                <p className='font-semibold text-xl opacity-50'>No messages in this thread</p>
            </div>
        </div>
    )
}