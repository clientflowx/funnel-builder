"use client"
import React, { useState } from 'react'
import { sideBarOptions } from './option';


type Props = {
    handleOptionChange: (selectedOption: string) => void;
};

const SideBar: React.FC<Props> = ({ handleOptionChange }) => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    return (
        <div>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-50 h-full transition-transform ${openSideBar ? "w-52" : "w-16"
                    } cursor-pointer bg-black border-r border-gray-200 transition-all overflow-x-hidden`}
                aria-label="Sidebar"
                onMouseEnter={() => setOpenSideBar(true)}
                onMouseLeave={() => setOpenSideBar(false)}
            >
                <div className="h-full pb-4 overflow-y-auto bg-black">
                    <ul className="space-y-2 font-medium">
                        {sideBarOptions.map((item, index) => {
                            return (
                                <li key={index} onClick={() => handleOptionChange(item.title)}>
                                    <div className={`flex text-sm items-center p-2 m-2 rounded-md leading-2 text-white opacity-70 hover:opacity-100 transition-all ${openSideBar ? "" : "justify-center"} group`}>
                                        <div className="w-5 text-white">{<item.icon />}</div>
                                        <span className={`ms-3 h-5 ${openSideBar || !item.titleVisible ? "" : "hidden"}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SideBar