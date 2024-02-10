import { IconSend2 } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";
import { Input } from "@mantine/core";

export const InputArea = () => {
    return (
        <div className="w-full py-2 px-0.5 flex items-center space-x-2">

            <label htmlFor="fileInput" className="w-fit hover:cursor-pointer z-10 opacity-70 hover:opacity-100 p-2 hover:bg-gray-100 rounded-full">
                <IconCirclePlus size={19} />
            </label>
            <input type="file" id="fileInput" style={{ display: 'none' }} />

            <Input
                className="w-full"
                radius={20}
                variant="default"
                placeholder="Enter your message here..."
            />

            <button className="w-fit hover:cursor-pointer z-10 opacity-70 hover:opacity-100 p-2 hover:bg-gray-100 rounded-full pl-2.5">
                <IconSend2 size={20} />
            </button>

        </div>
    )
}