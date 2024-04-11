import React from 'react';
import { IconButton } from "@sharedComponents/button/IconButton";
import { IconDotsVertical } from "@tabler/icons-react";
import { useQuery } from 'react-query';
import { useAtom, useSetAtom } from 'jotai';

import axios from "@utilities/axios";
import { User } from '@type/userTypes';
import { selectedUserAtom } from '@atoms/chatAtoms';
import { ActveIndicator } from '@sharedComponents/partials/ActiveIndicator';
import { threadAtom } from '@atoms/chatAtoms';
import no_dp from '@assets/images/illustration/no_dp.svg';

interface UserInstanceProps {
    user: User;
}

export const UserInstance: React.FC<UserInstanceProps> = ({ user }) => {
    const [, setSelectedUser] = useAtom(selectedUserAtom);
    const setThread = useSetAtom(threadAtom);

    const { data, refetch, isSuccess } = useQuery(
        ['threadWith', user.id],
        async () => {
            const response = await axios.get(`/api/thread/with/${user.id}`);
            return response.data;
        },
        { enabled: false }
    );

    const handleUserClick = () => {
        refetch();
        if (isSuccess) {
            setSelectedUser([user]);
            setThread(data.threads.length > 0 ? data.threads[0].thread_id : null);
        }
    }

    return (
        <div
            onClick={handleUserClick}
            className="flex group items-center justify-between group space-x-2 hover:bg-secondary hover:cursor-pointer hover:bg-opacity-50 p-2 rounded-md pr-3">

            <div className="w-2/12">
                <div
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: user.display_picture_path ?
                            `url(${import.meta.env.VITE_API_URL}/storage/${user.display_picture_path})` :
                            `url(${no_dp})`
                    }}
                    className={`rounded-full bg-gray-300 w-[40px] h-[40px] ${user.active ? 'ring ring-offset-2 ring-green-500' : ''}`}
                >

                </div>
            </div>

            <div className="w-full flex flex-col space-y-1 truncate text-ellipsis px-2">
                <p className="text-sm text-gray-800 opacity-80 group-hover:opacity-90 text-start">{user.username}</p>
                <ActveIndicator active={user.active} logged_out={user.logged_out} />
            </div>
            <div className="w-1/12">
                <IconButton icon={<IconDotsVertical size={19} />} className="p-1.5 border hidden group-hover:flex" />
            </div>
        </div>
    );
};