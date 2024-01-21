import Logo from "@components/misc/Logo";

const Header = () => {
    return (
        <header className={`w-full py-1 flex justify-between items-center border-b-2 pr-2`}>
            <div className="flex items-center space-x-3 p-2">
                <Logo width={35} height={35} />
                <p className="font-semibold">Blabber</p>
            </div>
            <div className="flex justify-between items-center space-x-2">
            </div>
        </header>
    )
}

export default Header;
