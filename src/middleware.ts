import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
    const userId = cookies().get('UserId')?.value || '';
    if (!userId) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/profile/:path*', '/home/:path*', '/'],
};