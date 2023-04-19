import express from 'express'
import mongoose from "mongoose";
import db from "./config/db.js";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from 'cors'
// import session from 'express-session'
// import passport from 'passport'
// import LocalStrategy from 'passport-local'
// import {User} from "./models/index.js";

const urlencodedParser = bodyParser.urlencoded({
    extended: false,
})
const app = express()
const PORT = process.env.PORT || 4000

app
    // .use(express.urlencoded({extended: false}))
    // .use(urlencodedParser)
    .use(express.json())
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

        app.get('/', (req, res) => {
            res.send('Hi')
        })

        app.post('/users', urlencodedParser, (req) => {
            console.log('req body: ', req.body)
        })
    } catch (e) {
        console.log(e)
    }
}
start()