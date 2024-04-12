"use client"
import React, { useState } from 'react'
import { sideBarOptions } from './option';


type Props = {
    handleOptionChange: (selectedOption: string) => void;
};

const SideBar: React.FC<Props> = ({ handleOptionChange }) => {
    const lastOption = sideBarOptions[sideBarOptions.length - 1];

    return (
        <div>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-50 h-full w-52 cursor-pointer bg-black border-r border-gray-200 transition-all overflow-x-hidden`}
                aria-label="Sidebar"
            >
                <div className="h-full pb-4 overflow-y-auto bg-black">
                    <ul className="space-y-2 font-medium flex flex-col h-full justify-between">
                        {/* All sidebar option except the last one (settings option) */}
                        <div>
                            {sideBarOptions.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => handleOptionChange(item.title)}>
                                        <div className={`${item.key === "settings" ? 'hidden' : ''} flex text-sm items-center p-2 m-2 rounded-md leading-2 text-white opacity-70 hover:opacity-100 transition-all group`}>
                                            <div className="w-5 text-white">{<item.icon size={20} />}</div>
                                            <div className={`ms-3 h-5 ${item.titleVisible ? "" : "hidden"}`}>
                                                {item.title}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>

                        {/* Setting sidebar option */}
                        <div onClick={() => handleOptionChange(lastOption.title)}>
                            <div className={`${lastOption.key === "settings" ? '' : 'hidden'} flex items-center  rounded-md leading-2 text-white opacity-70 hover:opacity-100 transition-all text-sm p-2 m-2`}>
                                <div className="w-5 text-white">{<lastOption.icon size={20} />}</div>
                                <div className={`ms-3 h-5 ${lastOption.titleVisible ? "" : "hidden"}`}>
                                    {lastOption.title}
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SideBar