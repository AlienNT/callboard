import {Router} from "express";
import authController from "../controllers/_authController.js";
import userController from "../controllers/_userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
    .post('/registration', authController.registration)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .get('/users', authMiddleware, userController.getUsers)
    .get('/user/:id', authMiddleware, userController.getUserById)
export default router