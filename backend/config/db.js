import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://thathsara:rm8Rf2KNPWAppkWC@cluster0.x4exe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Database Connected Successfully!"))
}   
