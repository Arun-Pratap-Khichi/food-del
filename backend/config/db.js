import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://arunpratapkhichi62:WoolZMn07uUqpmxO@cluster0.vrjub.mongodb.net/')
        .then(() => console.log("DB connected successfully"))
        .catch((error) => console.log("Error: DB not connected", error));
};
