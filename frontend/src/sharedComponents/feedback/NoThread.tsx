import no_thread from '@assets/images/illustration/no_thread.svg';

export const NoThread = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div>
                <img src={no_thread} alt="no thread open" height={300} width={300} />
                <p className='font-semibold text-xl opacity-50'>No Chat Open</p>
            </div>
        </div>
    )
}