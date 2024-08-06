// import Image from 'next/image';
import { User } from '@/utils/types';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';
import Card from '../Card';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileComponent = ({ user, unfollowersUser, toggleModalOpen }: { user: User, unfollowersUser: User[], toggleModalOpen: () => void }) => {
  const router = useRouter();
  const goBackClick = () => {
    router.push('/');
  }

  return (
    <>
      <LeftSidebar showLeftSidebar={false} setShowLeftSidebar={() => { }} />
      <section className='text-white min-w-[320px] w-[100vw] h-[100vh] border-l border-r border-[#bdc5cdd7] overflow-auto'>
        <div className='flex flex-col m-4'>
          <div className='flex items-center mb-4'>
            <IconButton
              onClick={goBackClick}
              style={{
                marginBottom: '20px',
              }}
            >
              <ArrowBackIcon
                sx={{
                  color: 'white',
                  marginRight: '10px',
                }}
              />
            </IconButton>
            <div>
              <h1 className='mr-2'>{user.first_name}</h1>
              <span className='text-gray-400'>Post counter</span>
            </div>
          </div>
          <div className='flex justify-between items-end mb-4'>
            <img
              src={user.profile_image}
              alt='profile picture'
              width={110}
              height={110}
              className='rounded-full'
            />
            <button
              className='h-10 border border-white rounded-full px-4 py-1'
              onClick={toggleModalOpen}
            >
              Edit profile
            </button>
          </div>
          <div className='flex items-center'>
            <span>{user.first_name}</span>
          </div>
          <div className='text-gray-400'>{user.username}</div>
          <div>
            <span className='mr-2'>
              {user.following?.length}
              <span className='text-gray-400'> Following</span>
            </span>
            <span>
              {user.followers?.length}
              <span className='text-gray-400'> Followers</span>
            </span>
          </div>
          <h2 className='self-center mt-4 font-bold'>Posts</h2>
        </div>
        <div className='min-w-80 w-9/12 h-1 m-auto mb-0 bg-blue-500'></div>
        <div>
          {user.posts?.map((data, index) => (
            <Card key={index} data={user} post={data} />
          ))}
        </div>
      </section>
      <RightSidebar unfollowersUser={unfollowersUser} />
    </>
  );
};

export default ProfileComponent;
