import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import type { StudentProfile } from '../../types/index.js';

interface GetStartedProps {
  onClose: () => void;
  onSave: (profile: StudentProfile) => void;
}

// Re-export so any existing imports keep working
export type { StudentProfile };

const COMMUNITY_COLLEGES = [
  'Santa Monica College',
  'De Anza College',
  'Diablo Valley College',
  'Orange Coast College',
  'Foothill College',
  'Pasadena City College',
  'Mt. San Antonio College',
  'City College of San Francisco',
  'Other',
];

const UC_CSU_SCHOOLS = [
  'UC Berkeley',
  'UCLA',
  'UC San Diego',
  'UC Davis',
  'UC Irvine',
  'UC Santa Barbara',
  'UC Santa Cruz',
  'UC Riverside',
  'UC Merced',
  'San Diego State',
  'Cal Poly SLO',
  'Cal Poly Pomona',
  'SF State',
  'San José State',
  'Cal State Long Beach',
  'Other',
];

export function GetStarted({ onClose, onSave }: GetStartedProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>({
    isResident: true,
    communityCollege: '',
    targetSchool: '',
    major: '',
    financialAid: false,
    goals: '',
    activities: '',
    transferYears: 2,
    hasAPCredit: false,
    hasIBCredit: false,
    hasDualEnrollment: false,
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSave(profile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900">Get Started</h2>
            <p className="text-sm text-gray-600">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-4 text-gray-900">Basic Information</h3>
              </div>

              {/* Resident Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-gray-900">Student Status</label>
                  <p className="text-sm text-gray-600">
                    {profile.isResident ? 'California Resident' : 'International Student'}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProfile({ ...profile, isResident: !profile.isResident })
                  }
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    profile.isResident ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      profile.isResident ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Community College */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Current Community College
                </label>
                <select
                  value={profile.communityCollege}
                  onChange={(e) =>
                    setProfile({ ...profile, communityCollege: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your college</option>
                  {COMMUNITY_COLLEGES.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target School */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Target UC/CSU School
                </label>
                <select
                  value={profile.targetSchool}
                  onChange={(e) =>
                    setProfile({ ...profile, targetSchool: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select target school</option>
                  {UC_CSU_SCHOOLS.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>

              {/* Major */}
              <div>
                <label className="block text-gray-900 mb-2">Intended Major</label>
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  placeholder="e.g., Computer Science, Biology, Business"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Goals & Activities */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-4 text-gray-900">Goals & Activities</h3>
              </div>

              {/* Financial Aid */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.financialAid}
                  onChange={(e) =>
                    setProfile({ ...profile, financialAid: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <label className="text-gray-900">
                    Interested in Scholarships/Financial Aid
                  </label>
                  <p className="text-sm text-gray-600">
                    Get information about financial aid packages
                  </p>
                </div>
              </div>

              {/* Student Goals */}
              <div>
                <label className="block text-gray-900 mb-2">
                  What do you want to achieve?
                </label>
                <textarea
                  value={profile.goals}
                  onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                  placeholder="Describe your academic and career goals..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Activities */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Programs, Extracurriculars, Volunteering
                </label>
                <textarea
                  value={profile.activities}
                  onChange={(e) =>
                    setProfile({ ...profile, activities: e.target.value })
                  }
                  placeholder="List any programs, clubs, volunteer work, or activities you're interested in or currently involved with..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Transfer Timeline */}
              <div>
                <label className="block text-gray-900 mb-2">
                  Transfer Timeline (Years)
                </label>
                <div className="flex gap-3">
                  {[2, 3, 4].map((years) => (
                    <button
                      key={years}
                      onClick={() => setProfile({ ...profile, transferYears: years })}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                        profile.transferYears === years
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {years} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Credits */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-4 text-gray-900">Prior Credits</h3>
                <p className="text-gray-600">
                  Do you have any prior college credits or exam credits?
                </p>
              </div>

              {/* AP Credit */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={profile.hasAPCredit}
                    onChange={(e) =>
                      setProfile({ ...profile, hasAPCredit: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-gray-900">AP (Advanced Placement) Credits</label>
                </div>
                {profile.hasAPCredit && (
                  <textarea
                    value={profile.apCredits || ''}
                    onChange={(e) =>
                      setProfile({ ...profile, apCredits: e.target.value })
                    }
                    placeholder="List your AP exams and scores (e.g., AP Calculus AB - 5, AP English Language - 4)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              </div>

              {/* IB Credit */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={profile.hasIBCredit}
                    onChange={(e) =>
                      setProfile({ ...profile, hasIBCredit: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-gray-900">
                    IB (International Baccalaureate) Credits
                  </label>
                </div>
                {profile.hasIBCredit && (
                  <textarea
                    value={profile.ibCredits || ''}
                    onChange={(e) =>
                      setProfile({ ...profile, ibCredits: e.target.value })
                    }
                    placeholder="List your IB exams and scores (e.g., IB Math HL - 7, IB Biology SL - 6)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              </div>

              {/* Dual Enrollment */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={profile.hasDualEnrollment}
                    onChange={(e) =>
                      setProfile({ ...profile, hasDualEnrollment: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-gray-900">Dual Enrollment Credits</label>
                </div>
                {profile.hasDualEnrollment && (
                  <textarea
                    value={profile.dualEnrollmentCredits || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dualEnrollmentCredits: e.target.value,
                      })
                    }
                    placeholder="List courses taken through dual enrollment and credits earned"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate My Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
