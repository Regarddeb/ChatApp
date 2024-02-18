import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { IconMessage, IconUser, IconSettings } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { currentTabAtom } from "@atoms/menuAtoms";
import { useAtom } from "jotai";

export const Sidemenu: React.FC = () => {
    const [currentTab, setCurrentTab] = useAtom(currentTabAtom);

    interface SidemenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        icon: ReactNode;
        classname?: string;
        text?: string;
    }

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab)
    }

    const SidemenuItem: React.FC<SidemenuProps> = ({ icon, className, text, ...restProps }) => {
        return (
            <Tooltip label={text} position="right">
                <button className={`p-2 opacity-70 rounded-lg ${className}`} {...restProps}>
                    {icon}
                </button>
            </Tooltip>
        )
    }

    const inActiveTab: string = 'hover:bg-secondary hover:opacity-100';
    const activeTab: string = 'bg-primary bg-opacity-90 text-white';

    return (
        <div className="w-[70px] h-full flex flex-col border-r p-2 items-center justify-between">
            <div className="w-full flex flex-col space-y-2 items-center p-1">
                <SidemenuItem
                    icon={<IconMessage size={25} />}
                    className={currentTab === 'chat_history' ? activeTab : inActiveTab}
                    text="Chat History"
                    onClick={() => handleTabClick('chat_history')}
                />
                <SidemenuItem
                    icon={<IconUser size={25} />}
                    className={currentTab === 'user_list' ? activeTab : inActiveTab}
                    text="Users"
                    onClick={() => handleTabClick('user_list')}
                />
            </div>

            <div className="flex flex-col items-center space-y-2">
                <SidemenuItem
                    icon={<IconSettings size={25} />}
                    className={currentTab === 'settings' ? activeTab : inActiveTab}
                    text="Settings"
                    onClick={() => handleTabClick('settings')}
                />
                <SidemenuItem
                    icon={<div className="bg-red-200 border border-black rounded-full w-[35px] h-[35px]"></div>}
                    className={currentTab === 'profile' ? activeTab : inActiveTab}
                    text="Profile"
                    onClick={() => handleTabClick('profile')}
                />
            </div>
        </div>
    )
}