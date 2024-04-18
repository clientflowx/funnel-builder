"use client"
import { CircleUserRound, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    toggleSidebar: () => void
}

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
    const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);


    return (
        <div className='fixed p-4 z-50 w-full bg-black text-white flex items-center justify-between'>
            <div className='flex gap-3'>
                <button onClick={toggleSidebar}><Menu size={20} /></button>
                <div>ClientFlowX</div>
            </div>
            <div className='relative flex items-center justify-between gap-3'>
                <button className='opacity-80 hover:opacity-100 transition-all cursor-pointer' onClick={() => { setOpenProfileMenu(prev => !prev) }}><CircleUserRound size={20} /></button>
                <div className={` ${openProfileMenu ? '' : 'hidden'} absolute top-5 w-40 right-0 rounded-md shadow-sm p-2 bg-black`}>
                    <div className='flex flex-col gap-2 w-full items-start justify-center text-sm'>
                        <Link href='/profile' className='w-full cursor-pointer'>Profile Settings</Link>
                        <div className='flex items-center justify-start gap-2 w-full'>
                            <div>Logout</div>
                            <div><LogOut size={15} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar