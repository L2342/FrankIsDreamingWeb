import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    devlogId: { type: mongoose.Schema.Types.ObjectId, ref: "Devlog", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.plugin(paginate);

export default mongoose.model("Comment", commentSchema);
