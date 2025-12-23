import primsa from '../../config/db'
import type { Context } from 'hono';

export const getEventBooking = async (c: Context) => {
    try {
        const eventId = c.req.param('id');

        const bookings = await primsa.event.findUnique({
            where: { id: eventId }
        });

        if (!bookings) {
            return c.json({ message: 'Event not found' }, 404);
        }

        console.log('Bookings:', bookings);

        return c.json(bookings, 200);
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}