import mongoose from "mongoose";
import dns from "node:dns";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL не е поставен во environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    cached.promise = mongoose
      .connect(MONGODB_URL)
      .then((mongooseInstance) => {
        console.log("Успешно поврзување со MongoDB");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
