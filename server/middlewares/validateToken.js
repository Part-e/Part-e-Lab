import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => { 
    const { token } = req.cookies;
    
    if (!token) {
        const authHeader = req.headers.authorization;

        // Validar que el header contenga el token con formato Bearer
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Extraer el token del header
        token = authHeader.split(' ')[1];
    }
    
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({message: 'Invalid token'});

        req.user = user

        next();
    })
}