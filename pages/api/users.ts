import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import errorHandler from '../../lib/api/errorHandler';
import noMatchHandler from '../../lib/api/noMatchHandler';

const router = createRouter<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();
router.get(async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (e) {
        throw new Error(e);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
