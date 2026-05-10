import { aiService, EmbeddingResult } from "./aiService.js";

export interface RawRequirement {
  id: string;
  sourceCC: string;
  targetUni: string;
  major: string;
  content: string;
}

/**
 * Pure in-memory vector store â€” no Python, no external server needed.
 * Embeds documents with Gemini, stores them in RAM, and searches via cosine similarity.
 */
export class DataIngestionService {
  private index: EmbeddingResult[] = [];

  /**
   * Embeds all requirements and stores them in the in-memory index.
   * Safe to call multiple times â€” upserts by ID.
   */
  async ingestRequirements(requirements: RawRequirement[]) {
    console.log(`[Ingest] Embedding ${requirements.length} documents...`);
    let success = 0;

    for (const req of requirements) {
      try {
        const embedding = await aiService.generateEmbedding(req.content);

        // Upsert: replace existing entry with same ID, otherwise append
        const existing = this.index.findIndex((e) => e.id === req.id);
        const entry: EmbeddingResult = {
          id: req.id,
          text: req.content,
          metadata: { sourceCC: req.sourceCC, targetUni: req.targetUni, major: req.major },
          embedding,
        };
        if (existing >= 0) {
          this.index[existing] = entry;
        } else {
          this.index.push(entry);
        }
        success++;
      } catch (err) {
        console.warn(`[Ingest] Skipping "${req.id}": ${(err as Error).message}`);
      }
    }

    console.log(`[Ingest] Done. ${success}/${requirements.length} documents embedded.`);
  }

  /**
   * Finds the most relevant documents for a query using cosine similarity.
   */
  async searchRequirements(queryText: string, limit: number = 5) {
    if (this.index.length === 0) {
      console.warn("[Search] Index is empty â€” ingest has not run yet.");
      return [];
    }

    const queryEmbedding = await aiService.generateEmbedding(queryText);
    const results = await aiService.findSimilar(queryEmbedding, this.index, limit);

    return results.map((r) => ({
      text: r.text,
      metadata: r.metadata,
      distance: null,
    }));
  }

  /** Number of documents currently in the index. */
  get size() {
    return this.index.length;
  }
}

export const dataIngestionService = new DataIngestionService();

