'use client'
import Link from 'next/link'
export default function NavBar(){
    return (
        <>
        <div className="flex basis-auto flex-column bg-black/80">
            <Link href="/" className='flex'>Home</Link>
            <Link href="./Profile.tsx" className='flex'>Profile</Link>
            <Link href="./Friends.tsx" className='flex'>Friends</Link>
        </div>
            </>
    )
}