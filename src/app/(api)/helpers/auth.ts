import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { UserAuthenticationError } from '../user-rest-api/models/errors';

export interface IDecryptToken {
    id: string;
    email: string;
    exp: number;
}

export function generateToken(userId: string, userEmail: string): string {
    return jwt.sign({ id: userId, email: userEmail }, process.env.JWS_SECRET_KEY!, { expiresIn: '1d' });
};

export function decryptToken(accessToken: string): IDecryptToken {
    const decryptedToken = jwt.decode(accessToken) as jwt.JwtPayload
    return {
        id: decryptedToken.id as string,
        email: decryptedToken.email as string,
        exp: decryptedToken.exp as number,
    };
};

export function getAccessToken(req: NextRequest): string {
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) throw new UserAuthenticationError('Invalid access token');
    return accessToken;
}

function verifyToken(accessToken: string): IDecryptToken {
    const decryptedToken = jwt.verify(accessToken, process.env.JWS_SECRET_KEY!) as jwt.JwtPayload
    return {
        id: decryptedToken.id as string,
        email: decryptedToken.email as string,
        exp: decryptedToken.exp as number,
    };
};

export async function checkAccessToken(req: NextRequest): Promise<void> {
    const accessToken = getAccessToken(req);
    const verifyTokenResult = verifyToken(accessToken);
    const currentTime = Date.now() / 1000;

    if (!verifyTokenResult?.id || !verifyTokenResult?.email) throw new UserAuthenticationError();
    if (!verifyTokenResult?.exp || verifyTokenResult.exp <= currentTime) throw new UserAuthenticationError('Token expired');
}
