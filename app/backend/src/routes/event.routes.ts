import { Hono } from "hono";
import { getEvents } from "../controllers/event/event.controller";

const event = new Hono();

event.get('/', async (c) => {
    return getEvents(c);
});

export default event;