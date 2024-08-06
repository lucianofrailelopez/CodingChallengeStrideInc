import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import handleUser from '@/server/crud';


export async function POST(req: Request) {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const { email, password } = await req.json();
    const user = await handleUser.searchByEmail(email);

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // cookies().set(email, token);

        if (!passwordMatch) {
            return new Response(JSON.stringify({ message: 'Incorrect Password' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify({ message: 'Login successful', token, user }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new Response(JSON.stringify({ message: 'Incorrect Password' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}