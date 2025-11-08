import React from 'react';
import { Award, BookOpen, Trophy, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Dummy data
  const stats = [
    { icon: BookOpen, label: 'Kursus Aktif', value: '3', color: 'from-blue-500 to-blue-600' },
    { icon: Trophy, label: 'Kursus Selesai', value: '5', color: 'from-green-500 to-green-600' },
    { icon: Award, label: 'Sertifikat', value: '5', color: 'from-purple-500 to-purple-600' },
    { icon: Target, label: 'Progress Total', value: '65%', color: 'from-amber-500 to-amber-600' }
  ];

  const activeCourses = [
    { id: 1, title: 'Dasar-dasar Ninjutsu', progress: 75, rank: 'Genin' },
    { id: 2, title: 'Genjutsu untuk Pemula', progress: 45, rank: 'Genin' },
    { id: 3, title: 'Teknik Chakra Control', progress: 30, rank: 'Chunin' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-950 mb-2">
            Selamat Datang, {user?.name || 'Ninja'}! 🥷
          </h1>
          <p className="text-amber-800">
            Ranking Saat Ini: <span className="font-bold text-amber-900">{user?.ninjaRank || 'Genin'}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <p className="text-amber-700 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-amber-950">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Courses */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-950">Kursus Aktif</h2>
            <Link to="/courses" className="text-amber-700 hover:text-amber-900 font-semibold">
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="border-2 border-amber-100 rounded-xl p-4 hover:border-amber-300 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-amber-950 text-lg">{course.title}</h3>
                    <span className="text-sm text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mt-2">
                      {course.rank}
                    </span>
                  </div>
                  <Link 
                    to={`/learn/${course.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition"
                  >
                    Lanjutkan
                  </Link>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-sm text-amber-700 mt-2">{course.progress}% selesai</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/courses" className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition text-center">
            <BookOpen className="mx-auto text-amber-600 mb-4" size={48} />
            <h3 className="font-bold text-amber-950 text-lg mb-2">Browse Kursus</h3>
            <p className="text-amber-700 text-sm">Temukan kursus baru</p>
          </Link>
          <Link to="/certificates" className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition text-center">
            <Award className="mx-auto text-amber-600 mb-4" size={48} />
            <h3 className="font-bold text-amber-950 text-lg mb-2">Sertifikat Saya</h3>
            <p className="text-amber-700 text-sm">Lihat pencapaianmu</p>
          </Link>
          <Link to="/profile" className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition text-center">
            <Target className="mx-auto text-amber-600 mb-4" size={48} />
            <h3 className="font-bold text-amber-950 text-lg mb-2">Profil</h3>
            <p className="text-amber-700 text-sm">Kelola akunmu</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;