import chalk from "chalk";
import mongoose from "mongoose";
import {systemLogs} from "../utils/logger.js"

async function connectionToDB (req, resizeBy, next){
    try{
        const connectionParam = {
            dbName: process.env.DB_NAME,
        }
        const connect = await mongoose.connect(
            process.env.MONGO_URI, 
            connectionParam,
        )
        console.log(`${chalk.blueBright.bold(`MongoDB Connected: ${connect.connection.host}`)}`)
        systemLogs.info(`MongoDB Connected: ${connect.connection.host}`)
    } catch(error){
        console.error(`${chalk.redBright.bold(`Error ${error.message}`)}`)
        process.exit(1)
    }
}


export default connectionToDB;