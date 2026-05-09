import { Router } from "express";
import { SCHOOLS } from "../data/mockData.js";

const router = Router();

// GET /api/schools — return all UC/CSU schools
router.get("/", (_req, res) => {
  res.json(SCHOOLS);
});

// GET /api/schools/:id — return a single school
router.get("/:id", (req, res) => {
  const school = SCHOOLS.find((s) => s.id === req.params.id);
  if (!school) {
    res.status(404).json({ error: "School not found" });
    return;
  }
  res.json(school);
});

export default router;
