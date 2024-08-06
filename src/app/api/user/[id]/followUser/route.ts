import { NextResponse } from 'next/server';
import handleUser from '@/server/crud';

export async function POST(request: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const followingPost = await handleUser.addFollowing(id, body.followingId);

        if (!followingPost) {
            return NextResponse.json({ error: 'Following failed' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Following successfully', post: followingPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
