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

const handleUser = {
    searchByEmail,
    addUser,
    getUserById,
    getunfollowedUsers,
    updateUser
}

export default handleUser;