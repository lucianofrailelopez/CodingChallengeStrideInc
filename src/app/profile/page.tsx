import { cookies } from 'next/headers';
import handleUser from '@/server/crud';
import LeftSidebar from "@/components/LeftSidebar";
import ProfileComponent from "@/components/Profile";
import RightSidebar from "@/components/RightSidebar";

const Profile = () => {

    const userId = cookies().get('UserId')?.value || '';
    const user = handleUser.getUserById(userId)

    return (
        <div className="flex flex-col md:flex-row">
            <LeftSidebar user={user} />
            <ProfileComponent user={user} />
            <RightSidebar id={userId} />
        </div>
    );
};

export default Profile;