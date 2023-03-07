import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const { MONGO_URL } = process.env

if(!MONGO_URL) {
  
  throw new Error("Please define the MONGO_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if(!cached.promise){
    cached.promise = mongoose.connect(MONGO_URL as string).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnection;