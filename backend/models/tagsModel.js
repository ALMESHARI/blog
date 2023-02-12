// this will store the tag names (catagories of blogs), which might be incrase

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        tagName: {
            type: String,
            required: true,
        }
    },

    { timestamps: true }
);

export default mongoose.model("tag", tagSchema);
