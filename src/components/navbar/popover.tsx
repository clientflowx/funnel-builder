import { useUser, SignOutButton } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import { useState } from "react";

const PopOver = () => {
    const { user, isLoaded } = useUser();
    const [isSignedIn, setIsSignedIn] = useState<boolean>(true);
    return (
        <div>
            {isLoaded ? <Popover >
                <PopoverTrigger>
                    <img src={user?.imageUrl} alt="user-image" height={30} width={30} className='rounded-full' />
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white border border-gray-800">
                    {isSignedIn ? <div className='flex flex-col w-full items-start justify-center gap-5'>
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
                            <div className=' cursor-pointer text-sm font-medium opacity-90 hover:opacity-100 transition-all'>
                                <SignOutButton signOutCallback={() => setIsSignedIn(false)} />
                            </div>
                        </div>
                    </div> :
                        <h1 className="text-sm font-medium text-center">Signed Out successfully</h1>
                    }
                </PopoverContent>
            </Popover> :
                // Popover skeleton
                <Skeleton className="w-[30px] h-[30px] rounded-full bg-gray-700" />
            }
        </div>
    )
}

export default PopOver