import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import handlebars from "handlebars";
import "dotenv/config"
import {Response} from "express"
import { ApiError, BadRequestError } from "../../helpers/errors";


const sendEmail = async (res: Response, email: string, subject: string, payload: any, template: any) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };


    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return res.status(400).send({erro:error.message})
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });

};

/*
sendEmail(
    res,
    "youremail@gmail.com,
    "Email subject",
    { name: "John", link: "front-end link" },
    "./handlebars/layouts/main.handlebars"
);
*/

export default sendEmail;