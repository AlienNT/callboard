import {Router} from "express";
import authController from "../controllers/_authController.js";
import userController from "../controllers/_userController.js";
import announcementController from "../controllers/_announcementController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
    /**
     * auth
     */
    .post('/registration', authController.registration)
    .post('/login', authController.login)
    .get('/auth-user', authController.getAuthUser)
    /**
     * users
     */
    .get('/users', authMiddleware, userController.getUsers)
    .get('/user/:id', authMiddleware, userController.getUserById)
/**
 *
 */
    .get('/announcements', announcementController.getAnnouncements)
    .get('/announcements/:id', announcementController.getAnnouncementById)
    .post('/announcements', authMiddleware, announcementController.createAnnouncement)
export default router