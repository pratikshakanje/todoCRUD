const express = require("express");

const router = express.Router()


const todoController = require("../controllers/todoController.js")

//fetch all data
router.get("/", todoController.sendTodos)

//fetch single todo
router.get("/:id", todoController.sendTodoById)

//create
router.post("/", todoController.createTodo)

//update
router.patch("/:id", todoController.updateTodo)


//delete
router.delete("/:id", todoController.deleteTodo)

module.exports = router