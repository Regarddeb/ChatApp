import { IconDots } from "@tabler/icons-react";

import Container from "@sharedComponents/layout/Container";
import Header from "@sharedComponents/layout/Header";
import { InputArea } from "@layouts/input_area/InputArea";
import { ChatArea } from "@layouts/chat_area/ChatArea";
import { ChatHistory } from "@layouts/chat_history_list/ChatHistory";
import { IconButton } from "@components/button/IconButton";
import { Sidemenu } from "@sharedComponents/layout/Sidemenu";
import { UserList } from "@components/layouts/user_list/UserList";
import { currentTabAtom } from "@atoms/menuAtoms";
import { selectedUserAtom } from "@atoms/chatAtoms";
import { ThreadHeader } from "@sharedComponents/partials/ThreadHeader";
import { NoThread } from "@sharedComponents/feedback/NoThread";
import { useAtom } from "jotai";

export default function Chat() {
    const [currentTab] = useAtom(currentTabAtom);
    const [selectedUser] = useAtom(selectedUserAtom);

    return (
        <Container>
            <Header />
            <div className="w-full flex" style={{ height: '91.6%' }}>
                {/* side menu */}
                <Sidemenu />

                {/* list */}
                <div className="w-3/12 flex flex-col border-r p-2 space-y-3 min-h-full">
                    {currentTab === 'chat_history' && <ChatHistory />}
                    {currentTab === 'user_list' && <UserList />}
                </div>

                {/* chat area */}
                <div className="w-6/12 flex flex-col border-r">

                    <div className="py-2 shadow-sm flex items-center justify-between px-2">
                        <ThreadHeader />
                        <IconButton icon={<IconDots />} className="p-1" />
                    </div>

                    {selectedUser.id !== 0 ?
                        <ChatArea />
                        :
                        <NoThread />
                    }

                    <InputArea />

                </div>

                {/* chatmate info */}
                <div className="w-3/12 h-full">

                </div>
            </div>
        </Container>
    )
}