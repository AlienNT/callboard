import jwt from "jsonwebtoken"
import {secretKey} from "../config/secretKey.js";

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log('token', token)
        if (!token) {
            return res.status(403).json({message: "user unauthorized"})
        }
        req.user = jwt.verify(token, secretKey)
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "user unauthorized"})
    }
}