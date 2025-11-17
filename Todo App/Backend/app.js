import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

let todos = [];

// GET all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// POST add new todo
app.post("/api/todos", (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = {
        id: Date.now(),
        title: title.trim(),
        status: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PATCH update title
app.patch("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;

    let updatedTodo = null;

    todos = todos.map((todo) => {
        if (todo.id === id) {
            updatedTodo = { ...todo, title: title ?? todo.title };
            return updatedTodo;
        }
        return todo;
    });

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
});

// PATCH toggle status
app.patch("/api/todos/:id/status", (req, res) => {
    const id = Number(req.params.id);
    let updatedTodo = null;

    todos = todos.map((todo) => {
        if (todo.id === id) {
            updatedTodo = { ...todo, status: !todo.status };
            return updatedTodo;
        }
        return todo;
    });

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const existingLength = todos.length;

    todos = todos.filter((todo) => todo.id !== id);

    if (todos.length === existingLength) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ success: true });
});