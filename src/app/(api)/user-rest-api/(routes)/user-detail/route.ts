import { NextResponse, NextRequest } from 'next/server';

import { IUser, IUserDetail, User } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController, UserValidationError } from '../../controllers/user';

dbConnection();

export async function GET(req: NextRequest) {
    try {
        const [accessToken, userId] = [
            req.nextUrl.searchParams.get('accessToken'),
            req.nextUrl.searchParams.get('userId')
        ];

        if (!accessToken || !userId) throw new UserValidationError('Invalid data');

        const getUserDetail: IUserDetail = await UserController.getUser({ accessToken, userId });
        return new Response(JSON.stringify(getUserDetail), { status: 200 });
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: (error && error?.message) || 'Server error',
                errorCode: (error && error?.errorCode) || 'ERROR',
            }),
            { status: (error && error?.statusCode) || 500 }
        );
    }
}
