// ─── Shared domain types used by both frontend and backend ───────────────────

export interface School {
  id: string;
  name: string;
  system: 'UC' | 'CSU';
  location: string;
  enrollment: string;
  acceptanceRate: string;
  avgGPA: string;
  color: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  category: 'GE' | 'Major Prep' | 'Elective';
  type: 'ASSIST' | 'CalGETC' | 'Regular';
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export interface TransferProgram {
  id: string;
  name: string;
  school: string;
  description: string;
  benefits: string[];
}

export interface StudentProfile {
  isResident: boolean;
  communityCollege: string;
  targetSchool: string;
  major: string;
  financialAid: boolean;
  goals: string;
  activities: string;
  transferYears: number;
  hasAPCredit: boolean;
  hasIBCredit: boolean;
  hasDualEnrollment: boolean;
  apCredits?: string;
  ibCredits?: string;
  dualEnrollmentCredits?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AIQueryRequest {
  query: string;
  userProfile?: StudentProfile;
}

export interface AIQueryResponse {
  answer: string;
  sources: Record<string, string>[];
  metadata: {
    engine: string;
    matchesFound: number;
  };
}

export interface UserRoadmap {
  userId: string;
  semesters: Semester[];
  updatedAt: string;
}
