import { Request, Response } from "express";
import { loginRepository } from "../repositories/loginRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/errors";
import sendEmail from "../utils/email/mailer";
import * as crypto from 'crypto';
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { tokenRepository } from "../repositories/tokenRepository";
import { Token } from "../entities/Token";

export class LoginController{

    async create(req: Request, res: Response){
        const {name, email, pass} = req.body

        const registeredEmail = await loginRepository.findOneBy({email})
        if(registeredEmail)
            throw new BadRequestError("Email já existe")

        const encryptedPwd = await bcrypt.hash(pass, 10)

        const loginData = loginRepository.create({name, email, pass: encryptedPwd})

        await loginRepository.save(loginData)
        const token = jwt.sign({ id: loginData.id }, process.env.JWT_PWD ?? '')

        const {pass: _,...respLogin} = loginData //Remove a senha da resposta do endpoint
        
        return res.status(201).json(respLogin)
    }
    async login(req: Request, res: Response){
        const {email, pass} = req.body

        const user = await loginRepository.findOneBy({email})
        if(!user)
            throw new BadRequestError("Email ou senha inválidos")

        const verifyPass = await bcrypt.compare(pass, user.pass)

        if (!verifyPass) {
			throw new UnauthorizedError('E-mail ou senha inválidos')
		}

        const token = jwt.sign({ id: user.id }, process.env.JWT_PWD ?? '')
        const { pass: _, ...userLogin } = user

		return res.status(202).json({
			user: userLogin,
			token: token,
		})
    }

    async getProfile(req: Request, res: Response){ 

        return res.status(200).json(req.login)

    }

    async requestPasswordChange(req: Request, res: Response){
        const {email} = req.body

        const user = await loginRepository.findOneBy({email})

        if(!user)
            throw new BadRequestError("Email inserido não está cadastrado")

        const token = await tokenRepository.findOneBy({login: user})

        if (token) 
            await tokenRepository.delete(token)
        
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);

        const newToken = tokenRepository.create({token: hash, login: user, createdAt: new Date()})
        await tokenRepository.save(newToken)

        const link = `localhost:4200/passwordReset?token=${resetToken}&id=${user.id}`
        
        sendEmail(res, user.email,"Password Reset Request",{name: user.name, link: link,},"./handlebars/requestReset.handlebars");
        

    }
}