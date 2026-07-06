import mongoose from "mongoose";
import dns from "node:dns";
import { validateEnv } from "./env-server";

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const { MONGODB_URI, DB_NAME } = validateEnv();

let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
