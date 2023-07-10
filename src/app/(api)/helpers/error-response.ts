import jwt from 'jsonwebtoken';
import { UserAuthenticationError } from '../user-rest-api/models/errors';

export function errorResponse(error: any): Response {
    let currentError = { ...error };

    if (error instanceof jwt.JsonWebTokenError) {
        currentError = new UserAuthenticationError('Invalid access token');
    }

    return new Response(
        JSON.stringify({
            success: false,
            error: error && error?.message || 'Server error',
            errorCode: error && error?.errorCode || 'ERROR',
        }),
        { status: error && error?.statusCode || 500 }
    );
}
