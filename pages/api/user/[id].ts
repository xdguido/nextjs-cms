import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ErrorCode, Exception } from '../../../lib/api/errorException';
import errorHandler from '../../../lib/api/errorHandler';
import noMatchHandler from '../../../lib/api/noMatchHandler';

const router = createRouter<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();
router.get(async (req, res, next) => {
    try {
        const { query } = req;
        const userId = Number(query.id);
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            return res.status(200).json({ id: user.id, name: user.name });
        }
        throw new Exception(ErrorCode.NotFound);
    } catch (e) {
        if (e instanceof Exception) {
            return next();
        }
        throw new Error(e);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
