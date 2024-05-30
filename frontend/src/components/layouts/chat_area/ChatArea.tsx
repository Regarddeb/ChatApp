import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect } from "react";

import { threadAtom } from "@atoms/chatAtoms";
import { Incoming } from "./incoming/Incoming";
import { Outgoing } from "./outgoing/Outgoing";
import { ChatLoading } from "@sharedComponents/loader/ChatLoading";
import { NoChat } from "@sharedComponents/feedback/NoChat";
import { ChatData } from "@type/chat";
import { memberAtom, replyToChatAtom } from "@atoms/chatAtoms";
import { replyToInitial } from "@type/replyToChat";
import { useAllChatsQuery } from "@queries/chats/allChatsQuery";

export const ChatArea: React.FC = () => {
    const thread_id = useAtomValue(threadAtom);
    const setMemberID = useSetAtom(memberAtom);
    const setReplyTo = useSetAtom(replyToChatAtom);
    const { isLoading, data, fetchNextPage, hasNextPage, refetch } = useAllChatsQuery();

    const debounce = (func: Function, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedHandleScroll = useCallback(
        debounce((e: React.UIEvent<HTMLDivElement>) => {
            const element = e.target as HTMLDivElement;
            if (element.scrollTop <= 100 && hasNextPage) {
                fetchNextPage();
            }
        }, 50),
        [fetchNextPage, hasNextPage]
    );
    

    useEffect(() => {
        if (data && data.pages.length > 0) {
            setMemberID(data.pages[0].chats.data[0]?.thread.member[0].member_id);
            setReplyTo(replyToInitial);
        }
    }, [data, setMemberID]);


    useEffect(() => {
        if (thread_id) {
            refetch();
        }
    }, [thread_id])


    return (
        <div
            className="w-full h-full overflow-y-auto flex flex-col-reverse py-2"
            onScroll={debouncedHandleScroll}
        >
            {isLoading ? (
                <ChatLoading />
            ) : null}

            {(!isLoading && data?.pages[0].chats.data.length === 0 && !thread_id) ? (
                <NoChat />
            ) : (
                <>
                    {data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.chats.data.map((chatData: ChatData) => (
                                chatData.user ? (
                                    <Incoming key={chatData.chat_id} chatData={chatData} />
                                ) : (
                                    <Outgoing key={chatData.chat_id} chatData={chatData} />
                                )
                            ))}
                        </React.Fragment>
                    ))}
                </>
            )
            }
        </div>
    )
}
