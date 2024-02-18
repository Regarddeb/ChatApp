import { IconArrowLeft, IconSquarePlus, IconSearch } from "@tabler/icons-react";
import { IconButton } from "@components/button/IconButton";
import { Input } from "@mantine/core";
import { UserInstance } from "./UserInstance";
import { userSearchActiveAtom } from "@atoms/menuAtoms";
import { useAtom } from "jotai";

export const UserList: React.FC = () => {
    const [userSearchActive, setUserSearch] = useAtom(userSearchActiveAtom);

    const handleBackClick = () => {
        setUserSearch(false);
    }

    const handleUserSearchFocus = () => {
        setUserSearch(true);
    }

    return (
        <>
            <div className="w-full pl-1 flex justify-between items-center">
                <p className="py-1 pl-1 text-start flex space-x-2 items-center">
                    <span className="font-medium">Users</span>
                </p>
                <IconButton icon={<IconSquarePlus size={20} />} className='p-1.5' />
            </div>

            <div className="w-full flex space-x-2">
                {userSearchActive &&
                    <IconButton icon={<IconArrowLeft size={21} />} className='p-2' onClick={handleBackClick} />
                }
                <Input onFocus={handleUserSearchFocus} placeholder="Search chat history" variant="filled" className='w-full' leftSection={<IconSearch size={19} />} />
            </div>

            <div className={`w-full flex-col space-y-2 overflow-y-auto pr-0`}>
                <UserInstance />
            </div>
        </>
    )
}
