import { ChatIconButton } from '@components/button/ChatIconButton';
import Picker from '@emoji-mart/react';
import { Menu } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';

interface EmojiPickerProps {
    setCloseOnClickOutside: (opened: boolean) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ setCloseOnClickOutside }) => {

    return (
        <div>
            <Menu
                width={350}
                shadow="lg"
                position="top"
                styles={{ item: { padding: '0px' }, dropdown: { padding: '0px' } }}
                closeOnItemClick={false}
                onOpen={() => setCloseOnClickOutside(false)}
                onClose={() => setCloseOnClickOutside(true)}
            >
                <Menu.Target>
                    <ChatIconButton classes='p-[7px]' onClick={() => { }}>
                        <IconPlus size={20} />
                    </ChatIconButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <div>
                            <Picker
                                set='native'
                                onEmojiSelect={console.log}
                                previewPosition='none'
                                maxFrequentRows={1}
                            />
                        </div>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}
