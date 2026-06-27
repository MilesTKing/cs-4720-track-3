'use client'

import { useActionState } from 'react';
import { sendForm } from './actions';

const initialState = {
    success: false,
    message: ""
};

export default function OrderForm() {
    const [state, formAction] = useActionState(sendForm, initialState);

    return (
        <>
            <form action={formAction} className="space-y-2">
                <div>
                    <label htmlFor="wheels" className="mr-2">
                        Wheels
                    </label>
                    <input
                        type="text"
                        id="wheels"
                        name="wheels"
                        className="border border-black px-1"
                    />
                </div>

                <div>
                    <label htmlFor="windshield-wipers" className="mr-2">
                        Windshield Wipers
                    </label>
                    <input
                        type="text"
                        id="windshield-wipers"
                        name="windshield-wipers"
                        className="border border-black px-1"
                    />
                </div>

                <div>
                    <label htmlFor="radios" className="mr-2">
                        Radios
                    </label>
                    <input
                        type="text"
                        id="radios"
                        name="radios"
                        className="border border-black px-1"
                    />
                </div>

                <input
                    type="submit"
                    value="Submit"
                    className="border border-black px-2 py-1"
                />
            </form>

            {state.success && (
                <p>{state.message}</p>
            )}
        </>
    );
}