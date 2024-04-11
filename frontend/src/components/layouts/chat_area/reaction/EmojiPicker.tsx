import Picker from '@emoji-mart/react';
import { Menu } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { Emoji } from '@type/emojiType';

interface EmojiPickerProps {
    setCloseOnClickOutside: (opened: boolean) => void;
    handleReactionClick: (unifiedCode: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ setCloseOnClickOutside, handleReactionClick }) => {

    const classStyle = 'flex p-[7px] pr-[6px] rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100';

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
                    <button className={classStyle}>
                        <IconPlus size={19} />
                    </button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <div>
                            <Picker
                                set='native'
                                onEmojiSelect={(data: Emoji) => handleReactionClick(data.unified)}
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
