import { CustomError } from "../../models/errors";

export class UserValidationError extends CustomError {
    constructor(message: string) {
        super({ errorCode: 'VALIDATION_ERROR', statusCode: 400, message });
    }
}

export class UserAuthenticationError extends CustomError {
    constructor(message?: string) {
        super({ errorCode: 'AUTHENTICATION_ERROR', statusCode: 401, message: message || 'Invalid credentials' });
    }
}

export class UserNotFoundError extends CustomError {
    constructor() {
        super({ errorCode: 'USER_NOT_FOUND_ERROR', statusCode: 404, message: 'User not found' });
    }
}
