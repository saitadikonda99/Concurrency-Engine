import { Hono } from 'hono'
import handleLogin from '../controllers/auth.controller'

const auth = new Hono()

auth.post('/login', async (c) => {
  return handleLogin(c)
})

export default auth