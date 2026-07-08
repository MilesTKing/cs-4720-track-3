'use client'

import {useState, useActionState} from "react";
import {createAccount, login} from "@/app/actions";

export default function AuthModal({open, onClose}: {
    open: boolean,
    onClose: () => void
}) {

    const [signup, setSignup] = useState(false);

    const [loginState, loginAction] = useActionState(login, {
        success: false, message: ""
    });

    const [signupState, signupAction] = useActionState(createAccount, {
        success: false, message: ""
    });

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

            <div className="bg-white rounded-lg p-8 w-[600px]">

                <h1 className="text-3xl text-center mb-4">

                    {signup ? "Create Account" : "Login"}

                </h1>

                <form action={signup ? signupAction : loginAction}
                      className="flex flex-col gap-3">

                    <input
                        name="username"
                        placeholder="Username"
                        className="border p-2 rounded"
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        className="border p-2 rounded"
                    />

                    {signup && <>

                        <input
                            name="name"
                            placeholder="Full Name"
                            className="border p-2 rounded"
                        />

                        <textarea
                            name="bio"
                            placeholder="Bio"
                            className="border p-2 rounded"
                        />

                        <input
                            name="twitter"
                            placeholder="Twitter Link"
                            className="border p-2 rounded"
                        />

                        <input
                            name="instagram"
                            placeholder="Instagram Link"
                            className="border p-2 rounded"
                        />

                        <input
                            name="facebook"
                            placeholder="Facebook Link"
                            className="border p-2 rounded"
                        />

                        <input
                            type="file"
                            name="profilePicture"
                        />

                    </>}

                    <button
                        className="bg-blue-500 text-white rounded p-2">

                        {signup ? "Create Account" : "Login"}

                    </button>

                </form>

                <p className="text-center mt-2 text-red-500">

                    {signup ? signupState.message : loginState.message}

                </p>

                <button
                    className="mt-4 underline"
                    onClick={() => setSignup(!signup)}
                >

                    {signup
                        ? "Already have an account?"
                        : "Create an account"}

                </button>

                <button
                    className="mt-2 underline block mx-auto"
                    onClick={onClose}
                >

                    Close

                </button>

            </div>

        </div>

    )

}