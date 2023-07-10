import mongoose from 'mongoose';

/**************
 * Interfaces *
 **************/
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface IUserCreateReq {
    name: string;
    email: string;
    password: string;
}

export type IUserDetail = Omit<IUser, 'password'>;

export interface IUserLoginReq {
    email: string;
    password: string;
}

export interface IUserLoginRes extends IUserDetail {
    accessToken: string;
}

export interface IUserDetailReq {
  userId: string;
}

export interface IUserSchema {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface IUserController {
    create: ({ name, email, password }: IUserCreateReq) => Promise<IUserDetail>;
    login: ({ email, password }: IUserLoginReq) => Promise<IUserLoginRes>;
    getUser: ({ userId }: IUserDetailReq) => Promise<IUserDetail>;
}

interface IUserDB extends IUserSchema {
    _id: string;
}

/**********
 * Schema *
 **********/
const UserSchema = new mongoose.Schema<IUserSchema>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: {
            type: Date,
            default: new Date(),
        },
    },
    {
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: function (doc: IUserDB, ret) {
                delete ret._id;
                ret.id = doc._id;
            },
        },
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (doc: IUserDB, ret) {
                delete ret._id;
                ret.id = doc._id;
            },
        },
    }
);

/*********
 * Model *
 *********/
export const User = (mongoose.models.User ? mongoose.model('User') : mongoose.model('User', UserSchema)) as mongoose.Model<IUserSchema>;;
