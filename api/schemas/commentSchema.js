import {Schema} from "mongoose";

export const CommentSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    announcement_id: {
        type: String,
        required: true,
        ref: 'Announcement'
    },
    message: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 600,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean
    }
})