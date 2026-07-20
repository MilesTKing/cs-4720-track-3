import NavBar from "../NavBar";
import {getCurrentUser} from "../actions";
import Friends from './Friends'

export default async function FriendsPage() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <>
                <NavBar></NavBar>
                <Friends loggedIn={true}/>
            </>

        )
    } else {
        return (
            <>
                <NavBar username={user.username}></NavBar>
                <Friends loggedIn={false}/>
            </>
        )
    }

}