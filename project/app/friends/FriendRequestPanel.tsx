'use client'

import { useActionState } from "react";
import { acceptFriendRequest, declineFriendRequest } from "@/app/actions";

export default function FriendRequestCard({
                                              request
                                          }:{
    request:any
}){

    const [,accept] = useActionState(acceptFriendRequest,{
        success:false,
        message:""
    });

    const [,decline] = useActionState(declineFriendRequest,{
        success:false,
        message:""
    });

    return(

        <div className="flex justify-between items-center bg-white rounded shadow p-4">

            <div>

                <h2>{request.sender.name}</h2>

                <p>@{request.sender.username}</p>

            </div>

            <div className="flex gap-2">

                <form action={accept}>

                    <input
                        type="hidden"
                        name="requestId"
                        value={request.id}
                    />

                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Accept
                    </button>

                </form>

                <form action={decline}>

                    <input
                        type="hidden"
                        name="requestId"
                        value={request.id}
                    />

                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Decline
                    </button>

                </form>

            </div>

        </div>

    );

}