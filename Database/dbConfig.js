import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.mongoDBconnectionString)
        console.log("MongoDB successfully connected");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;
