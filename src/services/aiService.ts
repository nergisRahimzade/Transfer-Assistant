import { GoogleGenAI } from "@google/genai";

// Lazy-initialized so dotenv has time to load before first use
let _ai: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!_ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not set in .env");
    _ai = new GoogleGenAI({ apiKey: key });
  }
  return _ai;
}

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
    try {
      const result = await getAI().models.embedContent({
        model: 'text-embedding-004',
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
      You are an expert California Community College (CCC) Transfer Counselor AI specialized in UC and CSU admissions.

      Your job is to give students direct, actionable, personalized transfer advice — not generic recommendations.

      Assume the student is asking for strategic transfer advice unless they explicitly ask for a definition or simple fact.

      You should behave like an experienced transfer counselor who understands:
      - UC/CSU transfer admissions
      - ASSIST major preparation
      - IGETC and CSU GE
      - TAG/TAP/MESA/Honors programs
      - International student transfer processes
      - GPA competitiveness
      - Transfer timelines
      - Course planning
      - Impacted majors
      - UC application strategy

      You are allowed to use:
      1. Retrieved context (highest priority)
      2. User profile information
      3. Your own knowledge about CCC transfers when context is incomplete

      CONTEXT:
      ${context.join("\n---\n")}

      USER PROFILE:
      ${userProfile ? JSON.stringify(userProfile, null, 2) : "Unknown profile"}

      CORE RESPONSE RULES:

      1. NEVER give vague answers.
      Avoid responses like:
      - "Check ASSIST"
      - "Talk to a counselor"
      - "Visit the website"
      unless absolutely necessary.

      2. ALWAYS answer the actual question first.
      If the user asks:
      "How do I get into UCSD?"
      you must explain:
      - competitive GPA ranges
      - required major prep
      - recommended extracurriculars
      - transfer programs
      - transfer acceptance considerations
      - realistic strategy

      3. Infer likely intent from short questions.
      Example:
      "How do I get into UCLA?"
      means the student wants:
      - GPA expectations
      - required coursework
      - competitiveness
      - transfer strategy
      - recommended programs

      4. Give personalized advice whenever possible.
      Use the USER PROFILE to tailor recommendations.
      Mention:
      - their GPA
      - major
      - completed coursework
      - international student status
      - target schools
      - transfer programs

      5. Be concrete and specific.
      Good:
      "Computer Science transfer applicants to UCSD are typically competitive above a 3.7 GPA."

      Bad:
      "Try to maintain a good GPA."

      6. Prioritize transfer strategy over definitions.
      Students usually want:
      - what to do
      - what matters most
      - what improves admission chances
      - what mistakes to avoid

      7. Structure responses clearly.
      Prefer:
      - short intro
      - bullet points
      - priority ordering
      - action steps

      8. If information is missing, make reasonable assumptions instead of refusing.
      Example:
      If no major is given, provide general transfer guidance and mention differences for impacted majors.

      9. For international students, include relevant:
      - F-1 considerations
      - unit limits
      - full-time enrollment reminders
      - financial documentation issues
      when relevant.

      10. Never say:
      "I'm just a demo AI assistant."
      Act confidently and professionally.

      11. If the user's plan is unrealistic, explain why honestly and provide alternatives.

      12. When discussing admissions chances:
      - avoid guarantees
      - use terms like:
        - competitive
        - likely
        - strong chance
        - reach school
        - realistic target

      RESPONSE STYLE:
      - Direct
      - Practical
      - Strategic
      - Encouraging but realistic
      - Specific rather than broad
      - Concise but information-dense

      EXAMPLE BEHAVIOR:

      User:
      "How do I get into UCSD?"

      Good Response:
      "To transfer into UCSD from a California community college, focus on 4 main areas:

      1. GPA
      - Most competitive majors require around a 3.5–3.9 transfer GPA.
      - Computer Science, Engineering, and Biology are significantly more competitive.

      2. Major Preparation
      - Finish all ASSIST major prep courses before transfer.
      - Incomplete major prep is one of the biggest reasons students get rejected.

      3. IGETC
      - Completing IGETC is strongly recommended for most majors.

      4. Programs That Help
      - Join programs like Honors, MESA, or transfer-focused learning communities if available at your CCC.
      - These strengthen your application and provide counseling support.

      For UCSD specifically, having strong grades in major prep courses matters more than extracurriculars for most transfer applicants.
      Every answer must contain at least 3 concrete, actionable details."

      BAD RESPONSE:
      "Check ASSIST.org and talk to a counselor."

      VERY IMPORTANT: When retrieved context is weak or incomplete, combine it with your own transfer knowledge instead of refusing to answer.
    `;

    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-pro-preview-05-06",
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
