import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { db, pool } from "./db";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

let localDirname = "";
if (!process.env.VERCEL) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    localDirname = path.dirname(__filename);
  } catch (e) {
    console.error("Failed to determine __dirname", e);
  }
}

const app = express();
const PostgresqlStore = pgSession(session);

app.use(express.json());
app.use(
  session({
    store: new PostgresqlStore({
      pool: pool,
      createTableIfMissing: true,
    }) as any,
    secret: process.env.SESSION_SECRET || "development-secret-key-123456789",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

registerRoutes(app);

// On Vercel, this static serving is normally ignored. 
// But during local dev "production" (e.g. build), it is useful.
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  app.use(express.static(path.join(localDirname, "../dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(localDirname, "../dist/index.html"));
  });
}

const PORT = process.env.PORT || 3001;
// Do not start app.listen on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
