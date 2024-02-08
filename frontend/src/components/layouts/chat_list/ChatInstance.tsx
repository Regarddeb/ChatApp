import React from 'react';
import { IconDotsVertical } from "@tabler/icons-react";

export const ChatInstance: React.FC = () => {
    return (
        <div className="w-full hover:bg-gray-50 hover:bg-opacity-80 hover:shadow-sm group hover:cursor-pointer p-2 flex rounded-md">

            <div className="w-2/12">
                <div className="bg-gray-100 rounded-full w-[50px] h-[48px]">
                </div>
            </div>

            <div className="flex pl-3 flex-col w-full truncate text-ellipsis py-1 mr-1 group-hover:mr-1.5">

                <p className="text-sm opacity-70">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, optio debitis autem quia quidem doloribus eligendi. Pariatur ut nobis eligendi adipisci fugiat esse amet, eum itaque, provident ipsum assumenda quidem!</p>

                <p className="text-[12px] font-light opacity-70 relative">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iusto placeat dicta similique obcaecati. Debitis aut repudiandae, mollitia iste neque ex dolores commodi corporis nostrum, aliquid ipsa alias? Tempore, assumenda!
                    <span className="z-10 text-[10px] absolute right-0 bg-white pt-[2px] pl-[7px] group-hover:hidden">2:32 PM</span></p>

            </div>

            <div className="w-1/12 pt-1 hidden group-hover:flex group-hover:pr-2.5">
                <button className="p-1 mr-[-10px] hover:bg-gray-100 h-fit rounded-full group-hover:border"><IconDotsVertical size={18} style={{ opacity: 0.7 }} /></button>
            </div>

        </div>
    );
}


