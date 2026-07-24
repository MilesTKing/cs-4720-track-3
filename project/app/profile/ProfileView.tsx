'use client'
import FriendRequestPanel from "../friends/FriendRequestPanel";
import UploadPhoto from "./UploadPhotoPanel";
import FriendsButton from "../friends/FriendsButton";

export default function ProfileView({user, photos, ownProfile}: { user: any; photos: any[]; ownProfile: boolean; }) {
    return (

        <div className="flex-auto flex flex-col items-center justify-center">

            <section className="flex flex-col bg-theme_gray w-8/10 rounded-md p-4">

                <div className="flex flex-row gap-4">

                    <div>

                        <img
                            alt="Profile Picture"
                            src={user.profilePic || "default_picture.jpg"}
                            className="max-w-50 rounded-md"
                        />

                    </div>

                    <div className="flex-auto flex flex-row justify-start">

                        <FriendsButton
                            userId={user.id}
                            count={user.friends.length}
                        />

                        <div className="flex-1 max-h-10 text-lg">

                            Pictures: {photos.length}

                        </div>

                        {ownProfile && <FriendRequestPanel />}

                    </div>

                </div>

                <div className="mt-4 text-[1.5rem]">

                    Name: {user.name || "Who are you!"}

                </div>

                <div className="text-[1.5rem]">

                    Bio: {user.bio || "How do you describe yourself?!"}

                </div>

                <div className="flex flex-col text-[1.5rem] mt-2">

                    Links:

                    <div className="flex gap-4 mt-2">

                        <a href={`https://`+user.instagram}>
                            <img alt="Instagram" className="max-w-10" src="/instagram.jpg"/>
                        </a>


                        <a href={`https://`+user.twitter}>
                            <img alt="Twitter" className="max-w-10" src="/twitter.png"/>
                        </a>


                        <a href={`https://`+user.facebook}>
                            <img alt="Facebook" className="max-w-10" src="/facebook.jpg"/>
                        </a>

                    </div>

                </div>

            </section>

            <section className="flex flex-col bg-theme_blue w-4/5 mt-6 rounded-md p-4">

                <div className="flex justify-between items-center mb-4">

                    <h1 className="text-[1.8rem] text-white">
                        {ownProfile ? "Your Photos!" : `${user.name}'s Photos`}
                    </h1>

                    {ownProfile && <UploadPhoto />}

                </div>

                {photos.length === 0 ? (

                    <div className="text-center text-white py-10">
                        No photos uploaded yet.
                    </div>

                ) : (

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">

                        {photos.map(photo => (

                            <div
                                key={photo.id}
                                className="aspect-square overflow-hidden rounded-md bg-gray-200"
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                />
                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );

}