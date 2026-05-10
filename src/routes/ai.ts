import { Router, Request, Response } from "express";
import { dataIngestionService } from "../services/dataIngestionService.js";
import { aiService } from "../services/aiService.js";
import type { AIQueryRequest } from "../types/index.js";

const router = Router();

// POST /api/ai/query — protected RAG query endpoint
// Requires valid Auth0 JWT (checkJwt applied in server.ts)
router.post("/query", async (req: Request, res: Response) => {
  const { query, userProfile }: AIQueryRequest = req.body;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "query field is required" });
    return;
  }

  try {
    // 1. Search ChromaDB for relevant context
    const matches = await dataIngestionService.searchRequirements(query);

    // 2. Build context array from matched documents
    const contextDocs = matches.map((m: { text: string | null }) => m.text as string);

    // 3. Generate RAG response via Gemini
    const answer = await aiService.generateRAGResponse(query, contextDocs, userProfile);

    res.json({
      answer,
      sources: matches.map((m: { text: string | null; metadata: unknown; distance: null }) => m.metadata),
      metadata: {
        engine: "In-Memory Vector Search + Gemini",
        matchesFound: matches.length,
      },
    });
  } catch (error) {
    console.error("AI Query Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
