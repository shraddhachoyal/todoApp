import Todo from "../models/todo.model.js";
import { asyncHandler } from "../middlewate/asyncHandler.js";
import mongoose from "mongoose";

export const createTodo = asyncHandler(async( req,res) => {

    const { title, description} = req.body;
    
    // validation
    if(!title || title.trim() == ""){
        return res.status(400).json({
            success: false,
            message: "Title is required",    
        });
    }

    const todo = await Todo.create({ title, description })
    return res.status(200).json({
        success: true,
        message: "Todo created successfully",
        todo,            
    });
})

// Get All Todo List with searching, filtering and pagination
export const getTodos = asyncHandler(async( req,res) => {
    
    //parameters for searching, filtering and pagination
    const { search, sort, page=1, limit=4} = req.query;
    
    //Basic query
    let query = {};

    //For Search
    if(search){
        query.title = { $regex:search, $options: "i"}; // i for case insencitive
    }

    //For sorting/filter
    let sortBy = {};
    //here 1 for Asc order and -1 for Desc order
    if (sort === "asc") {
        sortBy = { createdAt: 1 };
    } else if (sort === "desc") {
        sortBy = { createdAt: -1 };
    }

    //Pagination
    const skip = (page-1)*limit;

    //get data from database
    const todos = await Todo.find(query)
                            .sort(sortBy)
                            .skip(skip)
                            .limit(parseInt(limit));

    const totalTodos = await Todo.countDocuments(query); //Total Todos/data in mongoose
    const totalPages = Math.ceil(totalTodos / limit); // Total pages

    // return res.status(200).json({
    //     success: true,
    //     message: "Todo List",
    //     total:totalTodos,
    //     page:Number(page),
    //     limit: Number(limit),
    //     data:todos,            
    // });

    // var templateValues = {
    //     title: 'ToDo List',
    //     result_code: 200,
    //     total:totalTodos,
    //     page:Number(page),
    //     limit: Number(limit),
    //     body_text: todos
    //   }

      // Your template file should be in 'your-project-name/views/home.ejs'
    //   res.render("home", {templateValues});

    res.render("home", {
        todos,
        total: totalTodos,
        page: Number(page),
        limit: Number(limit),
        totalPages,
        search,
        sort
    });
})


//Get Todo by ID
export const getTodoById = asyncHandler(async( req,res) => {
    const {id} = req.params;

    // Validate Id on mongoose
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID",    
        });
    }

    // get data by id from db 
    const todo = await Todo.findById(id);

    //if data/todo not found in db
    if(!todo){
        return res.status(404).json({
            success: false,
            message: "Todo not found",    
        });
    }

    //if data/todo not found in db
    return res.status(200).json({
        success: true,
        message: "Todo information",
        data:todo,            
    });

});

// Update Todo
export const updateTodo = asyncHandler(async( req,res) => {
    const {id} = req.params;
    const { title, description } = req.body;

    // Validate Id on mongoose
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID",    
        });
    }

    // Input fields validation
    if(!title || title.trim() == ""){
        return res.status(400).json({
            success: false,
            message: "Title is required",    
        });
    }

    const todo = await Todo.findByIdAndUpdate(id, { title, description}, {new:true, runValidators:true});
    //  If todo not fount in db
    if(!todo){        
        return res.status(404).json({
            success: false,
            message: "Todo for this id is not found",    
        });
    }

    return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data:todo,            
    });
});

//Toggle
export const toggleTodo = asyncHandler(async( req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    //Get data by ID
    const todo = await Todo.findById(id);
    if(!todo){
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        });
    }
    
    // Flip the isCompleted fieled meanse it change true val into false and false val into true
    todo.isCompleted = !todo.isCompleted;

    await todo.save(); // Update changes

    // if success
    return res.status(200).json({
        success:true,
        message:"Todo toggled successfully",
        data:todo
    });
});

// Delete Todo
export const deleteTodo = asyncHandler(async( req,res) => {
    const {id} = req.params;

    // Validate Id on mongoose
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if(!todo){
        return res.status(404).json({
            success: false,
            message: "Todo not found on this ID"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Todo Deleted"
    });

});