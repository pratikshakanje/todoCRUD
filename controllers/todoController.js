const todos = require("../data/todo.js")

//fetch all data
const sendTodos = (req, res) =>{
    try{
        res.status(200).json({
            success: true,
            body: todos,
            message: "Todo fetched successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
}

//fetch single data
const sendTodoById = (req, res) => {
    try{
        const id = req.params.id;

        const todo = todos.find(t => t.id === id)

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        res.status(200).json({
            success: true,
            body: todo,
            message: "Todo fetched successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
}

//create data
const createTodo = (req, res) => {
    try{
        let newTodo = {
            id: Date.now().toString(),
            todoItem: req.body.todoItem,
        }

        todos.push(newTodo)

        res.status(201).json({
            success: true,
            body: newTodo,
            message: "Todo created successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
}


//update
const updateTodo = (req, res) => {
    try{
        const id = req.params.id;
        let todo = todos.find(t => t.id === id);

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        todo.todoItem = req.body.todoItem;

        res.status(200).json({
            success: true,
            body: todo,
            message: "Todo updated successfully",
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
}

//delete
const deleteTodo = (req, res) =>{
    try{
        let deleteId = req.params.id;
        let getInd = todos.findIndex(t => t.id === deleteId)

        if(getInd === -1){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        let deleteTodo = todos.splice(getInd, 1);

        res.status(200).json({
            success: true,
            body: deleteTodo[0],
            message: `Todo deleted ${deleteId} successfully`,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Somthing went wrong",
            error: err.message
        })
    }
}

module.exports = {
    sendTodos,
    sendTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
}