import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from '../config/db';
import { z } from 'zod'
import type { Context } from 'hono'
import type { User, UserResponse, LoginResponse } from '../types/user.types'
import "bun:dotenv";

const ACCESS_TOKEN_SECRET = Bun.env.JWT_SECRET || 'adnaodnojnoandjkoa';;
const REFRESH_TOKEN_SECRET = Bun.env.REFRESH_TOKEN_SECRET || 'adadjiandijnao234k3p-ok#';

const authenticate = async (username: string, password: string) => {
    try {
        const user: User = await mysql`SELECT * FROM users WHERE username = ${username}`.then(res => res[0]);
        
        if (!user) {
            return null;
        }

        const passwordMatch = await bcryptCompare(password, user.password);
        
        if (!passwordMatch) {
            return null;
        }

        return user;

    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

const bcryptCompare = (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res as boolean);
        });
    });
}

const handleLogin = async (c: any) => {
    try {
        const body = await c.req.json();
        const { username, password } = body;

        if (!username || !password) {
            return c.json({ message: 'Username and password are required' }, 400);
        }

        const authenticatedUser: User | null = await authenticate(username, password);

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

        await mysql`UPDATE users SET refresh_token = ${refreshToken} WHERE id = ${authenticatedUser.id}`;

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