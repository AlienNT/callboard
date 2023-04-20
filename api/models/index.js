import {model} from "mongoose";
import {UserSchema} from "../schemas/userSchema.js";
import {AnnouncementSchema} from "../schemas/announcementSchema.js";

export const User = model('User', UserSchema);
export const Announcement = model('Announcement', AnnouncementSchema);
