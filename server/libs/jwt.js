import { TOKEN_SECRET } from "../config.js"
// import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

// dotenv.config();

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" } ,
            (err,token) => {
                if(err) reject(err)
                resolve(token)
            }
        );
    });
}