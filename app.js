const cl = console.log;

const express = require("express")

const router = require("./routers/todoRouters")

const app = express();

app.use(express.json())

app.use("/controllersapi/todo", router)

module.exports = app