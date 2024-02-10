import { IconMessage, IconDots } from "@tabler/icons-react";
import { Input } from "@mantine/core";

import Container from "@components/layouts/Container";
import Header from "@components/layouts/Header";
import { ChatInstance } from "@components/layouts/chat_list/ChatInstance";
import { InputArea } from "@components/layouts/input_area/InputArea";
import { ChatArea } from "@components/layouts/chat_area/ChatAre";

const numberOfChatInstances = 10;

export default function Chat() {
    const chatInstances = [];

    for (let i = 0; i < numberOfChatInstances; i++) {
        chatInstances.push(<ChatInstance key={i} />);
    }

    return (
        <Container>
            <Header />
            <div className="w-full flex" style={{ height: '91.6%' }}>
                {/* side menu */}
                <div className="w-[70px] h-full bg-green-600"></div>

                {/* chatlist */}
                <div className="w-3/12 flex flex-col border-r p-2 space-y-2 h-full">
                    <p className="py-1 text-start flex space-x-3 items-center">
                        <IconMessage size={19} />
                        <span className="font-medium">Messages</span>
                    </p>
                    <Input placeholder="Search here.." variant="filled" />
                    <div className="w-full pr-2 flex-col space-y-2 overflow-y-auto">
                        {
                            chatInstances
                        }
                    </div>
                </div>

                {/* chat area */}
                <div className="w-6/12 flex flex-col border-r">

                    <div className="py-2 shadow-sm flex items-center justify-between px-2">
                        <div className="flex space-x-3">
                            <div className="rounded-full w-[35px] h-[35px] bg-gray-200"></div>
                            <p className="flex flex-col items-start">
                                <span className="text-sm font-medium opacity-80">User name sample</span>
                                <span className="text-xs font-light opacity-70">Active 12 min ago</span>
                            </p>
                        </div>
                        <button className="p-1 rounded-full hover:bg-gray-100 bg-opacity-60 transition-colors duration-300"><IconDots /></button>
                    </div>

                    <ChatArea />

                    <InputArea />

                </div>

                {/* menu */}
                <div className="w-3/12 h-full"></div>
            </div>
        </Container>
    )
}