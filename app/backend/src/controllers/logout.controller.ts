import mysql from '../config/db';
import type { Context } from 'hono';

// Helper function to parse cookies from Cookie header
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

        if (!refreshToken) {
            // Already logged out or no token, still clear cookie
            c.header('Set-Cookie', `jwt=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
            return c.json({ message: 'Logout successful' }, 200);
        }

        await mysql`UPDATE users
            SET refresh_token = null
            WHERE refresh_token = ${refreshToken}`;

        // Clear the cookie on the client side
        c.header('Set-Cookie', `jwt=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);

        console.log('User logged out successfully');
        return c.json({ message: 'Logout successful' }, 200);

    } catch (error) {
        console.error('Error during logout:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
};

export default handleLogout;