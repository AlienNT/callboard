import {User} from "../models/index.js";
import {publicUserData} from "./_authController.js";

class userController {

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
            return res.status(200).json({data: publicUserData(user)})

        } catch (e) {
            console.log(e)
        }
    }
}

export default new userController()