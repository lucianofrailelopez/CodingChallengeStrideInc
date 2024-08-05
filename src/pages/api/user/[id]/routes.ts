import { NextResponse } from 'next/server';
import { getUserById } from '@/server/user';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id');

    if (!userId) {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }

    try {
        // Obtener el usuario desde la base de datos o mock
        const user = await getUserById(userId);

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}