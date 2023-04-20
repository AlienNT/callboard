import express from 'express'
import mongoose from "mongoose";
import db from "./config/db.js";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from 'cors'


const app = express()
const PORT = process.env.PORT || 4000

app
    .use(bodyParser.json({limit: "10mb"}))
    .use(bodyParser.urlencoded({extended: true, limit: '10mb'}))
    .use(cors())
    .use('/api', routes)


const start = async () => {
    try {
        await mongoose.connect(
            db.url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: false
            })

        app.listen(PORT, () => {
            console.log('server started in', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
start()