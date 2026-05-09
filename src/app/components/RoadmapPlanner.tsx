import { useState } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  category: 'GE' | 'Major Prep' | 'Elective';
  type: 'ASSIST' | 'CalGETC' | 'Regular';
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const AVAILABLE_COURSES: Course[] = [
  { id: '1', code: 'ENGL 1A', name: 'English Composition', units: 3, category: 'GE', type: 'CalGETC' },
  { id: '2', code: 'ENGL 1B', name: 'Critical Thinking', units: 3, category: 'GE', type: 'CalGETC' },
  { id: '3', code: 'MATH 3A', name: 'Calculus I', units: 5, category: 'Major Prep', type: 'ASSIST' },
  { id: '4', code: 'MATH 3B', name: 'Calculus II', units: 5, category: 'Major Prep', type: 'ASSIST' },
  { id: '5', code: 'CS 1A', name: 'Intro to Programming', units: 4, category: 'Major Prep', type: 'ASSIST' },
  { id: '6', code: 'CS 2A', name: 'Data Structures', units: 4, category: 'Major Prep', type: 'ASSIST' },
  { id: '7', code: 'PHYS 4A', name: 'Physics I', units: 5, category: 'Major Prep', type: 'ASSIST' },
  { id: '8', code: 'HIST 17A', name: 'US History I', units: 3, category: 'GE', type: 'CalGETC' },
  { id: '9', code: 'PSYCH 1', name: 'Introduction to Psychology', units: 3, category: 'GE', type: 'CalGETC' },
  { id: '10', code: 'ART 1A', name: 'Art History', units: 3, category: 'GE', type: 'Regular' },
];

export function RoadmapPlanner() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', name: 'Fall 2026', courses: [] },
    { id: '2', name: 'Spring 2027', courses: [] },
    { id: '3', name: 'Fall 2027', courses: [] },
    { id: '4', name: 'Spring 2028', courses: [] },
  ]);

  const [showCourseSelector, setShowCourseSelector] = useState<string | null>(null);

  const addCourseToSemester = (semesterId: string, course: Course) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        // Check if course already exists
        if (sem.courses.find(c => c.id === course.id)) {
          return sem;
        }
        return { ...sem, courses: [...sem.courses, course] };
      }
      return sem;
    }));
    setShowCourseSelector(null);
  };

  const removeCourseFromSemester = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return { ...sem, courses: sem.courses.filter(c => c.id !== courseId) };
      }
      return sem;
    }));
  };

  const getTotalUnits = (courses: Course[]) => {
    return courses.reduce((sum, course) => sum + course.units, 0);
  };

  const getCategoryColor = (category: Course['category']) => {
    switch (category) {
      case 'GE':
        return 'bg-blue-100 text-blue-700';
      case 'Major Prep':
        return 'bg-purple-100 text-purple-700';
      case 'Elective':
        return 'bg-green-100 text-green-700';
    }
  };

  const getTypeLabel = (type: Course['type']) => {
    switch (type) {
      case 'ASSIST':
        return 'ASSIST';
      case 'CalGETC':
        return 'CalGETC';
      case 'Regular':
        return 'Regular';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h4 className="text-lg text-gray-900 mb-2">Your Transfer Roadmap</h4>
        <p className="text-sm text-gray-600">
          Drag and drop courses to customize your semester-by-semester plan. This roadmap includes
          ASSIST articulated courses and CalGETC requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {semesters.map((semester) => (
          <div key={semester.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg text-gray-900">{semester.name}</h5>
              <div className="text-sm text-gray-600">
                {getTotalUnits(semester.courses)} units
              </div>
            </div>

            <div className="space-y-2 mb-4 min-h-[200px]">
              {semester.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-3 rounded-lg border border-gray-200 group hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400 mt-1 cursor-move" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900">
                            {course.code} - {course.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(course.category)}`}>
                              {course.category}
                            </span>
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                              {getTypeLabel(course.type)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm text-gray-600">{course.units}u</span>
                          <button
                            onClick={() => removeCourseFromSemester(semester.id, course.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCourseSelector(semester.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>

            {showCourseSelector === semester.id && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-300 max-h-60 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-700">Select a course:</div>
                  <button
                    onClick={() => setShowCourseSelector(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {AVAILABLE_COURSES.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => addCourseToSemester(semester.id, course)}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm text-gray-900">
                        {course.code} - {course.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                          {getTypeLabel(course.type)}
                        </span>
                        <span className="text-xs text-gray-600">{course.units} units</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-900 mb-2">Legend:</div>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-gray-700">GE Courses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span className="text-gray-700">Major Prep</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">ASSIST</span>
            <span className="text-gray-700">= Articulated with target UC/CSU</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">CalGETC</span>
            <span className="text-gray-700">= California GE Transfer Curriculum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
