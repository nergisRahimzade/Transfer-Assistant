export interface Course {
  courseId: string;
  title: string;
  prerequisites: string[];
  units: number;
}

export interface RoadmapTerm {
  termName: string;
  courses: { courseId: string; month: string; notes?: string }[];
}

/**
 * Service to handle transfer roadmap logic.
 * This should eventually connect to a persistent database (e.g. MongoDB/PostgreSQL).
 */
export class TransferService {
  /**
   * Verifies if a course can be added to a roadmap based on prerequisites.
   */
  async checkPrerequisites(
    courseId: string, 
    completedCourses: string[]
  ): Promise<{ allowed: boolean; missing: string[] }> {
    // Logic remains the same, but source of course data will be the database
    const course = await this.getCourseInfo(courseId);
    if (!course) return { allowed: true, missing: [] };

    const missing = course.prerequisites.filter(req => !completedCourses.includes(req));
    return {
      allowed: missing.length === 0,
      missing
    };
  }

  /**
   * Placeholder to get course info from DB.
   */
  async getCourseInfo(courseId: string): Promise<Course | null> {
    return null; 
  }

  /**
   * Logic to prevent roadmap creation if "what classes to get" feature wasn't used.
   */
  async canCreateRoadmap(userProfile: any): Promise<boolean> {
    return userProfile?.hasUsedClassSearch === true;
  }

  /**
   * Logic for saving roadmaps would go here.
   */
  async saveRoadmap(userId: string, terms: RoadmapTerm[]) {
    console.log(`Saving roadmap for ${userId}...`);
    // DB.collection('roadmaps').upsert(...)
  }
}

export const transferService = new TransferService();
