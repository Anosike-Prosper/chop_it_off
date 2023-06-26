
import mongoose from "mongoose";
import config from "./config";

const MONGO_URL = config.Mongoose_URL;

export function connectToMongoDB() {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connection to MongoDB successful");
    })
    .catch((err: Error) => {
      console.log("Connection to MongoDB failed", err);
    });
    
}

