import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;
        cookies().delete(email)
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}