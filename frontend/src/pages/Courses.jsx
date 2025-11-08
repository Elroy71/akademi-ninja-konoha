import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');

  // Dummy courses data
  const courses = [
    { id: 1, title: 'Dasar-dasar Ninjutsu', rank: 'Genin', duration: '4 jam', modules: 12, enrolled: 234 },
    { id: 2, title: 'Genjutsu untuk Pemula', rank: 'Genin', duration: '3 jam', modules: 8, enrolled: 189 },
    { id: 3, title: 'Teknik Chakra Control', rank: 'Chunin', duration: '5 jam', modules: 15, enrolled: 156 },
    { id: 4, title: 'Taijutsu Advanced', rank: 'Chunin', duration: '6 jam', modules: 18, enrolled: 98 },
    { id: 5, title: 'Strategi Pertempuran Jonin', rank: 'Jonin', duration: '8 jam', modules: 24, enrolled: 67 },
    { id: 6, title: 'Kepemimpinan Hokage', rank: 'Hokage', duration: '10 jam', modules: 30, enrolled: 45 }
  ];

  const ranks = ['all', 'Genin', 'Chunin', 'Jonin', 'Hokage'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = selectedRank === 'all' || course.rank === selectedRank;
    return matchesSearch && matchesRank;
  });

  const getRankColor = (rank) => {
    const colors = {
      'Genin': 'bg-green-100 text-green-700',
      'Chunin': 'bg-blue-100 text-blue-700',
      'Jonin': 'bg-purple-100 text-purple-700',
      'Hokage': 'bg-red-100 text-red-700'
    };
    return colors[rank] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-950 mb-2">Browse Kursus</h1>
          <p className="text-amber-800">Temukan kursus yang sesuai dengan level ninja-mu</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
              <input
                type="text"
                placeholder="Cari kursus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Filter by Rank */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">Semua Rank</option>
                {ranks.slice(1).map(rank => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-amber-800 font-medium">
            Menampilkan {filteredCourses.length} dari {courses.length} kursus
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Course Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center">
                <BookOpen className="text-white" size={64} />
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-amber-950 flex-1">{course.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRankColor(course.rank)}`}>
                    {course.rank}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-amber-700 text-sm">
                    <Clock size={16} className="mr-2" />
                    {course.duration} • {course.modules} modul
                  </div>
                  <div className="flex items-center text-amber-700 text-sm">
                    <Award size={16} className="mr-2" />
                    {course.enrolled} ninja terdaftar
                  </div>
                </div>

                <Link 
                  to={`/course/${course.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-center hover:from-amber-700 hover:to-amber-800 transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-amber-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-amber-950 mb-2">Kursus tidak ditemukan</h3>
            <p className="text-amber-700">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;