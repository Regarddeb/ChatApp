import { TextInput, Popover, Text } from "@mantine/core"
// import { useState } from "react"
import { IconX } from "@tabler/icons-react";

import { IconButton } from "@sharedComponents/button/IconButton";

export const NewChatHeader: React.FC = () => {
    // const [nameInput, setNameInput] = useState(false);

    return (
        <div className="w-full flex items-center space-x-3 pl-2">
            <p className="font-light text-sm">To: </p>

            <Popover width={400} position="bottom-start" offset={6} shadow="md">
                <Popover.Target>
                    <TextInput
                        className="w-full"
                        variant="default"
                        placeholder="Search for a user"
                    />
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
                </Popover.Dropdown>
            </Popover>

            <IconButton icon={<IconX size={15} />} className="p-1.5" />

        </div>
    )
}