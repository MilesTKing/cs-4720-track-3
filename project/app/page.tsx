import NavBar from './NavBar';

import Link from "next/link";
import {getCurrentUser} from "./actions";

export default async function Home() {

    const user = await getCurrentUser();

    return (
        <div className="flex flex-col flex-1 h-full">
            {user? <NavBar username={user.username}/>: <NavBar />}
            <div className="flex flex-col items-center justify-center flex-1 bg-theme_gray">

                <section className="bg-white rounded-lg shadow-md p-10 w-4/5 md:w-2/3 text-center">

                    <h1 className="text-3xl font-bold mb-6 text-theme_blue">
                        Welcome to Storming Social
                    </h1>

                    <p className="text-xl mb-8">
                        Connect with friends, share photos, and build your
                        online profile.
                    </p>


                    {user ? (

                        <div className="flex flex-col items-center gap-4">

                            <p className="text-2xl">
                                Welcome back, {user.name}!
                            </p>

                            <Link
                                href="/profile"
                                className="bg-theme_blue text-white px-8 py-3 rounded-md text-xl hover:opacity-90 p-2"
                            >
                                View Profile
                            </Link>

                        </div>

                    ) : (

                        <div className="flex justify-center gap-6">

                            <Link
                                href="/profile"
                                className="bg-theme_blue text-white px-8 py-3 rounded-md text-xl hover:opacity-90"
                            >
                                Sign Up / Login
                            </Link>


                            <Link
                                href="/friends"
                                className="border-2 border-theme_blue px-8 py-3 rounded-md text-xl hover:bg-theme_gray"
                            >
                                Explore Users
                            </Link>

                        </div>

                    )}

                </section>


                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-4/5 md:w-2/3 mt-10">

                    <div className="bg-white rounded-lg p-6 text-center">

                        <h2 className="text-2xl font-semibold mb-2">
                            Profiles
                        </h2>

                        <p>
                            Create your own profile with a bio,
                            social links, and profile picture.
                        </p>

                    </div>


                    <div className="bg-white rounded-lg p-6 text-center">

                        <h2 className="text-2xl font-semibold mb-2">
                            Friends
                        </h2>

                        <p>
                            Find other users and send friend requests.
                        </p>

                    </div>


                    <div className="bg-white rounded-lg p-6 text-center">

                        <h2 className="text-2xl font-semibold mb-2">
                            Photos
                        </h2>

                        <p>
                            Upload photos and share your memories.
                        </p>

                    </div>

                </section>

            </div>
        </div>
    );
}