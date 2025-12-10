import jwt from 'jsonwebtoken';
import mysql from '../config/db';
import type { Context } from 'hono';
import type { User } from '../types/user.types';
import "bun:dotenv";

const ACCESS_TOKEN_SECRET = Bun.env.JWT_SECRET || 'adnaodnojnoandjkoa';
const REFRESH_TOKEN_SECRET = Bun.env.REFRESH_TOKEN_SECRET || 'adadjiandijnao234k3p-ok#';

// Helper function to parse cookies from Cookie header
const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
    if (!cookieHeader) return {};
    return cookieHeader.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) cookies[name] = value;
        return cookies;
    }, {} as Record<string, string>);
};

const handleRefresh = async (c: Context) => {
    try {
        const cookieHeader = c.req.header('Cookie');
        const cookies = parseCookies(cookieHeader);
        const refreshToken = cookies['jwt'];

        if (!refreshToken) {
            return c.json({ message: 'No refresh token provided' }, 401);
        }

        let decoded: { id: number };
        try {
            decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: number };
        } catch (err) {
            return c.json({ message: 'Invalid or expired refresh token' }, 403);
        }

        const dbUser: User | undefined = await mysql`SELECT * FROM users WHERE id = ${decoded.id} AND refresh_token = ${refreshToken}`.then(res => res[0]);

        if (!dbUser) {
            return c.json({ message: 'Invalid refresh token' }, 403);
        }

        const newAccessToken = jwt.sign(
            { id: dbUser.id, username: dbUser.username, role: dbUser.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        c.header('Set-Cookie', `jwt=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`);

        return c.json({ token: newAccessToken }, 200);
    } catch (error) {
        console.error('Error during token refresh:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
};

export default handleRefresh;