const fs = require('fs');
const path = require('path');
import { User } from '@/utils/types';

const dataFilePath = path.join(process.cwd(), 'src/server', 'db.json');

function readData() {
    const jsonData = fs.readFileSync(dataFilePath);
    return JSON.parse(jsonData);
}

function writeData(data: any) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

const searchByEmail = (email: string) => {
    const data = readData();
    const user = data.users.find((user: any) => user.email === email)
    return user
}

const addUser = (newUser: User) => {
    const data = readData();
    data.users.push(newUser);
    writeData(data);
    return newUser
}

function getUserById(id: string) {
    const data = readData();
    return data.users.find((user: User) => user.id === id);
}

function getunfollowedUsers(id: string) {
    const user = getUserById(id);
    if (!user) return [];

    const data = readData();
    return data.users.filter((u: User) => u.id !== id && !user.following.includes(u.id));
}

function updateUser(user: User) {
    const data = readData();
    const index = data.users.findIndex((u: User) => u.id === user.id);
    if (index !== -1) {
        data.users[index] = user;
        writeData(data);
    }

    return user;
}

function getFollowingPosts(id: string) {
    const user = getUserById(id);
    if (!user) return [];

    const data = readData();
    let posts = user.posts.map((post: any) => ({
        ...post,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
        username: user.username
    }));

    user.following.forEach((followingId: string) => {
        const followingUser = data.users.find((user: User) => user.id === followingId);
        if (followingUser) {
            posts = posts.concat(followingUser.posts.map((post: any) => ({
                ...post,
                first_name: followingUser.first_name,
                last_name: followingUser.last_name,
                username: followingUser.username,
                profile_image: followingUser.profile_image,
            })));
        }
    });

    return posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createPost(id: string, post: any) {
    const data = readData();
    const user = data.users.find((user: User) => user.id === id);
    if (user) {
        user.posts.push(post);
        writeData(data);
        return post;
    }
    return null;
}

export function addFollowing(id: string, followingId: string) {
    const data = readData();
    const user = data.users.find((user: User) => user.id === id);
    if (user) {
        user.following.push(followingId);
        writeData(data);
        return user;
    }
    return null;
}



const handleUser = {
    searchByEmail,
    addUser,
    getUserById,
    getunfollowedUsers,
    updateUser,
    getFollowingPosts,
    createPost,
    addFollowing
}

export default handleUser;