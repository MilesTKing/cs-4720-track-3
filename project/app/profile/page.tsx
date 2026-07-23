import NavBar from "../NavBar";
import {getCurrentUser, getUserPhotos} from "../actions";
import FriendRequestPanel from '../friends/FriendRequestPanel'
import UploadPhoto from "@/app/profile/UploadPhotoPanel";
export default async function Profile() {

    let photos
    const user = await getCurrentUser();
    if(user){
        photos = await getUserPhotos(user.id);
    }

    if (!user) {
        return (
            <>
                <NavBar />
                <h1>Please log in.</h1>
            </>
        );
    }

    return (
        <div className={'flex flex-col '}>
            <NavBar username={user.username}></NavBar>
            <div className={'flex-auto flex flex-col items-center justify-center border-8/10'}>
                <section className='flex flex-col bg-theme_gray w-8/10 '>
                    <div className={'flex flex-row gap-4'}>
                        <div className={''}>
                            <img alt={'Profie Picture'} src={user.profilePic? user.profilePic: "default_picture.jpg"} className={'max-w-50 rounded-md'}/>
                        </div>
                        <div className={'flex-auto flex flex-row justify-start'}>
                            <div className={'flex-1 max-h-10'}>Friend Count: {user.friends? user.friends.length: 0}</div>
                            <div className={'flex-1 max-h-10'}>Pictures: {photos.length}</div>
                            <FriendRequestPanel />
                        </div>
                    </div>

                    <div className={'flex-auto text-[1.5rem]'}>Name: {user.name? user.name: 'Who are you!'}</div>
                    <div className={'flex-auto text-[1.5rem]'}>Bio: {user.bio? user.bio: 'How do you describe yourself?!'}</div>
                    <div className={'flex-auto flex flex-col text-[1.5rem]'}>
                        Links:
                        <a href={user.instagram? user.instagram: ''}><img alt={'Instagram Link'} className={'flex-auto max-w-10'} src={'instagram.jpg'}/></a>
                        <a href={user.twitter? user.twitter: ''}><img alt={'Twitter Link'} className={'flex-auto max-w-10'} src={'twitter.png'}/></a>
                        <a href={user.facebook? user.facebook: ''}><img alt={'Facebook Link'} className={'flex-auto max-w-10'} src={'facebook.jpg'}/></a>
                    </div>
                </section>
                <section className='flex-auto flex flex-col bg-theme_blue w-4/5'>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className={'text-center text-[1.8rem]'}>Your Photos!</h1>
                        <UploadPhoto></UploadPhoto>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">

                        { photos && photos.map(photo => (

                            <img
                                key={photo.id}
                                src={photo.imageUrl}
                                alt=""
                                className="aspect-square object-cover rounded hover:scale-105 transition cursor-pointer"
                            />

                        ))}

                    </div>

                </section>
            </div>
        </div>


)
}