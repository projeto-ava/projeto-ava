import { UserAuthenticationError, UserNotFoundError, UserValidationError } from '../models/errors';
import { IUser, IUserController, IUserCreateReq, IUserDetail, IUserDetailReq, IUserLoginReq, IUserLoginRes, User } from '../models/user';
import { generateToken } from '../../helpers/auth';
import { comparePassword, getUserByEmail, hashPassword } from '../helpers/password-crypt';

/***************
 * Controllers *
 ***************/
export const UserController: IUserController = {
    create: async ({ name, email, password }: IUserCreateReq): Promise<IUserDetail> => {
        const emailIsInUse: IUser | null = await getUserByEmail(email);
        if (emailIsInUse) throw new UserValidationError('Email already in use');

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
        const user: IUser | null = await getUserByEmail(email);
        if (!user) throw new UserNotFoundError();

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new UserAuthenticationError();

        const token: string = generateToken(user.id, user.email);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            accessToken: token,
        };
    },

    getUser: async ({ userId }: IUserDetailReq): Promise<IUserDetail> => {
        if (!userId) throw new UserValidationError('Invalid data');

        const user: IUser | null = await User.findById(userId);
        if (!user) throw new UserNotFoundError();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    },
};
