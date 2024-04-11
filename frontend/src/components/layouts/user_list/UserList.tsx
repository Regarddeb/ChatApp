import React from "react";
import { IconSquarePlus } from "@tabler/icons-react";
import { IconButton } from "@sharedComponents/button/IconButton";
import { useAtom } from "jotai";
import { useInfiniteQuery } from "react-query";

import axios from "@utilities/axios";
import { MenuLoading } from "@sharedComponents/loader/MenuLoading";
import { searchTermAtom } from "@atoms/userListAtoms";
import { UserInstance } from "./UserInstance";
import { User } from '@type/userTypes';
import { SearchInput } from "./SearchInput";
import { EmptyResult } from "@sharedComponents/feedback/EmptyResult";

export const UserList: React.FC = () => {
    const [searchTerm,] = useAtom(searchTermAtom);

    const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['userList', searchTerm],
        async ({ pageParam = 1 }) => {
            const response = await axios.get(`/api/user/all-users?page=${pageParam}&search=${searchTerm}`);
            return response.data;
        },
        {
            getNextPageParam: (lastPage) => lastPage.users.next_page_url ? lastPage.users.current_page + 1 : undefined,
        }
    );

    return (
        <>
            <div className="w-full pl-1 flex justify-between items-center">
                <p className="py-1 pl-1 text-start flex space-x-2 items-center">
                    <span className="font-medium">Users</span>
                </p>
                <IconButton icon={<IconSquarePlus size={20} />} className='p-1.5' />
            </div>

            <SearchInput />

            <div className={`w-full flex-col space-y-2 overflow-y-auto ${isLoading && 'h-full'}`}
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
                {data?.pages[0].users.data.length === 0 ? (
                    <EmptyResult message="No users found" />
                ) : (
                    data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.users.data.map((user: User) => (
                                <UserInstance key={'user ' + user.id} user={user} />
                            ))}
                        </React.Fragment>
                    ))
                )}

            </div>
        </>
    )
}
