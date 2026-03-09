import chalk from "chalk"
import cookieParser from "cookie-parser"
import "dotenv/config"
import express from "express"
import morgan from "morgan"
import { morganMiddleware, systemLogs } from "./utils/logger.js"


const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} 

app.use(express.json())
// INFO: extended: false means we can't pass nested obj.
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(morganMiddleware)

app.get("/api/v1/test", (req, res)=>{
    res.json({
        Hi: "Hey, Welcome to the Invoice Web App"
    })
})

const PORT = process.env.PORT || 1997

app.listen(PORT, ()=>{
    console.log(
        `${chalk.green.bold("✅")} 🚀 Server running in ${chalk.greenBright.bold(process.env.NODE_ENV)} mode on ${chalk.blueBright.bold(process.env.PORT)}`
    )
    systemLogs.info(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})