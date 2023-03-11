/**
 * @desc login api
 * @param {string} email
 * @param {string} password
 * @returns {object} user
 *  
 * */ 
 
import {NextApiRequest,NextApiResponse} from 'next';
import { comparePassword,createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import {serialize} from 'cookie';

export default async function login(req:NextApiRequest,res:NextApiResponse) {
    console.log("req.body", req.body);
    
    if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }

    const isUser = await comparePassword(req.body.password, user.password);

    if (isUser) {
      const token = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
     
        res.status(201).json({message: 'LoggedIn Successfully', user: user});
    // res.json({});
    } else {
      res.status(401).json({ error: "Invalid login" });
    }
  } else {
    res.status(402);
  res.json({});
  }
    
}