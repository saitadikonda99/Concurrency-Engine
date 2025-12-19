import { Hono } from "hono";
import type { UsersModel } from "../generated/prisma/models";
import type { Context } from "hono";
import bcrypt from "bcryptjs";  
import prisma from "../config/db";        
import "bun:dotenv"


const handleSignup = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { username, password, email, fullName } = body;

        console.log("Signup request body:", body);

        if (!username || !password || !email || !fullName) {
            return c.json({ message: 'All fields are required' }, 400);
        }

        const existingUser: UsersModel | null = await prisma.users.findUnique({ where: { username } });

        if (existingUser) {
            return c.json({ message: 'Username already exists' }, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
                email,
                fullName,
                role: 'user'
            }
        });

        return c.json({ message: 'User created successfully', userId: newUser.id }, 201);
    } catch (error) {
        console.error("Signup error:", error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}

export default handleSignup;