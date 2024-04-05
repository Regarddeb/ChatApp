import { useInfiniteQuery } from "react-query";
import { useAtomValue } from "jotai";

import axios from '@utilities/axios';
import { threadAtom } from "@atoms/chatAtoms";
import { Incoming } from "./incoming/Incoming";
import { Outgoing } from "./outgoing/Outgoing";
import { ChatLoading } from "@sharedComponents/loader/ChatLoading";
import { NoChat } from "@sharedComponents/feedback/NoChat";

export const ChatArea: React.FC = () => {
    const thread_id = useAtomValue(threadAtom);

    const { isLoading, data, fetchNextPage, hasNextPage, isSuccess } = useInfiniteQuery(
        ['all-chats', thread_id],
        async ({ pageParam = 1 }) => {
            const response = await axios.get(`api/thread/all-chats/${thread_id}?page=${pageParam}`);
            return response.data;
        },
        {
            getNextPageParam: (lastPage) => lastPage.chats.next_page_url ? lastPage.chats.current_page + 1 : undefined,
        }
    );

    return (
        <div
            className="w-full h-full overflow-y-auto flex flex-col-reverse"
            onScroll={(e) => {
                if (e.currentTarget.scrollTop === 0 && hasNextPage) {
                    fetchNextPage();
                }
            }}
        >

            {isLoading ? (
                <ChatLoading />
            ) : null}

            {data?.pages[0].chats.data.length === 0 ? (
                <NoChat />
            ) : (
                <>
                    <Incoming />
                    <Outgoing />
                </>
            )}
        </div>
    )
}
