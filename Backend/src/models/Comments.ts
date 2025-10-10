import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const commentSchema = new Schema({
    devlogId: {type: Schema.Types.ObjectId, ref: 'Devlog', required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

commentSchema.plugin(mongoosePaginate);

const Comment = model("Comment", commentSchema, "comments");

export default Comment;
