import { AppDataSource } from "../data-source";
import { Login } from "../entities/Login";

export const loginRepository = AppDataSource.getRepository(Login)