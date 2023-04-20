import {Schema} from "mongoose";

export const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        minLength: 4,
        maxLength: 30,
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minLength: 9,
        maxLength: 14
    },
    announcements: [{
        type: Schema.Types.ObjectId, ref: 'Announcement'
    }],
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
})