import { Input } from "@mantine/core";
import { IconSearch, IconArrowLeft } from "@tabler/icons-react";
import { ChangeEvent } from 'react';

import { searchChatHistoryActiveAtom } from '@atoms/menuAtoms';
import { searchChatHistoryTermAtom } from '@atoms/chatHistoryAtoms';
import { IconButton } from '@sharedComponents/button/IconButton';
import { useAtom } from 'jotai';

export const SearchInput = () => {
    const [searchHistoryTerm, setSearchHistoryTerm] = useAtom(searchChatHistoryTermAtom);
    const [searchHistoryActive, setSearchHistoryActive] = useAtom(searchChatHistoryActiveAtom);

    const handleSearchFocus = () => {
        setSearchHistoryActive(true);
    }

    const handleBackClick = () => {
        setSearchHistoryActive(false);
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchHistoryTerm(event.target.value);
    }

    return (
        <div className="w-full flex space-x-2">
            {searchHistoryActive &&
                <IconButton icon={<IconArrowLeft size={21} />} className='p-2' onClick={handleBackClick} />
            }
            <Input
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                value={searchHistoryTerm}
                placeholder="Search chat history"
                variant="filled"
                className='w-full'
                leftSection={<IconSearch size={19} />}
            />
        </div>
    )
}