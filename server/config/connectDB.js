import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI in the .env file");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("===================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log("===================================");

    } catch (error) {
        console.error("===================================");
        console.error("❌ MongoDB Connection Failed");
        console.error(error);
        console.error("===================================");

        throw error;
    }
}

export default connectDB;
