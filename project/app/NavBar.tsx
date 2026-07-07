import Link from 'next/link'
export default function NavBar(){
    return (
        <>
        <div className="flex flex-row justify-center align-middle h-[3rem] ">
            <Link href="/" className='flex-auto text-center text-[1.8rem]'><h1>Home</h1></Link>
            <Link href="./friends" className='flex-auto w-auto text-center text-[1.8rem]' ><h1>Friends</h1></Link>
            <Link href="./profile" className='flex-auto w-auto text-center text-[1.8rem]'><h1>Profile</h1></Link>
            <button className='flex-auto bg-[gray] border-2 rounded-md text-[1.8rem] align-middle'>Sign Up</button>
        </div>
            </>
    )
}