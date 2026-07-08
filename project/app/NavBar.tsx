'use client'
import Link from 'next/link'
import AuthModal from '@/app/AuthModal'
import {useState} from 'react'
export default function NavBar(){
    const [open,setOpen] = useState(false);
    return (
        <div className="flex h-[3rem] w-full">
            <Link href="/" className='flex-auto text-center text-[1.8rem]'><h1>Home</h1></Link>
            <Link href="./friends" className='flex-auto w-auto text-center text-[1.8rem]' ><h1>Friends</h1></Link>
            <Link href="./profile" className='flex-auto w-auto text-center text-[1.8rem]'><h1>Profile</h1></Link>
            <button className="flex-1 bg-gray-300" onClick={()=>setOpen(true)}>
                Sign Up
            </button>
            <AuthModal open={open} onClose={()=>setOpen(false)}
            />
        </div>
    )
}