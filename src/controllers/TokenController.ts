import { Request, Response } from "express";
import { tokenRepository } from "../repositories/tokenRepository";
import { loginRepository } from "../repositories/loginRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/errors";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export class TokenController{
    async create(req: Request, res: Response){
        const {loginId} = req.body

        const userExist = await loginRepository.findOneBy({id: loginId})
        if(!userExist)
            throw new BadRequestError("Usuário informado não existe")

        const token = await bcrypt.hash(jwt.sign({ id: loginId }, process.env.JWT_PWD ?? ''), 10)
        const data = tokenRepository.create({login: userExist, token, createdAt: new Date()})

        await tokenRepository.save(data)
        return res.status(201).json(data)
    }
    async findAll(req: Request, res: Response){
        let tokens = await tokenRepository.find({relations: {login: true}})

        console.log(tokens)
        return res.status(200).json(tokens)
    }


}