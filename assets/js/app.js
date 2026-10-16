const cl = console.log;

let todo = [
    {
        "id": "1",
        "todoItem": "HTML"
    },
    {
        "id": "2",
        "todoItem": "CSS"
    },
    {
        "id": "3",
        "todoItem": "JavaScript"
    },
    {
        "id": "4",
        "todoItem": "Angular"
    }
]

const express = require("express")

const app = express();

app.use(express.json())

//fetch all data
app.get("/api/todo", (req, res) =>{
    try{
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
})

//fetch single todo
app.get("/api/todo/:id", (req, res) => {
    try{
        const id = req.params.id;

        const todos = todo.find(t => t.id === id)

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

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
})

//create
app.post("/api/todo", (req, res) => {
    try{
        let newTodo = {
            id: Date.now().toString(),
            todoItem: req.body.todoItem,
        }

        todo.push(newTodo)

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
})

//update
app.patch("/api/todo/:id", (req, res) => {
    try{
        let todos = todo.find(t => t.id == req.params.id);

        if(!todos){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        todos.todoItem = req.body.todoItem;

        res.status(200).json({
            success: true,
            body: todos,
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
})


//delete
app.delete("/api/todo/:id", (req, res) =>{
    try{
        let deleteId = req.params.id;
        let getInd = todo.findIndex(t => t.id == deleteId)

        if(!getInd === -1){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        let deleteTodo = todo.splice(getInd, 1);

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
})


app.listen(3000, ()=> {
    cl("Todo data fetched successfully")
})