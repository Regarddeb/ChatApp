import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { IconMessage, IconUser, IconSettings } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { currentTabAtom } from "@atoms/menuAtoms";
import { useAtom, useAtomValue } from "jotai";

import { userAtom } from "@atoms/userAtoms";
import no_dp from '@assets/images/illustration/no_dp.svg';

export const Sidemenu: React.FC = () => {
    const [currentTab, setCurrentTab] = useAtom(currentTabAtom);
    const user = useAtomValue(userAtom);

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
                <button className={`p-2 opacity-80 rounded-lg ${className}`} {...restProps}>
                    {icon}
                </button>
            </Tooltip>
        )
    }

    const UserImage: React.FC = () => {
        return (
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: user.display_picture_path ?
                        `url(${import.meta.env.VITE_API_URL}/storage/${user.display_picture_path})` :
                        `url(${no_dp})`
                }}
                className="relative border-2 ring ring-green-500 bg-gray-50 rounded-full w-[35px] h-[35px]"
            >
            </div>
        )
    }

    const inActiveTab: string = 'hover:bg-secondary hover:opacity-100';
    const activeTab: string = 'bg-secondary border border-primary';

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
                    icon={<UserImage />}
                    className={currentTab === 'profile' ? activeTab : inActiveTab}
                    text="Profile"
                    onClick={() => handleTabClick('profile')}
                />
            </div>
        </div>
    )
}