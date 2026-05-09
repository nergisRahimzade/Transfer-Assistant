import { BookOpen, Calendar, ExternalLink, FileText, Globe } from 'lucide-react';

const RESOURCES = [
  {
    icon: Globe,
    title: 'ASSIST.org',
    description: 'Official transfer course articulation system for California colleges',
    link: 'https://assist.org',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Transfer Admission Planner',
    description: 'UC tool to track your progress toward transfer requirements',
    link: '#',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FileText,
    title: 'CSU Application',
    description: 'Apply to any of the 23 CSU campuses',
    link: '#',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FileText,
    title: 'UC Application',
    description: 'Apply to University of California campuses',
    link: '#',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: BookOpen,
    title: 'IGETC Guide',
    description: 'Learn about general education requirements',
    link: '#',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Calendar,
    title: 'Transfer Timeline',
    description: 'Important deadlines and milestones',
    link: '#',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export function Resources() {
  return (
    <section id="resources" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">Transfer Resources</h2>
          <p className="text-lg text-gray-600">Everything you need to successfully transfer</p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center mb-4`}>
                <resource.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900 flex items-center gap-2">
                {resource.title}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-600">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
