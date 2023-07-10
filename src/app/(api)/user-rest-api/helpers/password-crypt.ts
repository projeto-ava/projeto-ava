import bcrypt from 'bcryptjs';
import { IUser, User } from '../models/user';

export async function getUserByEmail(email: string): Promise<IUser | null> {
    const user: IUser[] | null = await User.find({ email: email });
    return user && user.length ? user[0] : null;
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
};
