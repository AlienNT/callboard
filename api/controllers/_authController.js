import {User} from "../models/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {secretKey} from "../config/secretKey.js";

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, secretKey, {expiresIn: "24h"})
}
export const decryptAccessToken = (token) => {
    return jwt.verify(token, secretKey)
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

            const user = await User.create({name, email, password: hashPassword})
            res.status(200).json({
                user: publicUserData(user),
                token: generateAccessToken(user._id)
            })

        } catch (e) {
            res.status(400).json({message: 'registration error', ...e})
        }
    }

    async login(req, res) {
        try {
            console.log('req body', req.body)
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'user with this email not found'})
            }

            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
                return res.status(400).json({message: 'incorrect password'})
            }

            return res.status(200).json({
                token: generateAccessToken(user._id),
                user: publicUserData(user)
            })

        } catch (e) {
            res.status(400).json({message: 'login error'})
        }

    }
    async getAuthUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const {id} = decryptAccessToken(token)

            if (token) {
                const user = await User.findById(id)

                return res.status(200).json({
                    token: token,
                    user: publicUserData(user)
                })

            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'logout error'})
        }
    }
}

export function publicUserData(user) {
    return {
        id: user._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone
    }
}

export default new authController()