import { NextResponse } from 'next/server';
import handleUser from '@/server/crud';

export async function POST(request: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const body = await request.json();


        if (!body) {
            return NextResponse.json({ error: 'Post data not found' }, { status: 400 });
        }

        const createdPost = await handleUser.createPost(id, body);

        if (!createdPost) {
            return NextResponse.json({ error: 'Post failed' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post created successfully', post: createdPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
