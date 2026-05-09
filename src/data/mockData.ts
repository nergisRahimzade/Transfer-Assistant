import type { School, Course, TransferProgram } from "../types/index.js";

// ─── Schools ─────────────────────────────────────────────────────────────────
export const SCHOOLS: School[] = [
  { id: "uc-berkeley", name: "UC Berkeley", system: "UC", location: "Berkeley, CA", enrollment: "45,000", acceptanceRate: "24%", avgGPA: "3.7", color: "from-blue-500 to-yellow-500" },
  { id: "ucla", name: "UCLA", system: "UC", location: "Los Angeles, CA", enrollment: "46,000", acceptanceRate: "26%", avgGPA: "3.8", color: "from-blue-600 to-yellow-400" },
  { id: "uc-san-diego", name: "UC San Diego", system: "UC", location: "San Diego, CA", enrollment: "42,000", acceptanceRate: "34%", avgGPA: "3.6", color: "from-blue-500 to-yellow-600" },
  { id: "uc-davis", name: "UC Davis", system: "UC", location: "Davis, CA", enrollment: "40,000", acceptanceRate: "49%", avgGPA: "3.5", color: "from-blue-600 to-yellow-500" },
  { id: "uc-irvine", name: "UC Irvine", system: "UC", location: "Irvine, CA", enrollment: "36,000", acceptanceRate: "41%", avgGPA: "3.6", color: "from-blue-500 to-yellow-400" },
  { id: "uc-santa-barbara", name: "UC Santa Barbara", system: "UC", location: "Santa Barbara, CA", enrollment: "26,000", acceptanceRate: "37%", avgGPA: "3.6", color: "from-blue-600 to-blue-400" },
  { id: "uc-santa-cruz", name: "UC Santa Cruz", system: "UC", location: "Santa Cruz, CA", enrollment: "19,000", acceptanceRate: "65%", avgGPA: "3.3", color: "from-blue-500 to-yellow-600" },
  { id: "uc-riverside", name: "UC Riverside", system: "UC", location: "Riverside, CA", enrollment: "26,000", acceptanceRate: "69%", avgGPA: "3.3", color: "from-blue-600 to-yellow-500" },
  { id: "uc-merced", name: "UC Merced", system: "UC", location: "Merced, CA", enrollment: "9,000", acceptanceRate: "89%", avgGPA: "3.0", color: "from-blue-500 to-yellow-400" },
  { id: "sdsu", name: "San Diego State", system: "CSU", location: "San Diego, CA", enrollment: "36,000", acceptanceRate: "38%", avgGPA: "3.4", color: "from-red-600 to-black" },
  { id: "cal-poly-slo", name: "Cal Poly San Luis Obispo", system: "CSU", location: "San Luis Obispo, CA", enrollment: "22,000", acceptanceRate: "30%", avgGPA: "3.5", color: "from-green-600 to-yellow-500" },
  { id: "cal-poly-pomona", name: "Cal Poly Pomona", system: "CSU", location: "Pomona, CA", enrollment: "31,000", acceptanceRate: "55%", avgGPA: "3.2", color: "from-green-700 to-yellow-600" },
  { id: "sfsu", name: "San Francisco State", system: "CSU", location: "San Francisco, CA", enrollment: "25,000", acceptanceRate: "92%", avgGPA: "3.0", color: "from-purple-600 to-yellow-500" },
  { id: "sjsu", name: "San José State", system: "CSU", location: "San José, CA", enrollment: "36,000", acceptanceRate: "72%", avgGPA: "3.2", color: "from-blue-700 to-yellow-400" },
  { id: "csulb", name: "Cal State Long Beach", system: "CSU", location: "Long Beach, CA", enrollment: "37,000", acceptanceRate: "50%", avgGPA: "3.3", color: "from-black to-yellow-500" },
];

// ─── Courses ─────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  { id: "engl-1a", code: "ENGL 1A", name: "English Composition", units: 3, category: "GE", type: "CalGETC" },
  { id: "engl-1b", code: "ENGL 1B", name: "Critical Thinking", units: 3, category: "GE", type: "CalGETC" },
  { id: "math-3a", code: "MATH 3A", name: "Calculus I", units: 5, category: "Major Prep", type: "ASSIST" },
  { id: "math-3b", code: "MATH 3B", name: "Calculus II", units: 5, category: "Major Prep", type: "ASSIST" },
  { id: "math-3c", code: "MATH 3C", name: "Calculus III", units: 5, category: "Major Prep", type: "ASSIST" },
  { id: "cs-1a", code: "CS 1A", name: "Intro to Programming", units: 4, category: "Major Prep", type: "ASSIST" },
  { id: "cs-2a", code: "CS 2A", name: "Data Structures", units: 4, category: "Major Prep", type: "ASSIST" },
  { id: "cs-2b", code: "CS 2B", name: "Algorithms", units: 4, category: "Major Prep", type: "ASSIST" },
  { id: "phys-4a", code: "PHYS 4A", name: "Physics I", units: 5, category: "Major Prep", type: "ASSIST" },
  { id: "hist-17a", code: "HIST 17A", name: "US History I", units: 3, category: "GE", type: "CalGETC" },
  { id: "psych-1", code: "PSYCH 1", name: "Introduction to Psychology", units: 3, category: "GE", type: "CalGETC" },
  { id: "art-1a", code: "ART 1A", name: "Art History", units: 3, category: "GE", type: "Regular" },
  { id: "phil-10", code: "PHIL 10", name: "Critical Thinking", units: 3, category: "GE", type: "CalGETC" },
  { id: "biol-1a", code: "BIOL 1A", name: "General Biology I", units: 4, category: "GE", type: "CalGETC" },
  { id: "chem-1a", code: "CHEM 1A", name: "General Chemistry I", units: 5, category: "Major Prep", type: "ASSIST" },
];

