import LeftSidebar from "@/components/LeftSidebar";
import HomeComponent from "@/components/Home";
import RightSidebar from "@/components/RightSidebar";
import handleUser from '@/server/crud';

import { cookies } from 'next/headers';

const Home = () => {

    const userId = cookies().get('UserId')?.value || '';
    const user = handleUser.getUserById(userId)

    return (
        <div className="flex flex-col md:flex-row">
            <LeftSidebar user={user} />
            <HomeComponent data={user} />
            <RightSidebar id={userId} />
        </div>
    );
};

export default Home;