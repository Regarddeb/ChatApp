import { IconButton } from "@components/button/IconButton"
import { IconDotsVertical } from "@tabler/icons-react"

export const UserInstance: React.FC = () => {
    return (
        <div className="flex items-center justify-between group space-x-2 hover:bg-secondary hover:cursor-pointer hover:bg-opacity-50 p-2 rounded-md">
            <div className="w-2/12">
                <div className="rounded-full bg-gray-300 w-[40px] h-[40px]"></div>
            </div>
            <div className="w-full flex flex-col space-y-1 truncate text-ellipsis px-2">
                <p className="text-sm text-gray-800 opacity-80 group-hover:opacity-90 text-start">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolorum, nobis, sapiente sint facilis aliquid beatae sunt at esse quis voluptatum doloribus ut ipsa maxime cupiditate placeat deserunt excepturi hic.</p>
                <p className="text-xs opacity-70 font-light text-start">Active 20 min ago</p>
            </div>
            <div className="w-1/12">
                <IconButton icon={<IconDotsVertical size={19} />} className="p-1.5 border" />
            </div>
        </div>
    )
}