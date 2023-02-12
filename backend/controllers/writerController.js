import Writer from "../models/writerModel.js";


// create a new writer 
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
            res.json(writer);
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export { createWriter }