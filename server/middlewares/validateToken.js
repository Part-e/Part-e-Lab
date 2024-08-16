import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
// import { TOKEN_SECRET } from '../config.js';

dotenv.config();

export const authRequired = (req, res, next) => { 
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: 'No token, authorization denied'});
    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({message: 'Invalid token'});

        req.user = user

        next();
    })
}