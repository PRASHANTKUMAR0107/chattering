import mongoose from "mongoose";

const connectToMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("successfully connected to mongoDB ✨"); 
    } catch (error) {
        console.log("error in connecting with mongoDB 🥲")
    }
}

export default connectToMongoDB;