'use client'

import { useState } from "react";
import {searchUsers} from '../actions'
import FriendButton from '../friends/FriendRequest'
export default function Friends({loggedIn}: {loggedIn: boolean}) {

    const [results, setResults] = useState<any[]>([]);

    async function handleSearch(formData: FormData) {

        const username = String(formData.get("username"));

        const users = await searchUsers(username);

        setResults(users);
    }

    return (
        <>

            <div className="flex flex-col items-center py-8">

                <div className="w-4/5 max-w-4xl bg-theme_gray rounded-lg p-6 shadow">

                    <h1 className="text-4xl text-center font-bold mb-6">
                        Find Friends
                    </h1>

                    <form
                        action={handleSearch}
                        className="flex gap-4 mb-8"
                    >

                        <input
                            name="username"
                            placeholder="Search by username..."
                            className="flex-1 rounded border bg-white p-3 text-lg"
                        />

                        <button
                            className="bg-theme_blue text-white rounded px-6 hover:brightness-110"
                        >
                            Search
                        </button>

                    </form>

                    <div className="flex flex-col gap-4">

                        {results.length === 0 &&
                            <p className="text-center text-gray-700">
                                No users found.
                            </p>
                        }

                        {results.map(user => (

                            <div
                                key={user.username}
                                className="flex gap-5 items-center rounded-lg bg-white p-4 shadow"
                            >

                                <img
                                    src={user.profilePic || "default_picture.jpg"}
                                    className="w-20 h-20 rounded-full object-cover border"
                                    alt="Profile Picture"
                                />

                                <div className="flex-1">

                                    <h2 className="text-2xl font-semibold">
                                        {user.name}
                                    </h2>

                                    <p className="text-gray-600">
                                        @{user.username}
                                    </p>

                                    <p className="mt-2">
                                        {user.bio}
                                    </p>

                                </div>
                                    <FriendButton receiverId={user.id}></FriendButton>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );
}