import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/food_del')
        .then(() => console.log("DB connected successfully"))
        .catch((error) => console.log("Error: DB not connected", error));
};
