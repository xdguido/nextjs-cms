import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorCode, Exception } from '../../lib/api/errorException';

export default function errorHandler(
    err: Exception | Error,
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (err instanceof Exception) {
        return res.status(err.status).send(err);
    }
    console.error(err);
    const errCause = err.toString();
    const unknownErr = new Exception(ErrorCode.UnknownError, errCause);
    return res.status(500).send(unknownErr);
}
