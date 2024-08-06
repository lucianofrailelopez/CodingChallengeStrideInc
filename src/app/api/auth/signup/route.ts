import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import handleUser from '@/server/crud';

import { User } from '@/utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { first_name, last_name, username, email, password } = req.body;

        const user = await handleUser.searchByEmail(email);

        if (user) {
            return res.status(401).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            id: uuidv4(),
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            profile_image: '',
            following: [],
            followers: [],
            posts: [],
        };

        handleUser.addUser(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}