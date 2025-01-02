import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { TokenController } from './controllers/TokenController'
import { authMiddleware } from './middlewares/authMiddleware'


const routes = Router()

routes.post('/usuario', new LoginController().create as any)
routes.post('/login', new LoginController().login as any)
routes.post('/login/changepass', new LoginController().requestPasswordChange as any)

routes.get('/token', new TokenController().findAll as any)
routes.post('/token', new TokenController().create as any)

routes.use(authMiddleware)
//Rotas que usam autenticação JWT
routes.get('/usuario/profile', new LoginController().getProfile as any)

export default routes