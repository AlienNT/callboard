import express from 'express'
import mongoose from "mongoose";
import db from "./config/db.js";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
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
    .use(express.urlencoded({extended: false}))
    .use(express.json())
    .use('/api', routes)
// .use(session({
//     secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {maxAge: 60 * 60 * 24 * 7 * 1000}
// }))
// .use(passport.session())
// .use(passport.initialize())

// passport.use(new LocalStrategy(function verify(email, password, done) {
//         User.findOne({email: email}, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false)
//             }
//             crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',
//                 (err, hashedPassword) => {
//                     if (err) {
//                         return done(err);
//                     }
//                     if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//                         return done(null, false, {message: 'Incorrect username or password.'});
//                     }
//                     return done(null, user)
//                 })
//         })
//     }
// ))

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