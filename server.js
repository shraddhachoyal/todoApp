import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import { errorHandler } from './middlewate/error.middleware.js';

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
connectDB();
app.use('/todos', todoRoutes);

app.use(errorHandler);

// For testing url
// /* app.get('/', (req,res) => {
//     res.send("Todo API is running");
// }); */
// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", "./views");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});