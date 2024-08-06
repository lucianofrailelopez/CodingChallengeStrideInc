import { NextResponse } from 'next/server';
import handleUser from '@/server/crud';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Id not found' }, { status: 400 });
    }

    try {
        const unfollowedUsers = await handleUser.getunfollowedUsers(id);
        return NextResponse.json(unfollowedUsers);
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}