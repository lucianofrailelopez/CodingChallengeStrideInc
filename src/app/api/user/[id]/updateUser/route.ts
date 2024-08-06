import { NextResponse } from 'next/server';
import handleUser from '@/server/crud';

export async function PUT(request: Request) {
    try {
        const body = await request.json();


        if (!body) {
            return NextResponse.json({ error: 'User data not found' }, { status: 400 });
        }

        const updatedUser = await handleUser.updateUser(body);

        if (!updatedUser) {
            return NextResponse.json({ error: 'User update failed' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
