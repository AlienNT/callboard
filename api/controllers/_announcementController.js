import {Announcement} from "../models/index.js";
import {decryptTokenData} from "./_authController.js";

const announcementData = (payload) => {
    const {title, description, image, price} = payload

    return {title, description, image, price}
}

class announcementController {
    async create(req, res) {
        try {
            const data = announcementData(req.body)
            const decryptToken = await decryptTokenData(req)
            const announcement = await Announcement.create({...data, author: decryptToken.id})

            if (announcement) return res.status(200).json({data: announcement})

        } catch (e) {
            return res.status(400).json({message: 'create error', ...e})
        }
    }

    async update(req, res) {
        try {
            const data = announcementData(req.body)
            const decryptToken = decryptTokenData(req)

            const announcement = await Announcement.findOneAndUpdate(
                {_id: req.params.id, author: decryptToken.id},
                {...data},
                {returnDocument: "after"}
            )
            if (announcement) {
                return res.status(200).json({
                    data: await announcement.populate('author', ['name', 'email', 'phone'])
                })
            }
            return res.status(404).json({message: 'update error. Not found'})
        } catch (e) {
            res.status(400).json({message: 'update error', ...e})
        }
    }

    async get(req, res) {
        try {
            const {id} = req.params
            const announcement = await Announcement.findById(id).populate('author', ['name', 'email', 'phone'])

            res.status(200).json({data: announcement})
        } catch (e) {
            res.status(400).json({message: 'get error', ...e})
        }
    }

    async getAll(req, res) {
        try {
            const query = req?.query;
            const page = query?.page || 1
            const limit = query?.limit || 8
            const sortField = query?.sortField || 'updated_at'
            const sortMode = query?.sortMode || 'desc'
            const sortFilter = {}

            sortFilter[`${sortField}`] = sortMode

            const announcements = await Announcement
                .find()
                .sort(sortFilter)
                .limit(limit)
                .skip((page - 1) * limit)
                .populate('author', ['name', 'email', 'phone'])
            const count = await Announcement.estimatedDocumentCount()
            const pages = Math.ceil(count / limit)
            const nextPage = +page < +pages ? +page + 1 : null

            if (announcements) {
                return res
                    .status(200)
                    .json({data: announcements, pages: {page, nextPage, pages}})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'get error', ...e})
        }
    }

    async getByAuthorId(req, res) {
        try {
            const decryptToken = decryptTokenData(req)

            const announcement = await Announcement.find({author: decryptToken.id}).populate('author', ['name', 'email', 'phone'])
            if (announcement) {
                return res.status(200).json({
                    data: announcement
                })
            }
            return res.status(404).json({message: 'get error. Not found'})
        } catch (e) {
            res.status(400).json({message: 'get error', ...e})
        }
    }

    async delete(req, res) {
        try {
            const decryptToken = await decryptTokenData(req)

            const announcement = await Announcement.deleteOne(
                {_id: req.params.id, author: decryptToken.id}
            )
            if (announcement) {
                return res.status(200).json({
                    data: {_id: req.params.id}
                })
            }
            return res.status(404).json({message: 'delete error. Not found'})
        } catch (e) {
            res.status(400).json({message: 'delete error', ...e})
        }
    }
}

export default new announcementController()