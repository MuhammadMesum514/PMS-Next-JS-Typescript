/**
 * @desc Register api
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email 
 * @param {string} password
 * @returns {object} user 
 * */ 

import {NextApiRequest,NextApiResponse} from 'next';
import { hashPassword,createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import {serialize} from 'cookie';
export default async function register(req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'})
        return;
    }
    else{ 
        const {firstName, lastName, email, password} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await db.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }
    })
    const token = await createJWT(newUser);
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
         path: "/",
        maxAge: 60 * 60 * 24 * 7,
    }))

    res.status(201).json({message: 'User created successfully', user: newUser});
    // res.json({});
}
}