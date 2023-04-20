import {Announcement} from "../models/index.js";
import {decryptAccessToken} from "./_authController.js";

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

     async update(res, req) {
         try {
             const data = announcementData(req.body)
             const decryptToken = await decryptAccessToken(req.headers.authorization.split(' ')[1])
             const user_id = decryptToken.id
             const announce = await Announcement.findOneAndUpdate({_id:data?._id, author: user_id}, data)
             if (announce) {

                 return res.status(200).json({data: announce})
             }
         } catch (e) {
             res.status(400).json({message: 'update error', ...e})
         }
     }

    async getAnnouncementById(req, res) {
        try {
            const {id} = req.params
            console.log(req.params)
            const data = await Announcement.findById(id).populate('author', ['name', 'email', 'phone'])
            console.log('data', data)

            res.status(200).json({data})
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

    async delete(req, res) {
        try {
            const decryptToken = await decryptAccessToken(req.headers.authorization.split(' ')[1])
        } catch (e) {

        }
    }
}

export default new announcementController()