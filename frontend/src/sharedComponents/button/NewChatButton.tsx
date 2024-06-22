import { IconButton } from "./IconButton";
import { IconSquarePlus } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import { newChatToggledAtom } from "@atoms/newChatAtom";
import { threadAtom } from "@atoms/chatAtoms";

export const NewChatHeader = () => {
    const setNewChatToggled = useSetAtom(newChatToggledAtom);
    const setThread = useSetAtom(threadAtom);

    const handleNewChatClick = () => {
        setNewChatToggled(true);
        setThread(null);
    }
    return (
        <IconButton icon={<IconSquarePlus size={20} />} className='p-1.5' onClick={handleNewChatClick} />
    )
}