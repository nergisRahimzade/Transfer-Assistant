import { Router, Request, Response } from "express";
import { dataIngestionService } from "../services/dataIngestionService.js";
import { TRANSFER_REQUIREMENTS } from "../data/mockData.js";

const router = Router();

// POST /api/admin/ingest — protected (checkJwt applied in server.ts)
// Ingests the built-in transfer requirements into ChromaDB
router.post("/ingest", async (_req: Request, res: Response) => {
  try {
    await dataIngestionService.ingestRequirements(TRANSFER_REQUIREMENTS);
    res.json({
      message: "Ingestion successful",
      count: TRANSFER_REQUIREMENTS.length,
    });
  } catch (error) {
    console.error("Ingestion error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
