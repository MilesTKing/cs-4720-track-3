'use client'

import {useActionState} from "react";
import {acceptFriendRequest, declineFriendRequest} from "@/app/actions";

export default function FriendRequestCard({request}: {
    request: any
}) {

    const [, accept] = useActionState(acceptFriendRequest, {
        success: false,
        message: ""
    });

    const [, decline] = useActionState(declineFriendRequest, {
        success: false,
        message: ""
    });

    return (

        <div className="flex items-center justify-between bg-theme_gray rounded-md p-3">

            <div className="flex-1">

                <p className="font-semibold">
                    {request.sender.name}
                </p>

                <p className="text-sm text-gray-600">
                    @{request.sender.username}
                </p>

            </div>

            <div className="flex gap-2">

                <form action={accept}>
                    <input type="hidden" name="requestId" value={request.id}/>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                        ✓
                    </button>
                </form>

                <form action={decline}>
                    <input type="hidden" name="requestId" value={request.id}/>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                        ✕
                    </button>
                </form>

            </div>

        </div>

    );

}