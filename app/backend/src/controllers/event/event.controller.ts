import prisma from "../../config/db";

import type { Context } from "hono";


export const getEvents = async (c: Context) => {
    try {
        const events = await prisma.event.findMany();
        return c.json(events, 200);
    } catch (error) {
        console.error("Error fetching events:", error);
        return c.json({ message: "Internal server error" }, 500);
    }
}