import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        mainImage: {
            type: String,
            required: false,
        },
        body: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "under review"
        },
        tag: {
            type: String,
            required: false,
        },
        publishDate: {
            type: Date,
            required: false,
        },
        writerID: {
            type: String,
            required: true,
        },
        minutes: {
            type: Number,
            required:true
        }
    },

    { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
