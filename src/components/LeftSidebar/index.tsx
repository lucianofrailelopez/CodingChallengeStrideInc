import { Avatar } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
// import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

const LeftSidebar = ({ showLeftSidebar, setShowLeftSidebar }: { showLeftSidebar: boolean, setShowLeftSidebar: (show: boolean) => void }) => {
    const router = useRouter();
    const handleHomeClick = (path: string) => {
        setShowLeftSidebar(false);
        router.push(path);
    };
    return (
        <>
            {showLeftSidebar && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-5"
                    onClick={() => handleHomeClick('/')}
                />
            )}
            <aside
                className={`fixed top-0 left-0 bg-black text-white ${showLeftSidebar ? 'flex' : 'hidden'} md:relative md:flex flex-col justify-between min-w-[320px] max-w-[90] h-[100vh] p-6 box-border z-10`}
            >
                <div>
                    <TwitterIcon className='text-[#fff] w-10 h-12' />
                    <div className='flex items-end w-full h-14 cursor-pointer'>
                        <HomeIcon sx={{ color: '#fff', width: 35, height: 35 }} />
                        <p className='text-[#fff] text-xl ml-2' onClick={() => handleHomeClick('/')}>Home</p>
                    </div>
                    <div className='flex items-end w-full h-14 cursor-pointer'>
                        <Person2OutlinedIcon sx={{ color: '#fff', width: 35, height: 35 }} />
                        <p className='text-[#fff] text-xl ml-2' onClick={() => handleHomeClick('/profile')}>Profile</p>
                    </div>
                </div>
                <div className='flex items-center cursor-pointer' onClick={() => handleHomeClick('/profile')}>
                    <Avatar />
                    <div>
                        <p className='text-[#fff] text-l ml-2'>Jane Doe</p>
                        <p className='text-[#bdc5cdd7] text-l ml-2'>@jdoe</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default LeftSidebar;
