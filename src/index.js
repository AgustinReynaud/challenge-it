import dotenv from "dotenv";
import { db } from "./database/config/config.js";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 1) Autenticar conexión
    await db.authenticate();
    console.log(
      `✅ DB connected: ${process.env.DB_USER}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

start();
