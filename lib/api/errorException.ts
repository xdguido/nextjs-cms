export class Exception extends Error {
    status: number;
    metaData: string;
    clientString: { [key: string]: string };

    constructor(code: ErrorCode, cause?: string | Error, metaData?: string) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.cause = process.env.NODE_ENV === 'production' ? null : cause;
        this.metaData = metaData;
        switch (code) {
            case ErrorCode.InvalidCredentials:
                this.status = 400;
                this.clientString = {
                    en: 'Invalid credentials',
                    es: 'Credenciales inválidas'
                };
                break;
            case ErrorCode.InvalidInput:
                this.status = 400;
                this.clientString = {
                    en: 'Invalid input',
                    es: 'Entrada inválida'
                };
                break;
            case ErrorCode.Duplicated:
                this.status = 400;
                this.clientString = {
                    en: 'Duplicated content',
                    es: 'Contenido duplicado'
                };
                break;
            case ErrorCode.Unauthenticated:
                this.status = 401;
                this.clientString = {
                    en: 'Unauthenticated, login required',
                    es: 'No autenticado, accesso requerido'
                };
                break;
            case ErrorCode.UnverifiedAccount:
                this.status = 401;
                this.clientString = {
                    en: 'Unverified account',
                    es: 'Cuenta no verificada'
                };
                break;
            case ErrorCode.Forbidden:
                this.status = 403;
                this.clientString = {
                    en: 'Access denied',
                    es: 'Accesso no permitido'
                };
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                this.clientString = {
                    en: 'Content Not found',
                    es: 'Contenido No encontrado'
                };
                break;
            case ErrorCode.RequestLimit:
                this.status = 429;
                this.clientString = {
                    en: 'Request limit exceeded, try again later',
                    es: 'Límite de solicitudes excedido, intenta mas tarde'
                };
                break;
            case ErrorCode.UnknownError:
                this.status = 500;
                this.clientString = {
                    en: 'Something went wrong',
                    es: 'Algo salio mal'
                };
                break;
            default:
                this.status = 500;
                this.clientString = {
                    en: 'Something went wrong',
                    es: 'Algo salio mal'
                };
                break;
        }
    }
}

export enum ErrorCode {
    // status 400-499
    Unauthenticated = 'Unauthenticated',
    Forbidden = 'Forbidden',
    Duplicated = 'Duplicated',
    UnverifiedAccount = 'UnverifiedAccount',
    InvalidCredentials = 'InvalidCredentials',
    InvalidInput = 'InvalidInput',
    InvalidEmail = 'InvalidEmail',
    RequestLimit = 'RequestLimit',
    NotFound = 'NotFound',

    // status 500-599
    UnknownError = 'UnknownError'
}
