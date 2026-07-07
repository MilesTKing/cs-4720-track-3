import NavBar from '../NavBar'


export default function Profile(){
    const user_info= {
        'profile_picture': 0,
        'name': 0,
        'bio': 0,
        'twitter': 0,
        'instagram': 0,
        'facebook': 0,
        'friends': 0,
        'pictures': []
    }
    return (
        <div className={'flex flex-col w-[100%]'}>
            <NavBar></NavBar>
            <div className={'flex-auto flex flex-col items-center justify-center border-8/10'}>
            <section className='flex flex-col bg-theme_gray w-8/10 '>
                <div className={'flex flex-row gap-4'}>
                    <div className={''}>
                        <img alt={'Profie Picture'} src={user_info["profile_picture"]? user_info["profile_picture"]: "default_picture.jpg"} className={'max-w-50 rounded-md'}/>
                    </div>
                    <div className={'flex-auto flex flex-row justify-start'}>
                        <div className={'flex-1 max-h-10'}>Friend Count: {user_info["friends"]}</div>
                        <div className={'flex-1 max-h-10'}>Pictures: {user_info['pictures'].length}</div>
                    </div>
                </div>

                <div className={'flex-auto text-[1.5rem]'}>Name: {user_info['name']? user_info['name']: 'Who are you!'}</div>
                <div className={'flex-auto text-[1.5rem]'}>Bio: {user_info['bio']? user_info['bio']: 'How do you describe yourself?!'}</div>
                <div className={'flex-auto flex flex-col text-[1.5rem]'}>
                    Links:
                    <img alt={'Instagram Link'} className={'flex-auto max-w-10'} src={'instagram.jpg'}/>
                    <img alt={'Twitter Link'} className={'flex-auto max-w-10'} src={'twitter.png'}/>
                    <img alt={'Facebook Link'} className={'flex-auto max-w-10'} src={'facebook.jpg'}/>
                </div>
            </section>
            <section className='flex-auto flex flex-col bg-theme_blue w-4/5 h-[100%]'>
                <h1 className={'text-center text-[1.8rem]'}>Your Photos!</h1>
                <div className={''}>
                </div>
            </section>
                </div>
        </div>


)
}