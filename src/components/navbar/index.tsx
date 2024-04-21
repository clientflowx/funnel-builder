"use client"
import { CircleUserRound, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image';



type Props = {
    toggleSidebar: () => void
}

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <div className='fixed p-4 z-50 w-full bg-black text-white flex items-center justify-between'>
            <div className='flex gap-3'>
                <button onClick={toggleSidebar}><Menu size={20} /></button>
                <Link href="/">ClientFlowX</Link>
            </div>
            <Popover >
                <PopoverTrigger>
                    <img src={user?.imageUrl} alt="user-image" height={30} width={30} className='rounded-full' />
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white border border-gray-800">
                    <div className='flex flex-col w-full items-start justify-center gap-5'>
                        <div className='flex flex-col items-center w-full gap-2'>
                            <div>
                                <img src={user?.imageUrl} alt="user-image" height={40} width={40} className='rounded-full' />
                            </div>
                            <div className='flex flex-col items-center justify-between gap-1'>
                                <div className=' text-md font-bold'>{user?.fullName}</div>
                                <div className='text-xs'>{user?.primaryEmailAddress?.emailAddress}</div>
                            </div>
                        </div>
                        <div className='w-full text-center bg-gray-800 text-xs p-3 rounded-md'>Member since {user?.createdAt?.getFullYear()}</div>
                        <div className='w-full flex flex-col items-start justify-between gap-2'>
                            <Link href='/profile' className=' cursor-pointer text-sm font-medium opacity-90 hover:opacity-100 transition-all'>User settings</Link>
                            <SignOutButton ><button className=' cursor-pointer text-sm font-medium opacity-90 hover:opacity-100 transition-all'>Sign out</button></SignOutButton>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div >
    )
}

export default Navbar