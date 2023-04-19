import {Schema} from "mongoose";

export const AnnouncementSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: false,
        maxLength: 600
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
})