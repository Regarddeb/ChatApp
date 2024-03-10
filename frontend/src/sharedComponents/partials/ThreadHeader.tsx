import { selectedUserAtom } from "@atoms/chatAtoms";
import { ActveIndicator } from '@sharedComponents/partials/ActiveIndicator';
import { useAtom } from "jotai";

export const ThreadHeader = () => {
    const [selectedUser] = useAtom(selectedUserAtom);

    return (
        <div className="flex items-center space-x-3">
            {selectedUser.id === 0 ?
                <>
                    <div className="flex flex-col items-start p-1 rounded-md">
                        <span className="text-sm font-medium opacity-80">No user selected</span>
                        <span className="text-xs opacity-80">Select user to start chatting</span>
                    </div>
                </>
                :
                <>
                    <div className="rounded-full w-[35px] h-[35px] bg-gray-200"></div>
                    <div className="flex flex-col items-start p-1 rounded-md">
                        <span className="text-sm font-medium opacity-80">{selectedUser.username}</span>
                        <ActveIndicator active={selectedUser.active} logged_out={selectedUser.logged_out} />
                    </div>
                </>
            }
        </div>
    )

}