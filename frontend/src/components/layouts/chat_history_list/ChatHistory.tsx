import React from "react";
import { useAtomValue } from "jotai";

import { ChatInstance } from "./ChatInstance";
import { MenuLoading } from "@sharedComponents/loader/MenuLoading";
import { SearchInput } from "./SearchInput";
import { EmptyResult } from "@sharedComponents/feedback/EmptyResult";
import { Thread } from "@type/chatHistory";
import { searchChatHistoryActiveAtom } from '@atoms/menuAtoms';
import useAllThreadsQuery from "@queries/threads/allThreadsQuery";


export const ChatHistory: React.FC = () => {
    const searchHistoryActive = useAtomValue(searchChatHistoryActiveAtom);
    const { isLoading, data, fetchNextPage, hasNextPage } = useAllThreadsQuery();

    return (
        <>
            <div className="w-full pl-1 flex justify-between items-center">
                <p className="py-1 pl-1 text-start flex space-x-2 items-center">
                    <span className="font-medium">Messages</span>
                </p>

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
