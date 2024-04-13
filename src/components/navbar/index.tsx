import { CircleUserRound, LogOut, Menu } from 'lucide-react'
import React from 'react'

type Props = {
    toggleSidebar: () => void
}

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
    return (
        <div className='fixed p-4 z-50 w-full bg-black text-white flex items-center justify-between'>
            <div className='flex gap-3'>
                <button onClick={toggleSidebar}><Menu size={20} /></button>
                <div>ClientFlowX</div>
            </div>
            <div className='flex items-center justify-between gap-3'>
                <div className='opacity-80 hover:opacity-100 transition-all cursor-pointer'><CircleUserRound size={20} /></div>
                <div className='opacity-80 hover:opacity-100 transition-all cursor-pointer'><LogOut size={20} /></div>
            </div>
        </div>
    )
}

export default Navbar