import { IconDots } from "@tabler/icons-react";

import Container from "@layouts/Container";
import Header from "@layouts/Header";
import { InputArea } from "@layouts/input_area/InputArea";
import { ChatArea } from "@layouts/chat_area/ChatArea";
import { ChatHistory } from "@layouts/chat_history_list/ChatHistory";
import { IconButton } from "@components/button/IconButton";
import { Sidemenu } from "@components/misc/Sidemenu";

export default function Chat() {

    return (
        <Container>
            <Header />
            <div className="w-full flex" style={{ height: '91.6%' }}>
                {/* side menu */}
                <Sidemenu />

                {/* chatlist */}
                <div className="w-3/12 flex flex-col border-r p-2 space-y-3 h-full">
                    <ChatHistory />
                </div>

                {/* chat area */}
                <div className="w-6/12 flex flex-col border-r">

                    <div className="py-2 shadow-sm flex items-center justify-between px-2">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-full w-[35px] h-[35px] bg-gray-200"></div>
                            <p className="flex flex-col items-start hover:bg-secondary p-1 rounded-md hover:cursor-pointer">
                                <span className="text-sm font-medium opacity-80">User name sample</span>
                                <span className="text-xs font-light opacity-70">Active 12 min ago</span>
                            </p>
                        </div>
                        <IconButton icon={<IconDots />} className="p-1" />
                    </div>

                    <ChatArea />

                    <InputArea />

                </div>

                {/* chatmate info */}
                <div className="w-3/12 h-full">

                </div>
            </div>
        </Container>
    )
}