import {Schema, model} from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image : {type: String, default: 'default-profile.png'},
    role: {type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer'},
    createdAt: {type: Date, default: Date.now},
})

userSchema.plugin(moongosePaginate);

const User = model("User", userSchema, "users");

export default User;