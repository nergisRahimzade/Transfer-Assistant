import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
// Note: In this environment, GEMINI_API_KEY is available in process.env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface EmbeddingResult {
  id: string;
  text: string;
  metadata: any;
  embedding: number[];
}

export class AIService {
  /**
   * Generates embeddings for a given text using Gemini.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    try {
      const result = await ai.models.embedContent({
        model: 'gemini-embedding-2-preview',
        contents: [text],
      });

      // result.embeddings is an array of Embedding objects
      const embedding = result.embeddings?.[0]?.values;
      if (!embedding) throw new Error('No embedding returned');
      return embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error;
    }
  }

  /**
   * Calculates cosine similarity between two vectors.
   */
  cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Searches the indexed data for the most relevant matches.
   * This is a simple in-memory implementation that can be scaled to Firestore Vector Search.
   */
  async findSimilar(queryEmbedding: number[], index: EmbeddingResult[], topK: number = 5): Promise<EmbeddingResult[]> {
    const scoredIndex = index.map(item => ({
      ...item,
      score: this.cosineSimilarity(queryEmbedding, item.embedding)
    }));

    // Sort by score descending and take topK
    return scoredIndex
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Generates a response based on retrieved context (RAG).
   */
  async generateRAGResponse(query: string, context: string[], userProfile?: any): Promise<string> {
    const systemPrompt = `
      You are a specialized California Community College (CCC) Transfer Assistant.
      Your goal is to help students transfer to UC/CSU universities.
      
      Use the following retrieved context to answer the user's question.
      If the answer is not in the context, use your internal knowledge about CCC transfer but prioritize the context.
      
      CONTEXT:
      ${context.join("\n---\n")}
      
      USER PROFILE:
      ${userProfile ? JSON.stringify(userProfile, null, 2) : "Unknown profile"}
      
      Instructions:
      1. Be precise about requirements (GPA, major prep, IGETC).
      2. If the student is an international student, include relevant USCIS/visa considerations.
      3. Provide encouragement but stay realistic.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
        },
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error generating RAG response:", error);
      throw error;
    }
  }
}

export const aiService = new AIService();
