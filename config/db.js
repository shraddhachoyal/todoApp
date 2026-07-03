import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        console.log("MONGO_URI:- ", process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database successfully connected");
    }catch(error){
        console.error('Database connection failed:',error.message);
        process.exit(1);
    }
}