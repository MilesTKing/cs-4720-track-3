'use client';

import Link from "next/link";

export default function FriendsModal({
                                         open,
                                         onClose,
                                         friends
                                     }: {
    open: boolean;
    onClose: () => void;
    friends: any[];
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg w-[450px] max-h-[80vh] overflow-y-auto p-6">

                <div className="flex justify-between items-center mb-4">

                    <h1 className="text-2xl font-semibold">
                        Friends
                    </h1>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ✕
                    </button>

                </div>

                {friends.length === 0 ? (

                    <p className="text-center text-gray-500">
                        No friends yet.
                    </p>

                ) : (

                    <div className="flex flex-col gap-3">

                        {friends.map(friend => (

                            <div
                                key={friend.id}
                                className="flex items-center justify-between bg-theme_gray rounded-md p-3"
                            >

                                <div className="flex items-center gap-3">

                                    <img
                                        src={friend.profilePic || "/default_picture.jpg"}
                                        className="w-12 h-12 rounded-full object-cover"
                                        alt=""
                                    />

                                    <div>

                                        <div className="font-semibold">
                                            {friend.name}
                                        </div>

                                        <div className="text-gray-600">
                                            @{friend.username}
                                        </div>

                                    </div>

                                </div>

                                <Link
                                    href={`/profile/${friend.username}`}
                                    onClick={onClose}
                                    className="bg-theme_blue text-white px-3 py-2 rounded-md"
                                >
                                    View Profile
                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}