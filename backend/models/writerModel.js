import mongoose from "mongoose";

const Schema = mongoose.Schema;

const writerSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required:true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required:true
        },
        status: {
            type: String,
            default:"active"
        },
        points: {
            type: Number,
            default:0
        }
        
    },

    { timestamps: true }
);

export default mongoose.model("writer", writerSchema);
