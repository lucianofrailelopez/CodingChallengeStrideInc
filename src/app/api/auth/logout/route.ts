import { cookies } from 'next/headers';

export async function POST(req: Request) {
    cookies().delete('UserId');
    return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}