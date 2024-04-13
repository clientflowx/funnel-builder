import { CircleUserRound, LogOut } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='fixed p-4 z-50 w-full bg-black text-white flex items-center justify-between'>
            <div>ClientFlowX</div>
            <div className='flex items-center justify-between gap-3'>
                <div className='opacity-80 hover:opacity-100 transition-all cursor-pointer'><CircleUserRound /></div>
                <div className='opacity-80 hover:opacity-100 transition-all cursor-pointer'><LogOut /></div>
            </div>
        </div>
    )
}

export default Navbar