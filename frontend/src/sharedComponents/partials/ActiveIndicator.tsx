import { IconCircleFilled } from "@tabler/icons-react"
import { calculateTimeDifference } from "@utilities/timeDifference"

interface ActiveProp {
    active: number,
    logged_out: string | null
}

export const ActveIndicator: React.FC<ActiveProp> = ({ active, logged_out }) => {

    return (
        <div className='text-xs font-light opacity-70 text-start flex items-center'>
            {active ? (
                <p className="flex items-center space-x-1"><IconCircleFilled size={12} style={{ color: '#29FF09' }} /><span>Active now</span></p>
            ) : (
                <p>Active {calculateTimeDifference(logged_out)}</p>
            )}
        </div>
    )
}

