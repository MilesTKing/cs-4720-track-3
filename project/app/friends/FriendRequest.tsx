'use client'

import { useActionState } from "react";
import { sendFriendRequest } from "@/app/actions";

export default function AddFriendButton({receiverId}:{
    receiverId:number
}){

    const [state, action] = useActionState(sendFriendRequest,{
        success:false,
        message:""
    });

    return(
        <>
            <form action={action}>

                <input
                    type="hidden"
                    name="receiverId"
                    value={receiverId}
                />

                <button
                    className="bg-theme_blue text-white rounded px-4 py-2"
                >
                    Add Friend
                </button>

            </form>

            <p>{state.message}</p>
        </>
    );
}