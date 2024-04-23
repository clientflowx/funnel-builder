import { sideBarOptions } from './option';
import Link from 'next/link';

type Props = {
    isOpen: boolean
};

const SideBar: React.FC<Props> = ({ isOpen }) => {
    const lastOption = sideBarOptions[sideBarOptions.length - 1];

    return (
        <div>
            <aside
                id="logo-sidebar"
                className={`fixed h-full ${isOpen ? 'w-52' : 'w-16'} bg-black border-r border-gray-200 transition-all overflow-x-hidden`}
                aria-label="Sidebar"
            >
                <div className="h-full pb-4 overflow-y-auto bg-black">
                    <div className="space-y-2 font-medium flex flex-col h-full justify-between">
                        {/* All sidebar option except the last one (settings option) */}
                        <div>
                            {sideBarOptions.map((item, index) => {
                                return (
                                    <Link href={`${item.key}`} key={index}>
                                        <div className={`${item.key === "settings" ? 'hidden' : ''} cursor-pointer flex text-sm items-center ${isOpen ? '' : 'justify-center'} p-2 m-2 rounded-md leading-2 text-white opacity-70 hover:opacity-100 transition-all group`}>
                                            <div className="w-5 text-white">{<item.icon size={20} />}</div>
                                            <div className={`ms-3 h-5 ${item.titleVisible ? "" : "hidden"} ${isOpen ? '' : 'hidden'}`}>
                                                {item.title}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Setting sidebar option */}
                        <Link href={`/${lastOption.key}`}>
                            <div className={`${lastOption.key === "settings" ? '' : 'hidden'} flex items-center  rounded-md leading-2 text-white opacity-70 ${isOpen ? '' : 'justify-center'} hover:opacity-100 transition-all text-sm p-2 m-2 mb-14 cursor-pointer`}>
                                <div className="w-5 text-white">{<lastOption.icon size={20} />}</div>
                                <div className={`ms-3 h-5 ${lastOption.titleVisible ? "" : "hidden"} ${isOpen ? '' : 'hidden'}`}>
                                    {lastOption.title}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default SideBar