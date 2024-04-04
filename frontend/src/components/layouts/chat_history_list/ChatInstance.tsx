import React from 'react';
import { IconDotsVertical } from "@tabler/icons-react";

import { userAtom } from '@atoms/userAtoms';
import { IconButton } from '@components/button/IconButton';
import { calculateTimeDifference } from '@utilities/timeDifference';
import { Thread, SeenBy } from '@type/chatHistory';
import { useAtomValue } from 'jotai';

interface ChatInstanceProps {
    thread: Thread
}

export const ChatInstance: React.FC<ChatInstanceProps> = ({ thread }) => {
    const user = useAtomValue(userAtom);

    const seen = thread.latest_chat.seen_by.some(seenBy => seenBy.member.user_id === user.id);

    return (
        <div className={`w-full hover:bg-secondary hover:bg-opacity-40 hover:shadow-sm group hover:cursor-pointer p-2 pl-1 flex items-center rounded-md ${!seen ? 'font-medium' : ''}`}>

            <div className="w-2/12">
                <div className="bg-gray-100 rounded-full w-[50px] h-[48px]">
                </div>
            </div>

            <div className="flex pl-3 flex-col w-full truncate space-y-1 text-ellipsis py-1 mr-1">

                <p className="text-sm text-start">{thread.user[0].username}</p>

                <p className="text-[12px] font-light opacity-70 relative text-start">

                    {thread.latest_chat.user ? thread.latest_chat.user.username + ' : ' : 'You : '}
                    {thread.latest_chat.has_attachment ? 'Sent a photo' : thread.latest_chat.message}

                    <span className="z-10 text-[10px] absolute right-0 bg-white pt-[2px] pl-[7px] group-hover:hidden">{calculateTimeDifference(thread.latest_chat.created_at)}</span>

                </p>

            </div>

            <div className="w-1/12 pt-1 hidden group-hover:flex">
                <IconButton icon={<IconDotsVertical size={18} style={{ opacity: 0.7 }} />} className='group-hover:border p-1 mr-[-10px] hover:bg-white' />
            </div>

        </div>
    );
}


