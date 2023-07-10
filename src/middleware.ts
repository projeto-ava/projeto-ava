import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAccessToken } from './app/(api)/helpers/auth';
import { errorResponse } from './app/(api)/helpers/error-response';

/**************
 * Interfaces *
 **************/
interface IRoutesForMatch {
    public: string[];
    private: string[];
}

interface IMiddlewareConfig {
    matcher: string[];
}

/**********
 * Routes *
 **********/
const apiRoutes: IRoutesForMatch = {
    public: ['/user-rest-api/create', '/user-rest-api/login'],
    private: ['/user-rest-api/user-detail'],
};

const pageRoutes: IRoutesForMatch = {
    public: ['/login', '/recuperar-senha', '/redefinir-senha'],
    private: [],
};

export const config: IMiddlewareConfig = {
    matcher: [
        // API routes
        '/user-rest-api/:path*',
        // Page routes
        '/login',
    ],
};

/**************
 * Middleware *
 **************/
export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = apiRoutes.public.includes(path) || pageRoutes.public.includes(path);

    if (isPublicRoute) return NextResponse.next();

    try {
        console.log('first0')
        await checkAccessToken(req);
        console.log('first1')
        return NextResponse.next();
    } catch (error: any) {
        return errorResponse(error);
    }
}
