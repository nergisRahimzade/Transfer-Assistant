import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, GraduationCap, Map, Sparkles, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { RoadmapPlanner } from './RoadmapPlanner';
import type { StudentProfile } from '../../types/index.js';

interface ResultsProps {
  profile?: StudentProfile | null;
}

interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  category: string;
  type: string;
}

interface Program {
  id: string;
  name: string;
  school: string;
  description: string;
  benefits: string[];
}

export function Results({ profile }: ResultsProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('edplan');
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/courses').then(r => r.json()),
      fetch('/api/programs').then(r => r.json()),
    ])
      .then(([coursesData, programsData]) => {
        setCourses(coursesData);
        setPrograms(programsData);
      })
      .catch(err => console.error('Failed to load data from API:', err))
      .finally(() => setLoading(false));
  }, []);

  // ASSIST = major prep (required), CalGETC = GE (additional approved)
  const required = courses.filter(c => c.type === 'ASSIST');
  const additional = courses.filter(c => c.type === 'CalGETC');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="results" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Plan Generated</span>
          </div>
          <h2 className="text-4xl mb-4 text-gray-900">Your Transfer Plan</h2>
          <p className="text-lg text-gray-600">
            Here's your personalized roadmap to transfer success
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 gap-3 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading your plan...</span>
          </div>
        ) : (
        <div className="space-y-6">
          {/* Education Plan */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('edplan')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl text-gray-900">Student Education Plan</h3>
                  <p className="text-sm text-gray-600">Your personalized academic pathway</p>
                </div>
              </div>
              {expandedSection === 'edplan' ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSection === 'edplan' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Target School</div>
                    <div className="text-lg text-gray-900">{profile?.targetSchool || 'Not set'}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-600 mb-1">Major</div>
                    <div className="text-lg text-gray-900">{profile?.major || 'Not set'}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Transfer Timeline</div>
                    <div className="text-lg text-gray-900">{profile ? `${profile.transferYears} Year${profile.transferYears !== 1 ? 's' : ''}` : 'Not set'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Required Classes */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('required')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl text-gray-900">Required & Approved Classes</h3>
                  <p className="text-sm text-gray-600">
                    {required.length} major prep, {additional.length} GE courses
                  </p>
                </div>
              </div>
              {expandedSection === 'required' ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSection === 'required' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-600 mb-3">MAJOR PREP (ASSIST)</h4>
                    <div className="space-y-2">
                      {required.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                        >
                          <div>
                            <div className="text-gray-900">
                              {course.code} - {course.name}
                            </div>
                            <div className="text-sm text-gray-600">{course.category}</div>
                          </div>
                          <div className="text-sm text-gray-700">{course.units} units</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {additional.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-600 mb-3">GENERAL EDUCATION (CalGETC)</h4>
                    <div className="space-y-2">
                      {additional.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                        >
                          <div>
                            <div className="text-gray-900">
                              {course.code} - {course.name}
                            </div>
                            <div className="text-sm text-gray-600">{course.category}</div>
                          </div>
                          <div className="text-sm text-gray-700">{course.units} units</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Programs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('programs')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl text-gray-900">Exploring Programs</h3>
                  <p className="text-sm text-gray-600">
                    {programs.length} programs available for you
                  </p>
                </div>
              </div>
              {expandedSection === 'programs' ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSection === 'programs' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4 space-y-3">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      onClick={() =>
                        setSelectedProgram(
                          selectedProgram === program.id ? null : program.id
                        )
                      }
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg text-gray-900">{program.name}</h4>
                          <div className="text-sm text-blue-600">{program.school}</div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Click for AI Summary
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                      {selectedProgram === program.id && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-700">
                              <strong>AI Summary:</strong> The {program.name} is an excellent
                              opportunity for motivated students. This program offers{' '}
                              {program.benefits.join(', ').toLowerCase()}. To qualify, maintain a
                              strong GPA and complete your major prerequisites on time. This
                              program significantly increases your transfer success rate.
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {program.benefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Roadmap */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setShowRoadmap(!showRoadmap)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Map className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl text-gray-900">Transfer Roadmap</h3>
                  <p className="text-sm text-gray-600">
                    Customize your semester-by-semester plan
                  </p>
                </div>
              </div>
              {showRoadmap ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {showRoadmap && (
              <div className="border-t border-gray-200">
                <RoadmapPlanner />
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
