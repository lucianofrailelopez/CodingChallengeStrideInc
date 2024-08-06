import { Avatar } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { User } from '@/utils/types';
import HomeIcon from '@mui/icons-material/Home';
// import PersonIcon from '@mui/icons-material/Person';
import { useRouter, usePathname } from 'next/navigation';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';

const LeftSidebar = ({ user }: { user: User }) => {
    const router = useRouter();
    const pathName = usePathname();
    const handleHomeClick = (path: string) => {
        router.push(path);
    };
    return (
        <>
            <aside
                className={`flex md:flex-col justify-between min-w-[320px] md:h-[100vh] p-6 box-border z-10 border-b md:border-0 border-[#bdc5cdd7] `}
            >
                <div className='flex justify-center items-center w-full md:block'>
                    <TwitterIcon className='hidden md:block text-[#fff] w-10 h-12' />
                    <div className='flex items-end w-full cursor-pointer md:mt-[20px]' onClick={() => handleHomeClick('/')}>
                        {pathName === '/' ? <HomeIcon sx={{ color: '#fff', width: 35, height: 35 }} /> : <HomeOutlinedIcon sx={{ color: '#fff', width: 35, height: 35 }} />}
                        <p className='hidden md:block text-[#fff] text-xl ml-2'>Home</p>
                    </div>
                    <div className='flex items-end w-full cursor-pointer md:mt-[20px]' onClick={() => handleHomeClick('/profile')}>
                        {pathName === '/profile' ? <PersonIcon sx={{ color: '#fff', width: 35, height: 35 }} /> : <Person2OutlinedIcon sx={{ color: '#fff', width: 35, height: 35 }} />}
                        <p className='hidden md:block text-[#fff] text-xl ml-2' >Profile</p>
                    </div>
                </div>
                <div className='flex items-center cursor-pointer' onClick={() => handleHomeClick('/profile')}>
                    <Avatar src={user.profile_image} />
                    <div className='hidden md:block'>
                        <p className='text-[#fff] text-l ml-2'>Jane Doe</p>
                        <p className='text-[#bdc5cdd7] text-l ml-2'>@jdoe</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default LeftSidebar;
