import { useState } from 'react';
import { Search, MapPin, Users, TrendingUp } from 'lucide-react';

interface School {
  id: string;
  name: string;
  system: 'UC' | 'CSU';
  location: string;
  enrollment: string;
  acceptanceRate: string;
  avgGPA: string;
  color: string;
}

const SCHOOLS: School[] = [
  // UC Schools (9 campuses)
  {
    id: '1',
    name: 'UC Berkeley',
    system: 'UC',
    location: 'Berkeley, CA',
    enrollment: '45,000',
    acceptanceRate: '24%',
    avgGPA: '3.7',
    color: 'from-blue-500 to-yellow-500',
  },
  {
    id: '2',
    name: 'UCLA',
    system: 'UC',
    location: 'Los Angeles, CA',
    enrollment: '46,000',
    acceptanceRate: '26%',
    avgGPA: '3.8',
    color: 'from-blue-600 to-yellow-400',
  },
  {
    id: '3',
    name: 'UC San Diego',
    system: 'UC',
    location: 'San Diego, CA',
    enrollment: '42,000',
    acceptanceRate: '34%',
    avgGPA: '3.6',
    color: 'from-blue-500 to-yellow-600',
  },
  {
    id: '4',
    name: 'UC Davis',
    system: 'UC',
    location: 'Davis, CA',
    enrollment: '40,000',
    acceptanceRate: '49%',
    avgGPA: '3.5',
    color: 'from-blue-600 to-yellow-500',
  },
  {
    id: '5',
    name: 'UC Irvine',
    system: 'UC',
    location: 'Irvine, CA',
    enrollment: '36,000',
    acceptanceRate: '41%',
    avgGPA: '3.6',
    color: 'from-blue-500 to-yellow-400',
  },
  {
    id: '6',
    name: 'UC Santa Barbara',
    system: 'UC',
    location: 'Santa Barbara, CA',
    enrollment: '26,000',
    acceptanceRate: '37%',
    avgGPA: '3.6',
    color: 'from-blue-600 to-blue-400',
  },
  {
    id: '7',
    name: 'UC Santa Cruz',
    system: 'UC',
    location: 'Santa Cruz, CA',
    enrollment: '19,000',
    acceptanceRate: '65%',
    avgGPA: '3.3',
    color: 'from-blue-500 to-yellow-600',
  },
  {
    id: '8',
    name: 'UC Riverside',
    system: 'UC',
    location: 'Riverside, CA',
    enrollment: '26,000',
    acceptanceRate: '69%',
    avgGPA: '3.3',
    color: 'from-blue-600 to-yellow-500',
  },
  {
    id: '9',
    name: 'UC Merced',
    system: 'UC',
    location: 'Merced, CA',
    enrollment: '9,000',
    acceptanceRate: '89%',
    avgGPA: '3.0',
    color: 'from-blue-500 to-yellow-400',
  },
  // CSU Schools (23 campuses)
  {
    id: '10',
    name: 'San Diego State',
    system: 'CSU',
    location: 'San Diego, CA',
    enrollment: '36,000',
    acceptanceRate: '38%',
    avgGPA: '3.4',
    color: 'from-red-600 to-black',
  },
  {
    id: '11',
    name: 'Cal Poly San Luis Obispo',
    system: 'CSU',
    location: 'San Luis Obispo, CA',
    enrollment: '22,000',
    acceptanceRate: '30%',
    avgGPA: '3.5',
    color: 'from-green-600 to-yellow-500',
  },
  {
    id: '12',
    name: 'Cal Poly Pomona',
    system: 'CSU',
    location: 'Pomona, CA',
    enrollment: '31,000',
    acceptanceRate: '55%',
    avgGPA: '3.2',
    color: 'from-green-700 to-yellow-600',
  },
  {
    id: '13',
    name: 'San Francisco State',
    system: 'CSU',
    location: 'San Francisco, CA',
    enrollment: '25,000',
    acceptanceRate: '92%',
    avgGPA: '3.0',
    color: 'from-purple-600 to-yellow-500',
  },
  {
    id: '14',
    name: 'San José State',
    system: 'CSU',
    location: 'San José, CA',
    enrollment: '36,000',
    acceptanceRate: '77%',
    avgGPA: '3.1',
    color: 'from-blue-700 to-yellow-500',
  },
  {
    id: '15',
    name: 'Cal State Long Beach',
    system: 'CSU',
    location: 'Long Beach, CA',
    enrollment: '39,000',
    acceptanceRate: '44%',
    avgGPA: '3.3',
    color: 'from-yellow-600 to-black',
  },
  {
    id: '16',
    name: 'Cal State Fullerton',
    system: 'CSU',
    location: 'Fullerton, CA',
    enrollment: '41,000',
    acceptanceRate: '67%',
    avgGPA: '3.2',
    color: 'from-blue-600 to-orange-500',
  },
  {
    id: '17',
    name: 'Cal State Northridge',
    system: 'CSU',
    location: 'Northridge, CA',
    enrollment: '38,000',
    acceptanceRate: '91%',
    avgGPA: '3.0',
    color: 'from-red-600 to-white',
  },
  {
    id: '18',
    name: 'Sacramento State',
    system: 'CSU',
    location: 'Sacramento, CA',
    enrollment: '31,000',
    acceptanceRate: '95%',
    avgGPA: '2.9',
    color: 'from-green-700 to-yellow-600',
  },
  {
    id: '19',
    name: 'Fresno State',
    system: 'CSU',
    location: 'Fresno, CA',
    enrollment: '25,000',
    acceptanceRate: '97%',
    avgGPA: '2.9',
    color: 'from-red-600 to-blue-600',
  },
  {
    id: '20',
    name: 'Cal State LA',
    system: 'CSU',
    location: 'Los Angeles, CA',
    enrollment: '28,000',
    acceptanceRate: '88%',
    avgGPA: '2.9',
    color: 'from-yellow-500 to-black',
  },
  {
    id: '21',
    name: 'Cal State East Bay',
    system: 'CSU',
    location: 'Hayward, CA',
    enrollment: '15,000',
    acceptanceRate: '87%',
    avgGPA: '2.9',
    color: 'from-blue-600 to-red-600',
  },
  {
    id: '22',
    name: 'Chico State',
    system: 'CSU',
    location: 'Chico, CA',
    enrollment: '16,000',
    acceptanceRate: '93%',
    avgGPA: '3.0',
    color: 'from-red-700 to-black',
  },
  {
    id: '23',
    name: 'Sonoma State',
    system: 'CSU',
    location: 'Rohnert Park, CA',
    enrollment: '9,000',
    acceptanceRate: '96%',
    avgGPA: '2.9',
    color: 'from-blue-600 to-green-600',
  },
  {
    id: '24',
    name: 'Cal State Monterey Bay',
    system: 'CSU',
    location: 'Seaside, CA',
    enrollment: '7,500',
    acceptanceRate: '95%',
    avgGPA: '2.9',
    color: 'from-blue-700 to-teal-600',
  },
  {
    id: '25',
    name: 'Humboldt State',
    system: 'CSU',
    location: 'Arcata, CA',
    enrollment: '7,000',
    acceptanceRate: '98%',
    avgGPA: '2.8',
    color: 'from-green-700 to-yellow-600',
  },
  {
    id: '26',
    name: 'Cal State San Bernardino',
    system: 'CSU',
    location: 'San Bernardino, CA',
    enrollment: '20,000',
    acceptanceRate: '94%',
    avgGPA: '2.8',
    color: 'from-blue-600 to-gray-600',
  },
  {
    id: '27',
    name: 'Cal State Bakersfield',
    system: 'CSU',
    location: 'Bakersfield, CA',
    enrollment: '11,000',
    acceptanceRate: '99%',
    avgGPA: '2.7',
    color: 'from-blue-700 to-red-600',
  },
  {
    id: '28',
    name: 'Cal State Dominguez Hills',
    system: 'CSU',
    location: 'Carson, CA',
    enrollment: '18,000',
    acceptanceRate: '89%',
    avgGPA: '2.8',
    color: 'from-red-600 to-black',
  },
  {
    id: '29',
    name: 'Cal State Stanislaus',
    system: 'CSU',
    location: 'Turlock, CA',
    enrollment: '10,000',
    acceptanceRate: '98%',
    avgGPA: '2.8',
    color: 'from-red-700 to-blue-700',
  },
  {
    id: '30',
    name: 'Cal State San Marcos',
    system: 'CSU',
    location: 'San Marcos, CA',
    enrollment: '15,000',
    acceptanceRate: '86%',
    avgGPA: '3.0',
    color: 'from-blue-600 to-orange-500',
  },
  {
    id: '31',
    name: 'Cal State Channel Islands',
    system: 'CSU',
    location: 'Camarillo, CA',
    enrollment: '7,000',
    acceptanceRate: '94%',
    avgGPA: '2.9',
    color: 'from-blue-700 to-teal-600',
  },
  {
    id: '32',
    name: 'Cal Maritime Academy',
    system: 'CSU',
    location: 'Vallejo, CA',
    enrollment: '1,100',
    acceptanceRate: '88%',
    avgGPA: '3.0',
    color: 'from-blue-800 to-yellow-600',
  },
];

export function SchoolExplorer() {
  const [filter, setFilter] = useState<'all' | 'UC' | 'CSU'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = SCHOOLS.filter(school => {
    const matchesFilter = filter === 'all' || school.system === filter;
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="schools" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">Explore Transfer Schools</h2>
          <p className="text-lg text-gray-600">Discover UC and CSU campuses accepting transfer students</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('CSU')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                filter === 'CSU'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              CSU
            </button>
          </div>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-32 bg-gradient-to-br ${school.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl mb-1 text-gray-900">{school.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{school.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    school.system === 'UC'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {school.system}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{school.enrollment} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Avg Transfer GPA: {school.avgGPA}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">Transfer Acceptance Rate</div>
                    <div className="text-2xl text-blue-600">{school.acceptanceRate}</div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
