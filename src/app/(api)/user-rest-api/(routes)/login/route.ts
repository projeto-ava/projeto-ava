import { NextRequest } from 'next/server';

import { IUser, IUserLoginRes } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController, UserValidationError } from '../../controllers/user';

dbConnection();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) throw new UserValidationError('Invalid data');

        const user: IUserLoginRes = await UserController.login({ email, password });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error && error?.message || 'Server error',
                errorCode: error && error?.errorCode || 'ERROR',
            }),
            { status: error && error?.statusCode || 500 }
        );
    }
}
