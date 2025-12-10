import { Hono } from 'hono'
import mysql from './config/db'

const app = new Hono()

app.get('/', (c) => c.text('Hello Bun!'))

// testing
await mysql`SELECT 1`.then((result) => {
  console.log('Database connected:', result)
}).catch((error) => {
  console.error('Database connection error:', error)
})

export default app