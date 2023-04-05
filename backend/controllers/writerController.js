import Writer from "../models/writerModel.js";
import mongoose from "mongoose";

// create a new writer
// async function createWriter(req, res) {
//     const { username, password, firstName, lastName, email } = req.body;
//     try {
//             const writer = await Writer.create({
//                 username,
//                 password,
//                 firstName,
//                 lastName,
//                 email,
//             });
//             res.status(200).json({mssg:"Writer successfully added"})
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// get writer
const getWriter = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.writerID)) {
            return res.status(404).json({
                error: "no such writer",
            });
        }
        const writer = await Writer.findOne({ _id: req.params.writerID });
        if (!writer) {
            return res.status(404).json({ error: "no such a writer" });
        } else {
            res.status(200).json(writer);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function createWriter(req, res) {
    const { username, password, firstName, lastName, email } = req.body;
    try {
        // check whether the username or the email is exists in DB
        const [reapetedUsername, reapetedEmail] = await Promise.all([
            Writer.findOne({ username: username }),
            Writer.findOne({ email: email }),
        ]);
        // if it is not reapeted then create the user
        if (reapetedUsername) {
            res.status(409).json({ error: "username already used" });
        } else if (reapetedEmail) {
            res.status(409).json({ error: "e-mail is already exists" });
        }
        // if not, add the writer to the database
        else {
            const writer = await Writer.create({
                username,
                password,
                firstName,
                lastName,
                email,
            });
            res.status(200).json(writer);
        }
    } catch (error) {
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
        // chekc if email or username dublicated
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
};
