import mongoose from 'mongoose';
import { CustomError } from '../models/errors';
import { IUser, IUserCreateReq, IUserInfo, IUserLoginReq, IUserLoginRes, User } from '../models/user';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

/**************
 * Interfaces *
 **************/
interface IUserController {
    create: ({ name, email, password }: IUserCreateReq) => Promise<IUserInfo>;
    login: ({ email, password }: IUserLoginReq) => Promise<IUserLoginRes>;
}

/*****************
 * Custom errors *
 *****************/
export class UserValidationError extends CustomError {
    constructor(message: string) {
        super({ errorCode: 'VALIDATION_ERROR', statusCode: 400, message });
    }
}

class UserAuthenticationError extends CustomError {
    constructor() {
        super({ errorCode: 'AUTHENTICATION_ERROR', statusCode: 401, message: 'Invalid credentials' });
    }
}

class UserNotFoundError extends CustomError {
    constructor() {
        super({ errorCode: 'USER_NOT_FOUND_ERROR', statusCode: 404, message: 'User not found' });
    }
}

/********************
 * Helper functions *
 ********************/
async function emailInUseCheck(email: string): Promise<boolean> {
    const user: IUser[] | null = await User.find({ email: email });
    return !!user.length;
}

/***************
 * Controllers *
 ***************/
export const UserController: IUserController = {
    create: async ({ name, email, password }: IUserCreateReq): Promise<IUserInfo> => {
        const emailInUseCheckResult: boolean = await emailInUseCheck(email);
        if (emailInUseCheckResult) throw new UserValidationError('Email already in use');

        const passwordCrypt = await hashPassword(password);

        const user = await User.create({ name, email, password: passwordCrypt });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    },

    login: async ({ email, password }: IUserLoginReq): Promise<IUserLoginRes> => {
        const user: IUser[] | null = await User.find({ email });
        if (!user || !user.length) throw new UserNotFoundError();

        const isMatch = await comparePassword(password, user[0].password);
        if (!isMatch) throw new UserAuthenticationError();

        const token: string = generateToken(user[0].id);

        return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            createdAt: user[0].createdAt,
            accessToken: token,
        };
    },
};