// ─── Transfer Programs ────────────────────────────────────────────────────────
export const PROGRAMS: TransferProgram[] = [
  {
    id: "tap-ucla",
    name: "Transfer Alliance Program (TAP)",
    school: "UCLA",
    description: "Priority consideration for admission and scholarship opportunities for honors students",
    benefits: ["Priority review", "Scholarship access", "Academic counseling"],
  },
  {
    id: "tag-uc-davis",
    name: "Transfer Admission Guarantee (TAG)",
    school: "UC Davis",
    description: "Guaranteed admission if you meet specific GPA and course requirements",
    benefits: ["Guaranteed admission", "Early commitment", "Clear requirements"],
  },
  {
    id: "tag-uc-irvine",
    name: "Transfer Admission Guarantee (TAG)",
    school: "UC Irvine",
    description: "Guaranteed admission pathway for qualified transfer students",
    benefits: ["Guaranteed admission", "Early commitment", "Major-specific paths"],
  },
  {
    id: "tag-uc-merced",
    name: "Transfer Admission Guarantee (TAG)",
    school: "UC Merced",
    description: "TAG agreement with minimum 2.4 GPA requirement",
    benefits: ["Guaranteed admission", "Low GPA threshold", "Financial aid access"],
  },
  {
    id: "honors-multiple",
    name: "Honors Transfer Program",
    school: "Multiple UCs",
    description: "Enhanced coursework and priority transfer consideration at participating UCs",
    benefits: ["Enhanced curriculum", "Transfer priority", "Academic recognition"],
  },
];

// ─── Sample Requirements for ChromaDB Ingestion ──────────────────────────────
export const TRANSFER_REQUIREMENTS = [
  {
    id: "ucb-cs-deanza",
    sourceCC: "De Anza",
    targetUni: "UC Berkeley",
    major: "Computer Science",
    content: "UC Berkeley CS Transfer: Requires CS 61A (equiv: De Anza CIS 22A), CS 61B (equiv: De Anza CIS 22B), CS 61C. Minimum 3.8 GPA. IGETC strongly recommended. Apply November 1-30. TAP/Honors boosts admission chances significantly.",
  },
  {
    id: "ucla-cs-deanza",
    sourceCC: "De Anza",
    targetUni: "UCLA",
    major: "Computer Science",
    content: "UCLA CS Transfer: Complete CS 31/32/33 equivalents. De Anza CIS 22A covers CS 31. Minimum 3.5 GPA, competitive admits average 3.8+. TAP program available for honors students. Apply November 1-30.",
  },
  {
    id: "ucsd-cs-deanza",
    sourceCC: "De Anza",
    targetUni: "UC San Diego",
    major: "Computer Science",
    content: "UCSD CS Transfer: Requires programming, data structures, discrete math, calculus I-II. De Anza CIS 22A, 22B fulfill programming/DS requirements. GPA 3.5+ expected. TAG not available for CS. Apply November 1-30.",
  },
  {
    id: "ucb-biology-deanza",
    sourceCC: "De Anza",
    targetUni: "UC Berkeley",
    major: "Biology",
    content: "UC Berkeley Biology Transfer: Requires BIOL 6A, 6B, 6C (De Anza BIOL 6A, 6B, 6C articulate directly), CHEM 1A/1B/1C, PHYS 4A/4B. Minimum 3.4 GPA. IGETC recommended.",
  },
  {
    id: "ucla-biology-deanza",
    sourceCC: "De Anza",
    targetUni: "UCLA",
    major: "Biology",
    content: "UCLA Biology Transfer: Requires BIOL 6A, 6B, 6C. Chemistry 1A, 1B, 1C. Physics 4A, 4B. Minimum GPA: 3.6. Complete IGETC for GE satisfaction.",
  },
  {
    id: "igetc-general",
    sourceCC: "De Anza",
    targetUni: "All UC/CSU",
    major: "General",
    content: "IGETC (Intersegmental General Education Transfer Curriculum): 6 units English Composition/Critical Thinking, 3 units Mathematical Concepts, 9 units Arts & Humanities, 9 units Social & Behavioral Sciences, 7-9 units Physical & Biological Sciences with lab, 0-6 units Language other than English. Satisfies lower-division GE at all UCs and CSUs.",
  },
  {
    id: "tag-requirements",
    sourceCC: "De Anza",
    targetUni: "UC Davis, UC Irvine, UC Merced, UC Riverside, UC Santa Barbara, UC Santa Cruz",
    major: "General",
    content: "Transfer Admission Guarantee (TAG): Available at 6 UC campuses. Requirements vary by campus but generally: 30 semester units completed, specific GPA (2.4-3.2), no more than 2 UC subject requirement deficiencies. Submit TAG application September 1-30, one year before transfer.",
  },
  {
    id: "deanza-smcc-deadlines",
    sourceCC: "De Anza",
    targetUni: "UC/CSU",
    major: "General",
    content: "Key Transfer Deadlines: UC Application opens November 1, closes November 30. CSU application opens October 1, closes November 30. TAG application: September 1-30. FAFSA/CADAA: October 1 for California colleges. Promise scholarships: varies by school, typically February-March. Schedule a counseling appointment by May of your first year.",
  },
];
