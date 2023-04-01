// in this project we will use ES6 statments to import the modules
// for more check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import Express from "express";
import blogsRoute from "./routes/blogsRoute.js";
import writersRoute from "./routes/writerRoute.js";
import imageRoute from "./routes/imageRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

//express server
const server = Express();
server.use(Express.json());

// mongoDB databese connection - listen to the port
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
        console.log(
            `Database is connected\nlistening to port:${process.env.PORT}`
        );
        server.listen(process.env.PORT);
    })
    .catch((err) => console.log(err));

//global middleware
server.use((req, res, next) => {
    //display the logs
    console.log(req.path, req.method);
    next();
});

//routes
server.use("/api/blogs", blogsRoute);
server.use("/api/writers", writersRoute);
server.use("/api/images", imageRoute);





//main route
server.get("/", (req, res) => {
    res.json({ message: "welcome to blog system" });
});
