require("dotenv").config({ path: `${process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"}` })
const mongoose = require("mongoose");
const express = require("express");
//const userRouter = require("./Routes/user");
const todosRouter = require("./Routes/todos");
const authRouter = require("./Routes/auth");
const { logger } = require("./middleware");

const app = express();

//Middleware
app.use(express.json());
//app.use(logger);

//app.use("/users", userRouter);
app.use("/todos", todosRouter);
app.use("/auth" , authRouter);
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });

