import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const devlogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    images: [{type: String}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

devlogSchema.plugin(mongoosePaginate);

const Devlog = model("Devlog", devlogSchema, "devlogs");

export default Devlog;