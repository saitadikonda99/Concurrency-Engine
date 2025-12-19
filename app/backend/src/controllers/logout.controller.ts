import prisma from '../config/db';
import type { Context } from 'hono';

const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
    if (!cookieHeader) return {};
    return cookieHeader.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) cookies[name] = value;
        return cookies;
    }, {} as Record<string, string>);
};

const handleLogout = async (c: Context) => {
    try {
        const cookieHeader = c.req.header('Cookie');
        const cookies = parseCookies(cookieHeader);
        const refreshToken = cookies['jwt'];

        const isProduction = Bun.env.NODE_ENV === 'production';
        const secureCookie = isProduction ? 'Secure; ' : '';
        
        if (!refreshToken) {
            c.header('Set-Cookie', `jwt=; HttpOnly; ${secureCookie}SameSite=Strict; Path=/; Max-Age=0`);
            return c.json({ message: 'Logout successful' }, 200);
        }

        await prisma.users.updateMany({
            where: { refresh_token: refreshToken },
            data: { refresh_token: null },
        });

        c.header('Set-Cookie', `jwt=; HttpOnly; ${secureCookie}SameSite=Strict; Path=/; Max-Age=0`);

        console.log('User logged out successfully');
        return c.json({ message: 'Logout successful' }, 200);

    } catch (error) {
        console.error('Error during logout:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
};

export default handleLogout;