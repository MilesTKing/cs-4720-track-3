'use client'
import { getFriendRequests } from "../actions";
import FriendRequestCard from "./FriendRequestCard";
import {useState, useEffect} from "react";
export default function FriendRequestPanel() {

    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const data = await getFriendRequests();
            setRequests(data);
        }

        load();
    }, []);
    return (
        <div className="w-80 bg-white rounded-lg shadow-md p-4 self-start mr-2">

            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
                Friend Requests
            </h2>

            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">

                {requests.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No pending requests
                    </p>
                ) : (
                    requests.map(request => (
                        <FriendRequestCard
                            key={request.id}
                            request={request}
                        />
                    ))
                )}

            </div>

        </div>
    );
}