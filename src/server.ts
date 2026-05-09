import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

// Routes
import schoolsRouter from "./routes/schools.js";
import coursesRouter from "./routes/courses.js";
import programsRouter from "./routes/programs.js";
import userRouter from "./routes/user.js";
import aiRouter from "./routes/ai.js";
import adminRouter from "./routes/admin.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Auth0 JWT middleware ─────────────────────────────────────────────────────
// Validates Bearer tokens issued by your Auth0 tenant.
// Set AUTH0_DOMAIN and AUTH0_AUDIENCE in .env
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // ─── Public routes ──────────────────────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.use("/api/schools", schoolsRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/programs", programsRouter);

  // ─── Protected routes (require Auth0 JWT) ───────────────────────────────────
  app.use("/api/user", checkJwt, userRouter);
  app.use("/api/ai", checkJwt, aiRouter);
  app.use("/api/admin", checkJwt, adminRouter);

  // ─── Vite dev server / static production serving ────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
