import group_chat_story from '@assets/images/illustration/group_chat_story.svg';

export default function Front() {
    return (
        <div className="w-7/12 h-full">
            <div className="w-full h-full relative">
                <div className="flex flex-col justify-center items-center h-full">

                    <div className='h-[600px] w-[600px]'
                        style={{
                            background: `url(${group_chat_story})`,
                            backgroundSize: 'cover'
                        }}
                    ></div>

                </div>
            </div>
        </div>
    )
} 