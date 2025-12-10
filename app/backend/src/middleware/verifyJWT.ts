import jwt from 'jsonwebtoken';
import type { Context, Next } from 'hono';
import "bun:dotenv";

const ACCESS_TOKEN_SECRET: string = Bun.env.JWT_SECRET || 'adnaodnojnoandjkoa';

interface JWTPayload {
    id: number;
    username: string;
    role: string;
}

export const verifyJWT = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }

    const token = authHeader.substring(7); 

    if (!token) {
        return c.json({ error: 'Missing token' }, 401);
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as unknown as JWTPayload;
        
        c.set('user', decoded);
        c.set('role', decoded.role);
        
        await next();
    } catch (err) {
        return c.json({ error: 'Invalid or expired token' }, 403);
    }
};

export default verifyJWT;

