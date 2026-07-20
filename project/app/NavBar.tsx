'use client'

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions";
import AuthModal from "./AuthModal";

export default function NavBar({ username }: { username?: string }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex h-12 w-full items-center bg-theme_blue text-white">

                <Link
                    href="/"
                    className="flex-1 text-center text-2xl hover:bg-white/10 h-full flex items-center justify-center"
                >
                    Home
                </Link>

                <Link
                    href="/friends"
                    className="flex-1 text-center text-2xl hover:bg-white/10 h-full flex items-center justify-center"
                >
                    Friends
                </Link>

                <Link
                    href="/profile"
                    className="flex-1 text-center text-2xl hover:bg-white/10 h-full flex items-center justify-center"
                >
                    Profile
                </Link>

                {!username ? (

                    <button
                        className="flex-1 h-full text-2xl hover:bg-white/10"
                        onClick={() => setOpen(true)}
                    >
                        Sign Up
                    </button>

                ) : (

                    <div className="group relative flex-1 h-full">

                        <button
                            className="w-full h-full text-2xl hover:bg-white/10"
                        >
                            {username} ▼
                        </button>

                        <div className="absolute right-0 hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded-md min-w-40">

                            <Link
                                href="/profile"
                                className="px-4 py-2 hover:bg-gray-100"
                            >
                                Profile
                            </Link>

                            <form action={logout}>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Log Out
                                </button>
                            </form>

                        </div>

                    </div>

                )}

            </div>

            <AuthModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}