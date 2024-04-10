import { Menu } from "@mantine/core";
import { useState } from "react";
import { IconMoodSmile } from "@tabler/icons-react";
import { useMutation } from "react-query";

import { EmojiPicker } from "./EmojiPicker";
import { RenderEmoji } from "./RenderEmoji";
import { ChatIconButton } from "@components/button/ChatIconButton";
import axios from '@utilities/axios';

interface ReactionMenuProps {
    chat_id: number
}

interface ReactionType {
    reaction: string
    chat_id: number
}

export const ReactionMenu: React.FC<ReactionMenuProps> = ({ chat_id }) => {
    const [reactionMenuOpen, setReactionMenuOpen] = useState<boolean>(false);
    const [closeOnClickOutside, setCloseOnClickOutside] = useState<boolean>(true);

    const handleManualCloseMenu = () => {
        if (closeOnClickOutside) {
            setReactionMenuOpen(false);
        }
    }

    const handleReactionClick = (unifiedCode: string) => {
        const reaction = {
            reaction: unifiedCode,
            chat_id: chat_id
        }

        mutation.mutate(reaction, {
            onSuccess: () => {

            },
            onError: () => {

            }
        })
    }

    const mutation = useMutation((reaction: ReactionType) => axios.post('api/chat/store-reaction', reaction));

    return (
        <Menu
            onClose={handleManualCloseMenu}
            opened={reactionMenuOpen}
            position="top"
            styles={{ dropdown: { borderRadius: '20px', padding: '0px' } }}
        >
            <Menu.Target>
                <button className='flex p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100 text-lg' onClick={() => setReactionMenuOpen(true)}>
                    <IconMoodSmile size={17} />
                </button>
            </Menu.Target>
            <Menu.Dropdown>
                <div className="flex items-center justify-around space-x-2">
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('2764-fe0f')}>
                        <RenderEmoji unifiedCode="2764-fe0f" />
                    </ChatIconButton>
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('1f606')}>
                        <RenderEmoji unifiedCode="1f606" />
                    </ChatIconButton>
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('1f62e')}>
                        <RenderEmoji unifiedCode="1f62e" />
                    </ChatIconButton>
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('1f625')}>
                        <RenderEmoji unifiedCode="1f625" />
                    </ChatIconButton>
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('1f620')}>
                        <RenderEmoji unifiedCode="1f620" />
                    </ChatIconButton>
                    <ChatIconButton classes="text-lg p-1" onClick={() => handleReactionClick('1f44d')}>
                        <RenderEmoji unifiedCode="1f44d" />
                    </ChatIconButton>
                    <EmojiPicker setCloseOnClickOutside={setCloseOnClickOutside} />
                </div>
            </Menu.Dropdown>
        </Menu>
    )
}