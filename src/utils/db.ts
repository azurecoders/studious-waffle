import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGO_URI;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

// Extend the global object to include mongoose caching
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use global.mongoose to cache connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "mazdory_dev",
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(DATABASE_URL!, opts)
      .then((connection) => {
        return connection;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
