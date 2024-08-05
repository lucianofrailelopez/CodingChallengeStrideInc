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

const handleUser = {
    searchByEmail,
    addUser
}

export default handleUser;