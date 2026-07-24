import { notFound } from "next/navigation";
import NavBar from "../../NavBar";
import ProfileView from "../ProfileView";
import {
    getCurrentUser,
    getUserPhotos,
    getUserByUsername
} from "../../actions";

export default async function PublicProfile({params}:{ params:{ username:string }
}){
    const resolvedParams = await params;
    const user = await getUserByUsername(resolvedParams.username);

    const currentUser = await getCurrentUser();

    if(!user){

        notFound();

    }

    const photos = await getUserPhotos(user.id);

    return(

        <div className="flex flex-col">

            <NavBar username={currentUser?.username} />

            <ProfileView
                user={user}
                photos={photos}
                ownProfile={false}
            />

        </div>

    );

}