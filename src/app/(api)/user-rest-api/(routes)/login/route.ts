import { NextRequest } from 'next/server';

import { IUserLoginRes } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController } from '../../controllers/user';
import { UserValidationError } from '../../models/errors';
import { errorResponse } from '@/app/(api)/helpers/error-response';

dbConnection();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) throw new UserValidationError('Invalid data');

        const user: IUserLoginRes = await UserController.login({ email, password });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
        return errorResponse(error);
    }
}
