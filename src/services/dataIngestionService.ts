import { aiService } from "./aiService";
import { ChromaClient } from "chromadb";

export interface RawRequirement {
  id: string; // Unique ID for the requirement document
  sourceCC: string;
  targetUni: string;
  major: string;
  content: string; 
}

export class DataIngestionService {
  private client: ChromaClient;
  private collectionName = "transfer_requirements";

  constructor() {
    this.client = new ChromaClient({
      path: process.env.CHROMA_URL || "http://localhost:8000"
    });
  }

  /**
   * Processes raw requirement data (ASSIST.org, UC info) and indices it in ChromaDB.
   */
  async ingestRequirements(requirements: RawRequirement[]) {
    console.log(`Starting ingestion of ${requirements.length} requirements into ChromaDB...`);

    try {
      const collection = await this.client.getOrCreateCollection({
        name: this.collectionName,
      });

      for (const req of requirements) {
        // 1. Generate Embedding using Gemini
        const embedding = await aiService.generateEmbedding(req.content);

        // 2. Add to ChromaDB
        await collection.add({
          ids: [req.id],
          embeddings: [embedding],
          metadatas: [{
            sourceCC: req.sourceCC,
            targetUni: req.targetUni,
            major: req.major
          }],
          documents: [req.content],
        });

        console.log(`Indexed: ${req.major} from ${req.sourceCC}`);
      }
    } catch (error) {
      console.error("ChromaDB Ingestion Error:", error);
      throw error;
    }
    
    console.log("Ingestion complete.");
  }

  /**
   * Searches ChromaDB for relevant requirements based on a query.
   */
  async searchRequirements(queryText: string, limit: number = 3) {
    try {
      const collection = await this.client.getOrCreateCollection({
        name: this.collectionName,
      });

      // 1. Embed current query
      const queryEmbedding = await aiService.generateEmbedding(queryText);

      // 2. Query ChromaDB
      const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: limit,
      });

      // 3. Format results for the AI context
      return results.documents[0].map((doc, i) => ({
        text: doc,
        metadata: results.metadatas[0][i],
        distance: results.distances ? results.distances[0][i] : null
      }));
    } catch (error) {
      console.error("ChromaDB Search Error:", error);
      return [];
    }
  }
}

export const dataIngestionService = new DataIngestionService();
