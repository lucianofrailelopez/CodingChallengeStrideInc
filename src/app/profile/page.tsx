"use client";
import { useState, useEffect } from "react";
import { User } from "@/utils/types";
import ProfileComponent from "@/components/Profile";
import Modal from "@/components/ModalEditProfile";

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModalOpen = () => {
        console.log("edit profile");
        setIsModalOpen(!isModalOpen);
    };
    const [userData, setUserData] = useState<User>({} as User);
    const [unfollowersUser, setUnfollowersUser] = useState<User[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            setUserData(JSON.parse(user || "{}"));
        }

        const fetchData = async () => {
            try {
                if (userData.id) {
                    const response = await fetch(`/api/user/${userData.id}`);
                    const data = await response.json();
                    setUserData(data);

                    const responseNotFollowers = await fetch(
                        `/api/user/${userData.id}/unfollowedUsers`
                    );
                    const dataNonFollowers = await responseNotFollowers.json();
                    setUnfollowersUser(dataNonFollowers);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [userData.id]);

    return (
        <div className="flex">
            {/* {isModalOpen && (
                <Modal
                    toggleModalOpen={toggleModalOpen}
                    photo_url={user.avatar}
                    name={user.name}
                />
            )} */}
            <ProfileComponent user={userData} unfollowersUser={unfollowersUser} toggleModalOpen={toggleModalOpen} />
        </div>
    );
};

export default Profile;
