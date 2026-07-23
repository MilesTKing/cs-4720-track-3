'use client'

import { useActionState } from "react";
import { uploadPhoto } from "../actions";

export default function UploadPhoto() {

    const [state, action] = useActionState(uploadPhoto, {
        success: false,
        message: ""
    });

    return (

        <form
            action={action}
            className="flex gap-4 items-center my-4"
        >

            <input
                type="file"
                name="photo"
                accept="image/*"
                required
            />

            <button
                className="bg-theme_blue text-white px-4 py-2 rounded"
            >
                Upload
            </button>

            <p>{state.message}</p>

        </form>

    );

}