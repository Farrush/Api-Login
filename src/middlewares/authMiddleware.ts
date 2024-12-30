import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/errors";
import jwt from "jsonwebtoken"
import { loginRepository } from "../repositories/loginRepository";
type JwtPayload = {id: number}

export const authMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers

    if(!authorization)
        throw new UnauthorizedError("Não Autorizado")

    // Bearer Token$GDFSGSgdfgsd
    const token = authorization.split(" ")[1] //Separa 'Bearer' do Token

    const {id} = jwt.verify(token, process.env.JWT_PWD ?? '') as JwtPayload
    
    const user = await loginRepository.findOneBy({id})
    //Verifica se existe um usuário com o ID obtido pelo token JWT
    if(!user)
        throw new UnauthorizedError("Não Autorizado")

    const {pass: _, ...profile} = user
    req.login = profile

    next()
}