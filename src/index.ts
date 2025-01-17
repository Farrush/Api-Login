import "express-async-errors"
import express from "express"
import {AppDataSource} from './data-source'
import { errorMiddleware } from "./middlewares/error"
import cors from "cors"
import routes from "./routes"

AppDataSource.initialize().then(()=>{
    const app = express()

    app.use(express.json())
    app.use(routes)
    app.use(cors())

    app.use(errorMiddleware as any)

    return app.listen(process.env.PORT)
})