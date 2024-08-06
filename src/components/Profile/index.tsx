// import Image from 'next/image';
import { User } from '@/utils/types';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';
import Card from '../Card';
import { Avatar } from '@mui/material';

const ProfileComponent = ({ user, unfollowersUser, toggleModalOpen }: { user: User, unfollowersUser: User[], toggleModalOpen: () => void }) => {

  return (
    <>
      <LeftSidebar user={user} />
      <section className='text-white min-w-[320px] w-[100vw] sm:min-h-[59vh] md:h-[100vh] border-l border-r border-[#bdc5cdd7] overflow-auto'>
        <div className='flex flex-col m-4'>
          <div className='flex justify-between items-end mb-4'>
            <Avatar
              src={user.profile_image}
              alt='profile picture'
              sx={{ width: 100, height: 100 }}
            />
            <button
              className='h-10 border border-white rounded-full px-4 py-1'
              onClick={toggleModalOpen}
            >
              Edit profile
            </button>
          </div>
          <div className='flex items-center'>
            <span>{user.first_name} {user.last_name}</span>
          </div>
          <div className='text-gray-400'>@{user.username}</div>
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
        <div className='w-full max-h-[40vh] border border-[#bdc5cdd7] overflow-scroll'>
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
