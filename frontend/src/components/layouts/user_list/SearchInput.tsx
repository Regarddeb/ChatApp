import { userSearchActiveAtom } from "@atoms/menuAtoms";
import { searchTermAtom } from "@atoms/userListAtoms";
import { IconButton } from "@sharedComponents/button/IconButton";

import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { Input } from "@mantine/core";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";

export const SearchInput = () => {
    const [userSearchActive, setUserSearchActive] = useAtom(userSearchActiveAtom);
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

    const handleBackClick = () => {
        setUserSearchActive(false);
    }

    const handleUserSearchFocus = () => {
        setUserSearchActive(true);
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="w-full flex space-x-2">
            {userSearchActive &&
                <IconButton icon={<IconArrowLeft size={21} />} className='p-2' onClick={handleBackClick} />
            }
            <Input
                onFocus={handleUserSearchFocus}
                onChange={handleSearchChange}
                value={searchTerm}
                placeholder="Search chat history" variant="filled" className='w-full'
                leftSection={<IconSearch size={19} />}
            />
        </div>
    )
}