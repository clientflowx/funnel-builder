"use client"
import React, { useState } from 'react'
import { sideBarOptions } from './option';


type Props = {
    handleOptionChange: (selectedOption: string) => void;
};

const SideBar: React.FC<Props> = ({ handleOptionChange }) => {
    return (
        <div>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-50 h-full w-52 cursor-pointer bg-black border-r border-gray-200 transition-all overflow-x-hidden`}
                aria-label="Sidebar"
            >
                <div className="h-full pb-4 overflow-y-auto bg-black">
                    <ul className="space-y-2 font-medium">
                        {sideBarOptions.map((item, index) => {
                            return (
                                <li key={index} onClick={() => handleOptionChange(item.title)}>
                                    <div className={`flex text-sm items-center p-2 m-2 rounded-md leading-2 text-white opacity-70 hover:opacity-100 transition-all group`}>
                                        <div className="w-5 text-white">{<item.icon size={20} />}</div>
                                        <div className={`ms-3 h-5 ${item.titleVisible ? "" : "hidden"}`}>
                                            {item.title}
                                        </div>
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