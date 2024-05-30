import { Menu } from "@mantine/core";
import { useState } from "react";
import { IconMoodSmile } from "@tabler/icons-react";
import { useMutation } from "react-query";

import { EmojiPicker } from "./EmojiPicker";
import { RenderEmoji } from "./RenderEmoji";
import { ChatIconButton } from "@sharedComponents/button/ChatIconButton";
import axios from '@utilities/axios';
import { threadAtom } from "@atoms/chatAtoms";
import { useAtomValue } from "jotai";
import { Reaction } from "@type/chat";
import { memberAtom } from "@atoms/chatAtoms";
import { useAllChatsQuery } from "@queries/chats/allChatsQuery";

interface ReactionMenuProps {
    chat_id: number
    reactions: Reaction[]
}

interface ReactionType {
    reaction: string
    chat_id: number
    thread_id: number | null
}

export const ReactionMenu: React.FC<ReactionMenuProps> = ({ chat_id, reactions }) => {
    const [reactionMenuOpen, setReactionMenuOpen] = useState<boolean>(false);
    const [closeOnClickOutside, setCloseOnClickOutside] = useState<boolean>(true);
    const thread_id = useAtomValue(threadAtom);
    const member_id = useAtomValue(memberAtom);
    const { refetch } = useAllChatsQuery();

    const handleManualCloseMenu = () => {
        if (closeOnClickOutside) {
            setReactionMenuOpen(false);
        }
    }

    const handleReactionClick = (unifiedCode: string) => {
        const reaction = {
            reaction: unifiedCode,
            chat_id: chat_id,
            thread_id: thread_id
        }

        mutation.mutate(reaction)
    }

    const mutation = useMutation({
        mutationKey: ['reactToChat'],
        mutationFn: (reaction: ReactionType) => axios.post('api/chat/react', reaction),
        onSuccess: () => {
            refetch();
        },
        onError: err => {
            console.log(err)
        }
    });

    const myReaction = reactions.find(reaction => member_id === reaction.member_id)
    const reactionOptions = ['2764-fe0f', '1f606', '1f62e', '1f625', '1f620', '1f44d']

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

                    {reactionOptions.map((reactOption, index) => (
                        <ChatIconButton
                            key={index}
                            classes={`text-lg p-1 ${myReaction?.reaction === reactOption && 'bg-gray-200 bg-opacity-100'}`}
                            onClick={() => handleReactionClick(reactOption)}
                        >
                            <RenderEmoji unifiedCode={reactOption} />
                        </ChatIconButton>
                    ))}

                    <EmojiPicker setCloseOnClickOutside={setCloseOnClickOutside} handleReactionClick={handleReactionClick} />
                </div>
            </Menu.Dropdown>
        </Menu>
    )
}