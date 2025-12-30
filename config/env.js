import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 5500;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
export const ARCJET_KEY = process.env.ARCJET_KEY;
export const ARCJET_ENV = process.env.ARCJET_ENV || "development";

if (!DB_URI) throw new Error("❌ DB_URI is not defined");
if (!JWT_SECRET) throw new Error("❌ JWT_SECRET is not defined");
if (!ARCJET_KEY) throw new Error("❌ ARCJET_KEY is not defined");
