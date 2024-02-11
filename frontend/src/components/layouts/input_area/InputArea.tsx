import { useRef } from 'react';
import { IconSend2 } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";
import { Input } from "@mantine/core";
import { IconButton } from "@components/button/IconButton";

export const InputArea: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-full py-2 px-0.5 flex items-center space-x-2">

            <IconButton
                icon={<IconCirclePlus size={19} />}
                className="p-2"
                onClick={handleAddFileClick}
            />
            <input type="file" id="fileInput" ref={fileInputRef} style={{ display: 'none' }} />

            <Input
                className="w-full"
                radius={20}
                variant="default"
                placeholder="Enter your message here..."
            />

            <IconButton icon={<IconSend2 size={20} />} className="p-2 pl-2.5" />

        </div>
    )
}