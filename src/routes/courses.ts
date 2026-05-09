import { Router } from "express";
import { COURSES } from "../data/mockData.js";

const router = Router();

// GET /api/courses — return all courses, optionally filtered by ?category= or ?type=
router.get("/", (req, res) => {
  let results = COURSES;

  if (req.query.category) {
    results = results.filter((c) => c.category === req.query.category);
  }
  if (req.query.type) {
    results = results.filter((c) => c.type === req.query.type);
  }

  res.json(results);
});

// GET /api/courses/:id — single course
router.get("/:id", (req, res) => {
  const course = COURSES.find((c) => c.id === req.params.id);
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(course);
});

export default router;
