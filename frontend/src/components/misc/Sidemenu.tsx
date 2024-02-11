import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { IconMessage, IconUser } from "@tabler/icons-react";

export const Sidemenu: React.FC = () => {

    interface SidemenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        icon: ReactNode;
        classname?: string;
    }

    const SidemenuItem: React.FC<SidemenuProps> = ({ icon, className, ...restProps }) => {
        return (
            <button className={`p-2 hover:bg-secondary opacity-70 hover:opacity-100 rounded-lg ${className}`} {...restProps}>
                {icon}
            </button>
        )
    }

    return (
        <div className="w-[70px] h-full flex flex-col border-r p-2 justify-between">
            <div className="w-full flex flex-col space-y-2 items-center p-1">
                <SidemenuItem icon={<IconMessage size={25} />} />
                <SidemenuItem icon={<IconUser size={25} />} />
            </div>

            <div className="flex flex-col space-y-2">
                
            </div>
        </div>
    )
}