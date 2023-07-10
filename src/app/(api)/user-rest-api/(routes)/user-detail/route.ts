import { NextResponse, NextRequest } from 'next/server';

import { IUserDetail } from '../../models/user';
import dbConnection from '../../../services/db-connection';
import { UserController } from '../../controllers/user';
import { errorResponse } from '@/app/(api)/helpers/error-response';
import { decryptToken, getAccessToken } from '@/app/(api)/helpers/auth';

dbConnection();

export async function GET(req: NextRequest) {
    try {
        const accessToken = getAccessToken(req);
        const decryptedToken = decryptToken(accessToken);

        const getUserDetail: IUserDetail = await UserController.getUser({ userId: decryptedToken.id });
        return new Response(JSON.stringify(getUserDetail), { status: 200 });
    } catch (error: any) {
        return errorResponse(error);
    }
}
