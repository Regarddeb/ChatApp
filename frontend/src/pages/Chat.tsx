import { IconDots } from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";

import { selectedUserAtom, threadAtom } from "@atoms/chatAtoms";
import { replyToChatAtom } from "@atoms/chatAtoms";
// import { newChatToggledAtom } from "@atoms/newChatAtom";

import Container from "@sharedComponents/layout/Container";
import Header from "@sharedComponents/layout/Header";
import { InputArea } from "@layouts/input_area/InputArea";
import { ChatArea } from "@layouts/chat_area/ChatArea";
import { ChatHistory } from "@layouts/chat_history_list/ChatHistory";
import { IconButton } from "@sharedComponents/button/IconButton";
import { Sidemenu } from "@sharedComponents/layout/Sidemenu";
import { UserList } from "@components/layouts/user_list/UserList";
import { currentTabAtom } from "@atoms/menuAtoms";
import { ThreadHeader } from "@sharedComponents/partials/ThreadHeader";
import { NoThread } from "@sharedComponents/feedback/NoThread";
import { Profile } from '@layouts/profile/Profile';
import { ReplyTo } from "@components/layouts/input_area/ReplyTo";
// import { NewChatHeader } from "@components/layouts/newChatHeader/newChatHeader";

export default function Chat() {
    const [currentTab] = useAtom(currentTabAtom);
    const [selectedUser] = useAtom(selectedUserAtom);
    const thread = useAtomValue(threadAtom);
    const replyTo = useAtomValue(replyToChatAtom);
    // const newChatToggled = useAtomValue(newChatToggledAtom);

    return (
        <Container>
            <Header />
            <div className="w-full flex" style={{ height: '93.4%' }}>
                {/* side menu */}
                <Sidemenu />

                {/* list */}
                <div className="w-3/12 flex flex-col border-r p-2 space-y-3 min-h-full">
                    {currentTab === 'chat_history' && <ChatHistory />}
                    {currentTab === 'user_list' && <UserList />}
                    {currentTab === 'profile' && <Profile />}
                </div>

                {/* chat area */}
                <div className="w-6/12 flex flex-col border-r">

                    <div className="py-2 shadow-sm flex items-center justify-between px-2">
                        {/* {!newChatToggled && thread ?
                            <> */}
                        <ThreadHeader />
                        <IconButton icon={<IconDots />} className="p-1" />
                        {/* </>
                            : null
                        } */}

                        {/* {newChatToggled ?
                            <NewChatHeader />
                            : null
                        } */}
                    </div>

                    {(selectedUser[0].id !== 0 || thread) ?
                        <ChatArea />
                        :
                        <NoThread />
                    }

                    <div className="w-full">
                        {replyTo.chat_id !== 0 ? <ReplyTo /> : null}
                        <InputArea />
                    </div>

                </div>

                {/* chatmate info */}
                <div className="w-3/12 h-full">

                </div>
            </div>
        </Container>
    )
}