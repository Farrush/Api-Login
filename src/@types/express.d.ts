import { Login } from '../entities/Login'

declare global {
	namespace Express {
		export interface Request {
			login: Partial<Login>
		}
	}
}