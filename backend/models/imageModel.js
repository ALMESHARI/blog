import mongoose from "mongoose";

const Schema = mongoose.Schema;
const imageSchema = new Schema({
    original: {
        data: Buffer,
        contentType: String,
    },
    medium: {
        data: Buffer,
        contentType: String,
        require: false,
    },
    low: {
        data: Buffer,
        contentType: String,
        require: false,
    },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;