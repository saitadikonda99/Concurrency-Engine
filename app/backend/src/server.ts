import { Hono } from 'hono'
import authRoutes from './routes/auth.routes'
import verifyJWT from './middleware/verifyJWT'
import bookingRoutes from './routes/booking.routes'
import { cors } from 'hono/cors'
import eventRoutes from './routes/event.routes'

const app = new Hono()


app.use('*', cors({
  origin: 'http://localhost:3000',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.get('/', (c) => c.text('Thanks for visiting Concurrency Engine API'))
app.route('/auth', authRoutes)


app.route('/api/booking', bookingRoutes)
app.route('/api/events', eventRoutes)

// app.use('/api/*', verifyJWT)

export default app