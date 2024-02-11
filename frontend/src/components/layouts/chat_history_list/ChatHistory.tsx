import React from 'react';
import { Input } from "@mantine/core";
import { IconSquarePlus, IconSearch, IconArrowLeft } from "@tabler/icons-react";

import { ChatInstance } from "./ChatInstance";
import { searchHistoryActiveAtom } from '@atoms/menuAtoms';
import { IconButton } from '@components/button/IconButton';
import { useAtom } from 'jotai';

const numberOfChatInstances = 10;

export const ChatHistory: React.FC = () => {
    const [searchHistoryActive, setSearchHistoryActive] = useAtom(searchHistoryActiveAtom);

    const chatInstances = [];

    for (let i = 0; i < numberOfChatInstances; i++) {
        chatInstances.push(<ChatInstance key={i} />);
    }

    const handleSearchFocus = () => {
        setSearchHistoryActive(true)
    }

    const handleBackClick = () => {
        setSearchHistoryActive(false)
    }

    return (
        <>
            <div className="w-full pl-1 flex justify-between items-center">
                <p className="py-1 pl-1 text-start flex space-x-2 items-center">
                    <span className="font-medium">Messages</span>
                </p>
                <IconButton icon={<IconSquarePlus size={20} />} className='p-1.5' />
            </div>

            <div className="w-full flex space-x-2">
                {searchHistoryActive &&
                    <IconButton icon={<IconArrowLeft size={21} />} className='p-2' onClick={handleBackClick} />
                }
                <Input onFocus={handleSearchFocus} placeholder="Search chat history" variant="filled" className='w-full' leftSection={<IconSearch size={19} />} />
            </div>

            <div className="w-full pr-2 flex-col space-y-2 overflow-y-auto">
                {!searchHistoryActive ?
                    (chatInstances) :
                    (<>
                    </>)
                }
            </div>
        </>
    )
}
