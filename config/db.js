import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const mongooseUrl = process.env.MONGO_URL;

export const connectdB = async () => {
    try {
        await mongoose.connect(mongooseUrl);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.error("DB not connected",error);
    }
}
