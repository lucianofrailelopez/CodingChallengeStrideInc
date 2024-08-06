import { User } from '@/utils/types';
import handleUser from '@/server/crud';
import SectionPost from '../SectionPost';
import Card from '../Card'

const HomeComponent = ({ data }: { data: User }) => {
    const followingPosts = handleUser.getFollowingPosts(data.id);

    return (
        <>
            <main className='min-w-[320px] w-full h-[100vh] overflow-auto'>
                <SectionPost data={data} />
                {followingPosts?.map((item: User, index: number) => (
                    <Card key={index} data={item} post={item} />
                ))}
            </main>
        </>
    );
}

export default HomeComponent;