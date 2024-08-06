import LeftSidebar from "@/components/LeftSidebar";
import Profile from "@/components/Profile";
import RightSidebar from "@/components/RightSidebar";
import handleUser from '@/server/crud';

import { cookies } from 'next/headers';

const Profile = () => {

    const userId = cookies().get('UserId')?.value || '';
    const user = handleUser.getUserById(userId)

    return (
        <div className="flex flex-col md:flex-row">
            <LeftSidebar user={user} />
            <Profile user={user} />
            <RightSidebar id={userId} />
        </div>
    );
};

export default Profile;