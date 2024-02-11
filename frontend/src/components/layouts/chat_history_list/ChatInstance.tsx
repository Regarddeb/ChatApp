import React from 'react';
import { IconDotsVertical } from "@tabler/icons-react";
import { IconButton } from '@components/button/IconButton';

export const ChatInstance: React.FC = () => {
    return (
        <div className="w-full hover:bg-secondary hover:bg-opacity-40 hover:shadow-sm group hover:cursor-pointer p-2 pl-1 flex items-center rounded-md">

            <div className="w-2/12">
                <div className="bg-gray-100 rounded-full w-[50px] h-[48px]">
                </div>
            </div>

            <div className="flex pl-3 flex-col w-full truncate space-y-1 text-ellipsis py-1 mr-1 group-hover:mr-1.5">

                <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, optio debitis autem quia quidem doloribus eligendi. Pariatur ut nobis eligendi adipisci fugiat esse amet, eum itaque, provident ipsum assumenda quidem!</p>

                <p className="text-[12px] font-light opacity-70 relative">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iusto placeat dicta similique obcaecati. Debitis aut repudiandae, mollitia iste neque ex dolores commodi corporis nostrum, aliquid ipsa alias? Tempore, assumenda!
                    <span className="z-10 text-[10px] absolute right-0 bg-white pt-[2px] pl-[7px] group-hover:hidden">2:32 PM</span></p>

            </div>

            <div className="w-1/12 pt-1 hidden group-hover:flex group-hover:pr-2.5">
                <IconButton icon={<IconDotsVertical size={18} style={{ opacity: 0.7 }} />} className='group-hover:border p-1 mr-[-10px] hover:bg-white' />
            </div>

        </div>
    );
}


