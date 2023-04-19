import {User} from "../models/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {secretKey} from "../config/secretKey.js";

const generateAccessToken = (id) => {
    const payload = {
        id
    }

    return jwt.sign(payload, secretKey, {expiresIn: "24h"})
}
class authController {
    async registration(req, res) {
        try {
            const {name, email, password} = req.body
            const isUser = await User.findOne({email})

            if (isUser) {
                return res.status(400).json({message: 'user with this email address already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)

            await User.create({name, email, password: hashPassword})
            res.status(200).json({message: 'user create'})

        } catch (e) {
            res.status(400).json({message: 'registration error', ...e})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
             return res.status(400).json({message: 'user with this email not found'})
            }

            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
                return res.status(400).json({message: 'incorrect password'})
            }
            const token = generateAccessToken(user._id)

            return res.status(400).json({token})

        } catch (e) {
            res.status(400).json({message: 'login error'})
        }

    }

    async logout(req, res) {
        try {
            res.json('logout')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'logout error'})
        }
    }
}

export default new authController()