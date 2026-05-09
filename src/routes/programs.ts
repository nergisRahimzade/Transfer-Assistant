import { Router } from "express";
import { PROGRAMS } from "../data/mockData.js";

const router = Router();

// GET /api/programs — return all transfer programs, optionally filtered by ?school=
router.get("/", (req, res) => {
  let results = PROGRAMS;

  if (req.query.school) {
    const school = (req.query.school as string).toLowerCase();
    results = results.filter((p) => p.school.toLowerCase().includes(school));
  }

  res.json(results);
});

// GET /api/programs/:id
router.get("/:id", (req, res) => {
  const program = PROGRAMS.find((p) => p.id === req.params.id);
  if (!program) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  res.json(program);
});

export default router;
