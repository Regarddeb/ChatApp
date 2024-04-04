import React from "react";
import { IconSquarePlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useInfiniteQuery } from "react-query";

import axios from "@utilities/axios";
import { ChatInstance } from "./ChatInstance";
import { MenuLoading } from "@sharedComponents/loader/MenuLoading";
import { IconButton } from '@components/button/IconButton';
import { searchChatHistoryActiveAtom } from '@atoms/menuAtoms';
import { searchChatHistoryTermAtom } from '@atoms/chatHistoryAtoms';
import { SearchInput } from "./SearchInput";
import { EmptyResult } from "@sharedComponents/feedback/EmptyResult";
import { Thread } from "@type/chatHistory";

export const ChatHistory: React.FC = () => {
    const searchHistoryActive = useAtomValue(searchChatHistoryActiveAtom);
    const searchHistoryTerm = useAtomValue(searchChatHistoryTermAtom);

    const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['chatHistoryList', searchHistoryTerm],
        async ({ pageParam = 1 }) => {
            const response = await axios.get(`/api/thread/all-threads?page=${pageParam}&search=${searchHistoryTerm}`);
            return response.data;
        },
        {
            getNextPageParam: (lastPage) => lastPage.threads.next_page_url ? lastPage.threads.current_page + 1 : undefined,
        }
    );

    return (
        <>
            <div className="w-full pl-1 flex justify-between items-center">
                <p className="py-1 pl-1 text-start flex space-x-2 items-center">
                    <span className="font-medium">Messages</span>
                </p>
                <IconButton icon={<IconSquarePlus size={20} />} className='p-1.5' />
            </div>

            <SearchInput />

            <div className={`w-full h-full flex-col space-y-2 overflow-y-auto ${searchHistoryActive ? '' : 'pr-0'}`}
                onScroll={(e) => {
                    if (
                        e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight &&
                        hasNextPage
                    ) {
                        fetchNextPage();
                    }
                }}
            >
                {isLoading && <MenuLoading />}

                {data?.pages[0].threads.data?.length === 0 ? (
                    <EmptyResult message="No previous messages" />
                ) : (
                    data?.pages.map((page, pageIndex) => (
                        <React.Fragment key={'page ' + pageIndex}>
                            {page.threads.data.map((thread: Thread, threadIndex: number) => (
                                <ChatInstance key={'thread ' + pageIndex + '-' + threadIndex} thread={thread} />
                            ))}
                        </React.Fragment>
                    ))
                )}
            </div>
        </>
    )
}
