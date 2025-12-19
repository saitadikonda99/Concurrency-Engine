import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/db';
import type { Context } from 'hono'
import type { UsersModel } from '../generated/prisma/models/Users';
import type { LoginResponse } from '../types/user.types'
import "bun:dotenv";

const ACCESS_TOKEN_SECRET = Bun.env.JWT_SECRET || 'adnaodnojnoandjkoa';
const REFRESH_TOKEN_SECRET = Bun.env.REFRESH_TOKEN_SECRET || 'adadjiandijnao234k3p-ok#';

const authenticate = async (username: string, password: string): Promise<UsersModel | null> => {
    try {
        const user = await prisma.users.findUnique({ where: { username } });

        if (!user) {
            return null;
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

const handleLogin = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { username, password } = body;

        console.log('Received body:', body);
        console.log('Login attempt for username:', username);

        if (!username || !password) {
            return c.json({ message: 'Username and password are required' }, 400);
        }

        const authenticatedUser: UsersModel | null = await authenticate(username, password);

        console.log('Authenticated User:', authenticatedUser);

        if (authenticatedUser === null) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }

        const token = jwt.sign(
            { id: authenticatedUser.id, username: authenticatedUser.username, role: authenticatedUser.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        const refreshToken = jwt.sign(
            { id: authenticatedUser.id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d', algorithm: 'HS256' }
        );

        await prisma.users.update({
            where: { id: authenticatedUser.id },
            data: { refresh_token: refreshToken },
        });

        const isProduction = Bun.env.NODE_ENV === 'production';
        const secureCookie = isProduction ? 'Secure; ' : '';
        c.header('Set-Cookie', `jwt=${refreshToken}; HttpOnly; ${secureCookie}SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`);

        const response: LoginResponse = {
            token,
            refreshToken,
            user: {
                id: authenticatedUser.id,
                username: authenticatedUser.username,
                role: authenticatedUser.role
            }
        }

        return c.json(response, 200)
    }
    catch (error: any) {
        console.error('Error during authentication:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}

export default handleLogin;