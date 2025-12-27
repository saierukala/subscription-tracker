import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 5500;
export const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("❌ DB_URI is not defined in environment variables");
}
