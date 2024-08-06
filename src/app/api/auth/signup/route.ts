import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import handleUser from '@/server/crud';

import { User } from '@/utils/types';

export async function POST(req: Request) {
    const { first_name, last_name, username, email, password } = await req.json();
    const user = await handleUser.searchByEmail(email);

    if (user) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
        description: '',
        following: [],
        followers: [],
        posts: [],
    };

    handleUser.addUser(newUser);

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}