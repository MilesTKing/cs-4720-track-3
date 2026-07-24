import NavBar from "../NavBar";
import ProfileView from "./ProfileView";
import { getCurrentUser, getUserPhotos } from "../actions";

export default async function Profile() {

    const user = await getCurrentUser();

    if (!user) {

        return (
            <>
                <NavBar />
                <h1>Please log in.</h1>
            </>
        );

    }

    const photos = await getUserPhotos(user.id);

    return (

        <div className="flex flex-col">

            <NavBar username={user.username} />

            <ProfileView
                user={user}
                photos={photos}
                ownProfile={true}
            />

        </div>

    );

}