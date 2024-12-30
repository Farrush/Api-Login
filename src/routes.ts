import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/usuario', new LoginController().create as any)
routes.post('/login', new LoginController().login as any)

routes.use(authMiddleware)

routes.get('/usuario/profile', new LoginController().getProfile as any)

export default routes