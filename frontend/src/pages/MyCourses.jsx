import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import enrollmentService from '../services/enrollmentService';

const MyCourses = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentService.getUserEnrollments(user.id);
      if (response.success) {
        setCourses(response.data.map(enrollment => ({
          ...enrollment.course,
          enrolledAt: enrollment.enrolledAt,
          lastAccessed: new Date(enrollment.enrolledAt).toLocaleDateString('id-ID')
        })));
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'inprogress') return !course.completed;
    if (filter === 'completed') return course.completed;
    return true;
  });

  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => !c.completed).length,
    completed: courses.filter(c => c.completed).length
  };

  const getRankColor = (rank) => {
    const colors = {
      'Genin': 'bg-green-100 text-green-700',
      'Chunin': 'bg-blue-100 text-blue-700',
      'Jonin': 'bg-purple-100 text-purple-700',
      'Hokage': 'bg-red-100 text-red-700'
    };
    return colors[rank] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 font-semibold">Memuat kursus Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-950 mb-2">Kursus Saya</h1>
          <p className="text-amber-800">Kelola dan lanjutkan pembelajaran ninja-mu</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <BookOpen className="text-amber-600 mb-3" size={32} />
            <p className="text-amber-700 text-sm font-medium mb-1">Total Kursus</p>
            <p className="text-3xl font-bold text-amber-950">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <Clock className="text-blue-600 mb-3" size={32} />
            <p className="text-blue-700 text-sm font-medium mb-1">Sedang Berjalan</p>
            <p className="text-3xl font-bold text-blue-950">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <Award className="text-green-600 mb-3" size={32} />
            <p className="text-green-700 text-sm font-medium mb-1">Selesai</p>
            <p className="text-3xl font-bold text-green-950">{stats.completed}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              onClick={() => setFilter('inprogress')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === 'inprogress'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
              }`}
            >
              Sedang Berjalan ({stats.inProgress})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                  : 'bg-green-100 text-green-900 hover:bg-green-200'
              }`}
            >
              Selesai ({stats.completed})
            </button>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-950 mb-2">{course.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-amber-700">
                        <span className={`px-3 py-1 rounded-full font-semibold ${getRankColor(course.rank)}`}>
                          {course.rank}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {course.duration}
                        </span>
                        <span>Terakhir diakses: {course.lastAccessed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-amber-700 font-medium">Progress</span>
                      <span className="text-amber-950 font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-600 to-amber-700 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {course.completed ? (
                    <Link
                      to={`/certificates`}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
                    >
                      <Award size={20} className="mr-2" />
                      Lihat Sertifikat
                    </Link>
                  ) : (
                    <Link
                      to={`/learn/${course.id}`}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition flex items-center"
                    >
                      <Play size={20} className="mr-2" />
                      Lanjutkan Belajar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border-2 border-amber-200">
            <BookOpen className="mx-auto text-amber-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-amber-950 mb-2">Belum ada kursus</h3>
            <p className="text-amber-700 mb-6">Mulai perjalanan ninja-mu dengan mendaftar kursus</p>
            <Link
              to="/courses"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition"
            >
              Browse Kursus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;