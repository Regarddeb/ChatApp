import { selectedUserAtom } from "@atoms/chatAtoms";
import { ActveIndicator } from '@sharedComponents/partials/ActiveIndicator';
import { useAtomValue } from "jotai";
import { User } from "@type/userTypes";
import { useRef } from "react";
import no_dp from '@assets/images/illustration/no_dp.svg';

export const ThreadHeader = () => {
    const selectedUser = useAtomValue(selectedUserAtom);
    const logged_out = useRef<string | null>(null);

    const active = selectedUser.some((user) => user.active);

    if (!active) {
        const sortedUserData = selectedUser.sort((a, b) => {
            return new Date(b.logged_out).getTime() - new Date(a.logged_out).getTime();
        });

        logged_out.current = sortedUserData[0].logged_out;
    }

    return (
        <div className="flex items-center space-x-3">
            {selectedUser[0].id === 0 ?
                <>
                    <div className="flex flex-col items-start p-1 rounded-md">
                        <span className="text-sm font-medium opacity-80">No user selected</span>
                        <span className="text-xs opacity-80">Select user to start chatting</span>
                    </div>
                </>
                :
                <>
                    <img
                        src={`${selectedUser[0].display_picture_path ?
                                import.meta.env.VITE_API_URL + '/storage/' + selectedUser[0].display_picture_path
                                : no_dp
                            }`}
                        className="rounded-full w-[35px] h-[35px] bg-gray-200 object-cover border"
                    />
                    <div className="flex flex-col items-start p-1 rounded-md">
                        <span className="text-sm font-medium opacity-80">
                            {selectedUser.map((user: User) => (user.username))}
                        </span>
                        <ActveIndicator active={active ? 1 : 0} logged_out={logged_out.current} />
                    </div>
                </>
            }
        </div >
    )

}