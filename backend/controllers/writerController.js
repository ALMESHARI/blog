import Writer from "../models/writerModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validtor from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // the user authentication will be expired after 1 day
    });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ error: "please fill all the fields" });
        }
        const writer = await Writer.findOne({ username });
        if (!writer) {
            return res.status(404).json({ error: "username is not correct" });
        }
        const isMatch = await bcrypt.compare(password, writer.password);
        if (!isMatch) {
            return res.status(404).json({ error: "password is not correct" });
        }
        const token = createToken(writer._id);
        return res.status(200).json({ writer, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}




// get writer
const getWriter = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.writerID)) {
            return res.status(404).json({
                error: "no such writer",
            });
        }
        const writer = await Writer.findOne({ _id: req.params.writerID },{password:0});
        if (!writer) {
            return res.status(404).json({ error: "no such a writer" });
        } else {
            res.status(200).json(writer);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// sign up writer
const createWriter = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        // check if all required data are filled
        if (!data.username || !data.password || !data.firstName || !data.lastName || !data.email) {
            return res.status(400).json({ error: "please fill all the fields" });
        }
        // check if the email is valid
        if (!validtor.isEmail(data.email)) {
            return res.status(400).json({ error: "please enter a valid email" });
        }
        // check if the password is strong
        if (!validtor.isStrongPassword(data.password)) {
            return res.status(400).json({ error: "please enter a strong password" });
        }
        // check whether the username or the email is exists in DB
        const [reapetedUsername, reapetedEmail] = await Promise.all([
            Writer.findOne({ username: data.username }),
            Writer.findOne({ email: data.email }),
        ]);
        // if it is not reapeted then create the user
        if (reapetedUsername) {
            res.status(409).json({ error: "username already used" });
        } else if (reapetedEmail) {
            res.status(409).json({ error: "e-mail is already exists" });
        }
        // if not, add the writer to the database
        else {
            // hash the password
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            // create the writer
            const writer = await Writer.create(
                data);
            // remove password from the response
            const { password, ...writerNoPassowrd } = writer._doc;
            console.log(writerNoPassowrd)
            // create the token
            const token = createToken(writer._id);
            res.status(200).json({ writer:writerNoPassowrd, token });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

// return the famous writers
const returnTopWriters = async (req, res) => {
    // inorder to make sure to return only the users who write at least one blog
    // find those with points greater than 0
    const writers = await Writer.find({ points: { $gt: 0 } }).sort({
        points: -1,
    });
    if (!writers) {
        res.status(404).json({ error: "There is no writers yet" });
    }
    res.status(200).json(writers);
};

// delete writer
const deleteWriter = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.writerID)) {
            return res.status(404).json({
                error: "no such writer",
            });
        }
        const writer = await Writer.findOneAndDelete({
            _id: req.params.writerID,
        });
        if (!writer) {
            return res.status(404).json({ error: "no such a writer" });
        }
        res.status(200).json(writer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update writer
const updateWriter = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.writerID)) {
            return res.status(404).json({
                error: "no such writer",
            });
        }
        // check if email or username is dublicated
        const [reapetedUsername, reapetedEmail] = await Promise.all([
            Writer.findOne({
                username: username,
                writerID: { $ne: req.params.writerID },
            }),
            Writer.findOne({
                email: email,
                writerID: { $ne: req.params.writerID },
            }),
        ]);
        // if it is not reapeted then create the user
        if (reapetedUsername) {
            return res.status(409).json({ error: "username already used" });
        } else if (reapetedEmail) {
            return res.status(409).json({ error: "e-mail is already exists" });
        }

        const writer = await Writer.findOneAndUpdate(
            { _id: req.params.writerID },
            { ...req.body }
        );
        if (!writer) {
            return res.status(404).json({ error: "no such a writer" });
        }
        res.status(200).json(writer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createWriter,
    returnTopWriters,
    getWriter,
    updateWriter,
        deleteWriter,
        login
};
