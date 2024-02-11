import { IconArrowBackUp, IconMoodSmile } from "@tabler/icons-react"

export const Outgoing: React.FC = () => {
    return (
        <div className="w-full flex flex-col justify-end items-end space-y-2 p-2">

            <div className="flex justify-end space-x-1 max-w-[65%] group">

                <div className="flex flex-row-reverse items-end">
                    <div className="outgoing rounded-t-lg rounded-bl-lg p-2 text-start pl-3 text-sm max-w-[85%] group-hover:shadow-sm">
                        <p className="opacity-95 text-gray-50">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum aliquam assumenda illo debitis odit laudantium laboriosam nam, eius, maiores quibusdam corporis quod minus. Amet rerum impedit vero quae itaque! Soluta.
                        </p>
                    </div>
                    <div className="space-x-2 flex pr-2">
                        <button className="group-hover:flex hidden p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconArrowBackUp size={17} /></button>
                        <button className="group-hover:flex hidden p-1 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-100"><IconMoodSmile size={17} /></button>
                    </div>
                </div>

            </div>

        </div>
    )
}