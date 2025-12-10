import { Hono } from 'hono'
import handleLogin from '../controllers/auth.controller'
import handleLogout from '../controllers/logout.controller'
import handleRefresh from '../controllers/auth.refresh.controller.ts'

const auth = new Hono()

auth.post('/login', async (c) => {
  return handleLogin(c)
})

auth.post('/logout', async (c) => {
  return handleLogout(c)
})

auth.post('/refresh', async (c) => {
  return handleRefresh(c)
})

export default auth