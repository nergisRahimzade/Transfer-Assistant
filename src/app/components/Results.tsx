import { useState } from 'react';
import { BookOpen, CheckCircle, GraduationCap, Map, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { RoadmapPlanner } from './RoadmapPlanner';

const REQUIRED_CLASSES = [
  { code: 'ENGL 1A', name: 'English Composition', units: 3, category: 'GE' },
  { code: 'ENGL 1B', name: 'Critical Thinking & Writing', units: 3, category: 'GE' },
  { code: 'MATH 3A', name: 'Calculus I', units: 5, category: 'Major Prep' },
  { code: 'MATH 3B', name: 'Calculus II', units: 5, category: 'Major Prep' },
  { code: 'CS 1A', name: 'Introduction to Programming', units: 4, category: 'Major Prep' },
  { code: 'CS 2A', name: 'Data Structures', units: 4, category: 'Major Prep' },
];

const ADDITIONAL_APPROVED = [
  { code: 'MATH 3C', name: 'Calculus III', units: 5, category: 'Major Prep' },
  { code: 'PHYS 4A', name: 'Physics for Scientists I', units: 5, category: 'Major Prep' },
  { code: 'CS 2B', name: 'Algorithms', units: 4, category: 'Major Prep' },
  { code: 'PHIL 10', name: 'Critical Thinking', units: 3, category: 'GE' },
];

const PROGRAMS = [
  {
    id: '1',
    name: 'Transfer Alliance Program (TAP)',
    school: 'UCLA',
    description: 'Priority consideration for admission and scholarship opportunities',
    benefits: ['Priority review', 'Scholarship access', 'Academic counseling'],
  },
  {
    id: '2',
    name: 'Transfer Admission Guarantee (TAG)',
    school: 'UC Davis',
    description: 'Guaranteed admission if you meet specific requirements',
    benefits: ['Guaranteed admission', 'Early commitment', 'Clear requirements'],
  },
  {
    id: '3',
    name: 'Honors Program',
    school: 'Multiple UCs',
    description: 'Enhanced coursework and priority transfer consideration',
    benefits: ['Enhanced curriculum', 'Transfer priority', 'Academic recognition'],
  },
];

export function Results() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('edplan');

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
                    <div className="text-lg text-gray-900">UC Berkeley</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-600 mb-1">Major</div>
                    <div className="text-lg text-gray-900">Computer Science</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Transfer Timeline</div>
                    <div className="text-lg text-gray-900">2 Years</div>
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
                    {REQUIRED_CLASSES.length} required, {ADDITIONAL_APPROVED.length} additional
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
                    <h4 className="text-sm text-gray-600 mb-3">REQUIRED CLASSES</h4>
                    <div className="space-y-2">
                      {REQUIRED_CLASSES.map((course, idx) => (
                        <div
                          key={idx}
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
                  <div>
                    <h4 className="text-sm text-gray-600 mb-3">ADDITIONALLY APPROVED CLASSES</h4>
                    <div className="space-y-2">
                      {ADDITIONAL_APPROVED.map((course, idx) => (
                        <div
                          key={idx}
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
                    {PROGRAMS.length} programs available for you
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
                  {PROGRAMS.map((program) => (
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
      </div>
    </section>
  );
}
