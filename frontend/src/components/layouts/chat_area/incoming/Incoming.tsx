import { IconArrowBackUp, IconMoodSmile } from "@tabler/icons-react"

export const Incoming: React.FC = () => {
    return (
        <div className="w-full p-2 space-y-2">

            <div className="flex w-full items-end space-x-1">

                {/* img */}
                <div className="bg-gray-200 h-[30px] w-[30px] rounded-full"></div>

                {/* chat */}
                <div className="w-[65%] flex flex-col-reverse">

                    <div className="flex w-full space-x-1 items-end mt-2 group">
                        <div className="bg-secondary max-w-[86%] rounded-t-xl rounded-br-xl text-sm text-start p-2.5 group-hover:shadow-sm">
                            <p className="opacity-90 text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum necessitatibus aperiam voluptatibus mollitia veniam, animi neque quibusdam fugiat recusandae nihil id ipsam error a consectetur tempore tempora maiores cupiditate? Cupiditate!
                            </p>
                        </div>

                        <div className="space-x-2 flex">
                            <button className="group-hover:flex hidden p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconArrowBackUp size={17} /></button>
                            <button className="group-hover:flex hidden p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconMoodSmile size={17} /></button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
