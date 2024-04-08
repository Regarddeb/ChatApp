import { Button } from "@mantine/core"
import { useQueryClient } from 'react-query';

import axios from '@utilities/axios';
import Toast from '@sharedComponents/feedback/Toast';
import { selectedUserAtom } from "@atoms/chatAtoms";
import { threadAtom } from "@atoms/chatAtoms";
import { useSetAtom } from "jotai";
import { UserInitial } from "@type/userInitialValues";

export const Profile = () => {
    const queryClient = useQueryClient();
    const setThread = useSetAtom(threadAtom);
    const setSelectedUser = useSetAtom(selectedUserAtom);

    const handleLogout = () => {
        axios.patch('api/user/logout')
            .then((res) => {
                queryClient.invalidateQueries();
                window.location.href = '/';
                Toast({ icon: 'success', title: res.data.message });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setSelectedUser([UserInitial]);
                setThread(null);
            })
            .catch(() => {
                Toast({ icon: 'error', title: 'Logout Failed' });
            });
    }

    return (
        <div className="w-full h-full flex flex-col py-10">
            <div className="w-full flex flex-col justify-center items-center space-y-4">
                <div className="h-44 w-44 rounded-full bg-gray-200"></div>
                <div className="w-full flex flex-col space-y-1">
                    <Button
                        variant="subtle"
                        className='hover:bg-primary hover:bg-opacity-90 hover:text-white w-full'
                        radius="md"
                        color='#7a84ba'
                    >
                        Change Profile Picture
                    </Button>
                    <Button
                        variant="subtle"
                        className='hover:bg-[#B00000] hover:bg-opacity-90 hover:text-white w-full'
                        radius="md"
                        color="#B00000"
                        onClick={handleLogout} // Use the memoized handleLogout function
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
