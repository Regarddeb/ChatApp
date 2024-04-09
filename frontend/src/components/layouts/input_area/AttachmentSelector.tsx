import { IconCirclePlus, IconX } from "@tabler/icons-react";
import { useRef, ChangeEvent, MouseEvent } from 'react';
import { useAtomValue } from "jotai";

import { IconButton } from "@components/button/IconButton";
import { selectedUserAtom } from '@atoms/chatAtoms';

interface AttachmentSelectorProps {
    setAttachment: React.Dispatch<React.SetStateAction<File | null>>;
    attachment: File | null;
}

export const AttachmentSelector: React.FC<AttachmentSelectorProps> = ({ setAttachment, attachment }) => {
    const selectedUser = useAtomValue(selectedUserAtom);

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setAttachment(files[0]);
        }
    };

    const handleAddFileClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveFile = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAttachment(null);
    }

    return (
        <>
            <IconButton
                icon={attachment ? <IconX size={19} /> : <IconCirclePlus size={19} />}
                className="p-2"
                onClick={attachment ? handleRemoveFile : handleAddFileClick}
                disabled={selectedUser[0].id === 0}
            />
            
            <input
                type="file"
                accept='image/*'
                id="fileInput"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                name='attachment'
            />
        </>
    )
}