import { User, Post } from '@/utils/types';
import { Avatar } from '@mui/material';

const Card = ({ data, post }: { data: User, post: any }) => {
    const date = new Date(post.createdAt);

    return (
        <div className='flex min-h-[10vh] px-4 py-2 box-border border border-[#bdc5cdd7]'>
            <Avatar src={data?.profile_image} alt="User Avatar" />
            <div>
                <div className='flex flex-wrap items-baseline'>
                    <p className='ml-2 text-[#fff] text-l'>{data.first_name}{data.last_name}</p>
                    <p className='ml-1 text-[#bdc5cdd7] text-sm'>@{data.username}</p>
                    <p className='ml-2 text-[#bdc5cdd7] text-sm'>{date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <p className='ml-2 text-[#fff]'>{post.message}</p>
            </div>
        </div>
    );
}

export default Card;
