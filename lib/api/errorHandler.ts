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
    return res.status(400).send({
        name: ErrorCode.UnknownError,
        status: 400,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}
