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

// ─── Color-coded course (used in student profiles) ───────────────────────────
export type CourseStatus = 'completed' | 'in-progress' | 'planned';

export interface ColorCodedCourse extends Course {
  status: CourseStatus;
  /** e.g. "Fall 2025" */
  semester?: string;
  /** e.g. "A", "B+" */
  grade?: string;
}

// ─── Extracurricular activity ─────────────────────────────────────────────────
export interface Extracurricular {
  name: string;
  role: string;
  hoursPerWeek: number;
}

export type TransferTimeline = 1 | 2 | 3;

// ─── Resident student profile ─────────────────────────────────────────────────
export interface ResidentStudentProfile {
  id: string;
  name: string;
  communityCollege: string;
  targetSchool: string;
  major: string;
  currentGPA: number;
  transferTimeline: TransferTimeline;
  financialAid: boolean;
  courses: ColorCodedCourse[];
  extracurriculars: Extracurricular[];
  goals: string;
}

// ─── International student — F-1 visa details ────────────────────────────────
export interface F1VisaInfo {
  /** SEVIS ID format: N00XXXXXXX */
  sevisId: string;
  i20ExpiryDate: string;
  dsoCounselor: string;
  /** School-issued SEVIS school code */
  schoolCode: string;
}

export interface WorkAuthorization {
  cptEligible: boolean;
  /** Date student becomes eligible for CPT (9 months after program start) */
  cptEligibilityDate: string;
  optEligible: boolean;
  /** OPT application window description */
  optWindow: string;
  onCampusWorkAllowed: boolean;
  /** "20 hrs/week during school, 40 hrs during breaks" */
  onCampusHoursLimit: string;
}

// ─── International student profile ───────────────────────────────────────────
export interface InternationalStudentProfile {
  id: string;
  name: string;
  countryOfOrigin: string;
  visaStatus: 'F-1' | 'J-1';
  communityCollege: string;
  targetSchool: string;
  major: string;
  currentGPA: number;
  transferTimeline: TransferTimeline;
  f1Info: F1VisaInfo;
  workAuthorization: WorkAuthorization;
  scholarships: string[];
  courses: ColorCodedCourse[];
  extracurriculars: Extracurricular[];
  /** Key USCIS rules the student must follow */
  uscisNotes: string[];
  /** Key SEVIS obligations */
  sevisNotes: string[];
  /** I-20 maintenance requirements */
  i20Notes: string[];
}
