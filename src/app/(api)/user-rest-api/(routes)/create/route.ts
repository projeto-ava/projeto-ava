import { NextRequest } from 'next/server';

import { IUserDetail } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController } from '../../controllers/user';
import { UserValidationError } from '../../models/errors';
import { errorResponse } from '@/app/(api)/helpers/error-response';

dbConnection();

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) throw new UserValidationError('Invalid data');

        const createdUser: IUserDetail = await UserController.create({ name, email, password });

        return new Response(JSON.stringify(createdUser), { status: 201 });
    } catch (error: any) {
        return errorResponse(error);
    }
}
