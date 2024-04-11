import React from 'react';
import { IconDotsVertical } from "@tabler/icons-react";

import { userAtom } from '@atoms/userAtoms';
import { IconButton } from '@sharedComponents/button/IconButton';
import { calculateTimeDifference } from '@utilities/timeDifference';
import { Thread } from '@type/chatHistory';
import { useAtomValue, useSetAtom } from 'jotai';
import { User } from '@type/userTypes';
import { threadAtom } from '@atoms/chatAtoms';
import { selectedUserAtom } from '@atoms/chatAtoms';
import no_dp from '@assets/images/illustration/no_dp.svg';

interface ChatInstanceProps {
    thread: Thread
}

export const ChatInstance: React.FC<ChatInstanceProps> = ({ thread }) => {
    const user = useAtomValue(userAtom);
    const setThread = useSetAtom(threadAtom);
    const setSelectedUser = useSetAtom(selectedUserAtom);

    const seen = thread.latest_chat.seen_by.some(seenBy => seenBy.member.user_id === user.id);
    const threadActive = thread.member.some(member => member.user?.active === 1);

    const handleThreadClick = () => {
        setThread(thread.thread_id);
        setSelectedUser(thread.user);
    }

    return (
        <div
            onClick={() => handleThreadClick()}
            className={`w-full relative hover:bg-secondary hover:bg-opacity-40 hover:shadow-sm group hover:cursor-pointer p-2 pl-3 flex items-center rounded-md ${!seen ? 'font-medium' : ''}`}
        >

            <div className="w-2/12">
                <div
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: thread.member[0].user?.display_picture_path ?
                            `url(${import.meta.env.VITE_API_URL}/storage/${thread.member[0].user?.display_picture_path})` :
                            `url(${no_dp})`
                    }}
                    className={`bg-gray-100 rounded-full w-[50px] h-[48px] border-2 ${threadActive ? 'ring ring-offset-2 ring-green-500' : 'border-transparent'}`}
                >
                </div>
            </div>

            <div className="flex pl-3 flex-col w-full truncate space-y-1 text-ellipsis py-1 mr-1">

                <p className="text-sm text-start">
                    {
                        thread.user.map((user: User) => (
                            user.username
                        ))
                    }
                </p>

                <div className={`text-[12px] font-light opacity-70 relative text-start ${!seen ? 'font-medium' : ''}`}>

                    <p>
                        {thread.latest_chat.user ? thread.latest_chat.user.username + ' : ' : 'You : '}
                        {thread.latest_chat.has_attachment ? 'Sent a photo' : thread.latest_chat.message}
                    </p>

                    <span className={`z-10 text-[10px] absolute right-0 bottom-0 bg-white pt-[2px] pl-[7px] group-hover:hidden`}>
                        {calculateTimeDifference(thread.latest_chat.created_at)}
                    </span>

                </div>

            </div>

            <div className="w-1/12 pt-1 hidden group-hover:flex">
                <IconButton icon={<IconDotsVertical size={18} style={{ opacity: 0.7 }} />} className='group-hover:border p-1 mr-[-10px] hover:bg-white' />
            </div>

        </div>
    );
}


