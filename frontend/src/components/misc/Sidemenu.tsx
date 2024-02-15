import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { IconMessage, IconUser, IconSettings } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";

export const Sidemenu: React.FC = () => {
    interface SidemenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        icon: ReactNode;
        classname?: string;
        text?: string;
    }

    const SidemenuItem: React.FC<SidemenuProps> = ({ icon, className, text, ...restProps }) => {
        return (
            <Tooltip label={text} position="right">
                <button className={`p-2 hover:bg-secondary opacity-70 hover:opacity-100 rounded-lg ${className}`} {...restProps}>
                    {icon}
                </button>
            </Tooltip>
        )
    }

    return (
        <div className="w-[70px] h-full flex flex-col border-r p-2 items-center justify-between">
            <div className="w-full flex flex-col space-y-2 items-center p-1">
                <SidemenuItem icon={<IconMessage size={25} />} text="Chat History" />
                <SidemenuItem icon={<IconUser size={25} />} text="Users" />
            </div>

            <div className="flex flex-col items-center space-y-2">
                <SidemenuItem icon={<IconSettings size={25} />} text="Settings" />
                <SidemenuItem icon={<div className="bg-red-200 border border-black rounded-full w-[35px] h-[35px]"></div>} text="Profile" />
            </div>
        </div>
    )
}