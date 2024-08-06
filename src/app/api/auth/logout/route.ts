import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { email } = await req.json();
    cookies().delete(email)
    return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}