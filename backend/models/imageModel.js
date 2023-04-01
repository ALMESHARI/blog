import mongoose from "mongoose";

const Schema = mongoose.Schema;
const imageSchema = new Schema({
    data: Buffer,
    contentType: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;