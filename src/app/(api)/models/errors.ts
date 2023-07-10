export interface ICustomErrorDetail {
    message: string;
    errorCode: string;
    statusCode: number;
}

export abstract class CustomError extends Error {
    errorCode: string;
    statusCode: number;

    constructor({ errorCode, statusCode, message }: ICustomErrorDetail) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}
