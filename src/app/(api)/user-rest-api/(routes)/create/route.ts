import type { NextApiResponse } from 'next';

import { IUserInfo } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController, UserValidationError } from '../../controllers/user';

dbConnection();

export async function POST(req: Request, res: NextApiResponse<IUserInfo>) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) throw new UserValidationError('Invalid data');

        const createdUser: IUserInfo = await UserController.create({ name, email, password });

        return new Response(JSON.stringify(createdUser), { status: 201 });
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
