import { Hono } from "hono";
import { getEventBooking } from "../controllers/booking/booking.controller";

const booking = new Hono();

booking.get('/:id/seats', async (c) => {
    return getEventBooking(c);
});

export default booking;