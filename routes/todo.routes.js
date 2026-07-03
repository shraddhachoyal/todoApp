import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, toggleTodo } from '../controllers/todo.controller.js';

const route = express.Router();

/*route.get('/', (req,res) => {
    res.send("Todo first API is running")
});*/

route.post('/add', createTodo);
route.get('/', getTodos);
route.get('/:id', getTodoById);
route.put('/:id', updateTodo);
route.delete('/:id', deleteTodo);
route.patch('/:id', toggleTodo);

export default route;