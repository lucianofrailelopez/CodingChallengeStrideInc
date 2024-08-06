'use client';
import { User } from '@/utils/types';
import { useRouter, usePathname } from 'next/navigation';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const LeftSidebar = ({ user }: { user: User }) => {
    const router = useRouter();
    const pathName = usePathname();
    const handleHomeClick = (path: string) => {
        router.push(path);
    };

    const handleLogout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        router.push("/login");
    };

    return (
        <>
            <aside
                className={`flex flex-row-reverse md:flex-col justify-between md:justify-normal min-w-[320px] md:h-[100vh] p-6 box-border z-10 border-b md:border-0 border-[#bdc5cdd7] `}
            >
                <TwitterIcon className='hidden md:block text-[#fff] w-10 h-12' />
                <div className='flex items-end cursor-pointer md:mt-[20px]' onClick={() => handleLogout()}>
                    <LogoutIcon sx={{ color: '#fff', width: 35, height: 35 }} />
                    <p className='hidden md:block text-[#fff] text-xl ml-2' >Logout</p>
                </div>
                <div className='flex items-end cursor-pointer md:mt-[20px]' onClick={() => handleHomeClick('/home')}>
                    {pathName === '/home' ? <HomeIcon sx={{ color: '#fff', width: 40, height: 40 }} /> : <HomeOutlinedIcon sx={{ color: '#fff', width: 40, height: 40 }} />}
                    <p className='hidden md:block text-[#fff] text-xl ml-2'>Home</p>
                </div>
                <div className='flex h-[100%] items-end cursor-pointer' onClick={() => handleHomeClick('/profile')}>
                    <Avatar src={user?.profile_image} sx={{ width: 50, height: 50 }} />
                    <div className='hidden md:block'>
                        <p className='text-[#fff] text-l ml-2'>{user?.first_name} {user?.last_name}</p>
                        <p className='text-[#bdc5cdd7] text-l ml-2'>@{user?.username}</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default LeftSidebar;