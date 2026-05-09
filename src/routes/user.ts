import { Router, Request, Response } from "express";
import type { StudentProfile, Semester } from "../types/index.js";

const router = Router();

// In-memory store (replace with a real DB — e.g. PostgreSQL/MongoDB)
const profiles = new Map<string, StudentProfile>();
const roadmaps = new Map<string, Semester[]>();

function getUserId(req: Request): string {
  // Auth0 JWT middleware attaches the decoded token to req.auth
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req as any).auth?.payload?.sub ?? "anonymous";
}

// ─── Profile ─────────────────────────────────────────────────────────────────

// GET /api/user/profile
router.get("/profile", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const profile = profiles.get(userId);
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }
  res.json(profile);
});

// POST /api/user/profile — create or update profile
router.post("/profile", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const profile: StudentProfile = req.body;
  profiles.set(userId, profile);
  res.json({ success: true, profile });
});

// ─── Roadmap ─────────────────────────────────────────────────────────────────

// GET /api/user/roadmap
router.get("/roadmap", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const roadmap = roadmaps.get(userId) ?? [];
  res.json(roadmap);
});

// POST /api/user/roadmap — save/overwrite roadmap
router.post("/roadmap", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const semesters: Semester[] = req.body;
  roadmaps.set(userId, semesters);
  res.json({ success: true, updatedAt: new Date().toISOString() });
});

export default router;
