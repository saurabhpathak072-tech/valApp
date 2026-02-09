import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const mongodbUri: string = MONGODB_URI;

// Check if we have a cached connection to avoid re-connecting
const cached: MongooseCache =
  globalThis.mongoose ?? (globalThis.mongoose = { conn: null, promise: null });

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri).then((m) => m);
  }

  cached.conn = await cached.promise;

  console.log("MongoDB connected");
  return cached.conn;
}

export default dbConnect;
