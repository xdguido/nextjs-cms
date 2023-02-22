export class Exception extends Error {
    status: number;
    metaData: string;

    constructor(code: string, metaData?: string, cause?: string | Error) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.cause = cause;
        this.metaData = metaData;
        switch (code) {
            case ErrorCode.InvalidCredentials:
                this.status = 400;
                break;
            case ErrorCode.InvalidInput:
                this.status = 400;
                break;
            case ErrorCode.Duplicated:
                this.status = 400;
                break;
            case ErrorCode.Unauthenticated:
                this.status = 401;
                break;
            case ErrorCode.UnverifiedAccount:
                this.status = 401;
                break;
            case ErrorCode.Forbidden:
                this.status = 403;
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                break;
            case ErrorCode.RequestLimit:
                this.status = 429;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}

export class ErrorCode {
    // status 400-499

    static Unauthenticated = 'Unauthenticated';

    static Forbidden = 'Forbidden';

    static Duplicated = 'Duplicated';

    static UnverifiedAccount = 'UnverifiedAccount';

    static InvalidCredentials = 'InvalidCredentials';

    static InvalidInput = 'InvalidInput';

    static InvalidEmail = 'InvalidEmail';

    static RequestLimit = 'RequestLimit';

    static NotFound = 'NotFound';

    // status 500-599

    static UnknownError = 'UnknownError';
}
