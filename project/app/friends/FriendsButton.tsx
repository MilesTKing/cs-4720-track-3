'use client';

import { useEffect, useState } from "react";
import FriendsModal from "./FriendsModal";
import { getFriends } from "../actions";

export default function FriendsButton({
                                          userId,
                                          count
                                      }: {
    userId: number;
    count: number;
}) {

    const [open, setOpen] = useState(false);
    const [friends, setFriends] = useState<any[]>([]);

    useEffect(() => {

        if (!open) return;

        async function loadFriends() {
            const data = await getFriends(userId);
            setFriends(data);
        }

        loadFriends();

    }, [open, userId]);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex-1 max-h-10 text-left  hover:underline text-lg"
            >
                Friends: {count}
            </button>

            <FriendsModal
                open={open}
                onClose={() => setOpen(false)}
                friends={friends}
            />
        </>
    );
}