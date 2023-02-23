import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { query, method } = req;
        const userId = Number(query.id);
        switch (method) {
            case 'GET':
                // Get data from your database
                const user = await prisma.user.findUnique({ where: { id: userId } });
                res.status(200).json({ id: user.id, name: user.name });
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500);
    } finally {
        await prisma.$disconnect();
    }
}
