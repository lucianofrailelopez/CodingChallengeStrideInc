import { User } from '@/utils/types';
import { Avatar, Button } from '@mui/material';
import { cookies } from 'next/headers';
import handleUser from '@/server/crud';

interface RightSidebarProps {
    id: string;
}

const RightSidebar = async ({ id }: RightSidebarProps) => {

    const dataNonFollowers = handleUser.getunfollowedUsers(id)


    return (
        <aside className='sm:h-[40vh] md:block min-w-[320px] md:h-[100vh] p-8 box-border z-10'>
            <div className='w-full h-[40vh] p-4 box-border rounded-lg border border-[#bdc5cdd7] overflow-scroll'>
                <p className='text-[#fff] text-xl font-bold'>Who to follow</p>
                <div className='flex flex-col space-y-4 mt-4'>
                    {dataNonFollowers?.slice(0, 10).map((data: User, index: number) => (
                        <div key={index} className='flex items-center cursor-pointer'>
                            <Avatar src={data.profile_image} />
                            <div className='flex justify-between items-center w-full'>
                                <div className=''>
                                    <p className='text-[#fff] text-l ml-2'>{data.first_name}</p>
                                    <p className='text-[#bdc5cdd7] text-l ml-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]'>
                                        @{data.username.slice(0, 10)}
                                    </p>

                                </div>
                                <Button sx={{ borderRadius: 5, fontSize: 10, fontWeight: 700, height: 30, color: '#000', backgroundColor: '#fff' }}>Follow</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;