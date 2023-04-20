import {Announcement, User} from "../models/index.js";
import {decryptAccessToken, publicUserData} from "./_authController.js";

const announcementData = (payload) => {
    return {
        title: payload?.title,
        description: payload?.description,
        image: payload?.image,
        price: payload?.price
    }
}

class announcementController {
    async createAnnouncement(req, res) {
        try {
            const data = announcementData(req.body)
            const decryptToken = await decryptAccessToken(req.headers.authorization.split(' ')[1])
            const user_id = decryptToken.id
            const announce = await Announcement.create({...data, author: user_id})

            if (announce) {
                return res.status(200).json({data: announce})
            }

        } catch (e) {
            return res.status(400).json({message: 'create error', ...e})
        }
        return res.json({...req.body})
    }

    /* async update(res, req) {
         try {

         } catch (e) {

         }
     }*/

    async getAnnouncementById(req, res) {
        try {
            const {_id} = req.body
            const user_id = decryptAccessToken(req.headers.authorization)
            const user = User.findById(user_id)
            const data = Announcement.findById(_id)

            res.status(200).json({data: {...data, user: publicUserData(user)}})
        } catch (e) {
            res.status(400).json({message: 'get error', ...e})
        }
    }

    async getAnnouncements(req, res) {
        console.log('res', res)
        try {
            const announcements = await Announcement.find().populate('author', ['name', 'email', 'phone'])
            if (announcements) {
                return res.status(200).json({data: announcements})
            }
        } catch (e) {
            res.status(400).json({message: 'get error', ...e})
        }
    }

    // async delete(req, res) {
    //     try {
    //
    //     } catch (e) {
    //
    //     }
    // }
}

export default new announcementController()