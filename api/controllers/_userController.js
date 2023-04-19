import {User} from "../models/index.js";

class userController {
    async getUsers(req, res) {
        try {
            const users = await User.find({})

            if (!users.length) {
                return res.status(404).json({message: 'users not found'})
            }
            return res.status(200).json({data: users})

        } catch (e) {
            console.log(e)
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id

            if (!id) {
                return res.status(400).json({message: 'id is not correct'})
            }
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({message: 'user not found'})
            }
            return res.status(200).json({data: user})

        } catch (e) {
            console.log(e)
        }
    }
}

export default new userController()