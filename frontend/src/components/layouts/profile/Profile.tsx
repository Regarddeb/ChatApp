import { Button } from "@mantine/core"
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";

import { DisplayPic } from "./DisplayPic";
import axios from '@utilities/axios';
import Toast from '@sharedComponents/feedback/Toast';
import { selectedUserAtom } from "@atoms/chatAtoms";
import { threadAtom } from "@atoms/chatAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { UserInitial } from "@type/userInitialValues";
import { userAtom } from "@atoms/userAtoms";

export const Profile: React.FC = () => {
    const queryClient = useQueryClient();
    const setThread = useSetAtom(threadAtom);
    const setSelectedUser = useSetAtom(selectedUserAtom);
    const navigate = useNavigate();
    const user = useAtomValue(userAtom);

    const mutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => axios.patch('api/user/logout'),
        onSuccess: (res: any) => {
             queryClient.invalidateQueries();
                navigate('/');
                Toast({ icon: 'success', title: res.data.message });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setSelectedUser([UserInitial]);
                setThread(null);
        },
        onError: () => {
            Toast({ icon: 'error', title: 'Logout Failed' });
        }
    })

    const handleLogout = () => {
        mutation.mutate();
    }

    return (
        <div className="w-full h-full flex flex-col pt-10">
            <div className="w-full h-full flex flex-col items-center justify-between">

                <div className="flex flex-col space-y-4 items-center">
                    <DisplayPic />
    
                    <div className="w-full text-center space-y-3">
                        <p className="text-3xl font-semibold opacity-70">{user.username}</p>
                        <p className="opacity-70">{user.active ? 'Active Now' : 'Offline'}</p>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <Button
                        variant="subtle"
                        className='hover:bg-[#F4A7AC] bg-[#EC777E] text-white hover:text-[#B31220] hover:bg-opacity-20 w-full'
                        radius="md"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
