import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_ROOT = path.resolve(__dirname, "..");

const resolveFromApiRoot = (value, fallback) => {
  if (!value) return fallback;
  return path.isAbsolute(value) ? value : path.resolve(API_ROOT, value);
};

/**
 * รวมค่าตั้งค่าทั้งหมดไว้ที่เดียว — ที่อื่นห้ามอ่าน process.env ตรง ๆ
 * ทำให้รู้ได้ทันทีว่าแอปนี้ต้องการค่าอะไรบ้าง
 */
export const config = {
  dbFile: resolveFromApiRoot(
    process.env.DB_FILE,
    path.join(API_ROOT, "data", "campus.db"),
  ),
  schemaFile: resolveFromApiRoot(
    process.env.SCHEMA_FILE,
    path.join(API_ROOT, "data", "schema.sql"),
  ),
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV ?? "development",
  get isProduction() {
    return this.nodeEnv === "production";
  },
};
