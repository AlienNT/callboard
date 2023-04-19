import {model} from "mongoose";
import {UserSchema} from "../schemas/userSchema.js";
import {AnnouncementSchema} from "../schemas/announcementSchema.js";
import {CommentSchema} from "../schemas/commentSchema.js";

export const User = model('User', UserSchema);
export const Announcement = model('Announcement', AnnouncementSchema);
export const Comment = model('Comment', CommentSchema);
