import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Trophy, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import enrollmentService from '../services/enrollmentService';
import certificateService from '../services/certificateService';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [enrollmentsRes, certificatesRes] = await Promise.all([
        enrollmentService.getUserEnrollments(user.id),
        certificateService.getUserCertificates(user.id)
      ]);

      if (enrollmentsRes.success) {
        setEnrollments(enrollmentsRes.data);
      }

      if (certificatesRes.success) {
        setCertificates(certificatesRes.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Statistik
  const activeCourses = enrollments.filter(e => !e.course.completed);
  const completedCourses = enrollments.filter(e => e.course.completed);
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.course.progress, 0) / enrollments.length)
    : 0;

  const stats = [
    { icon: BookOpen, label: 'Kursus Aktif', value: activeCourses.length.toString(), color: 'from-blue-500 to-blue-600' },
    { icon: Trophy, label: 'Kursus Selesai', value: completedCourses.length.toString(), color: 'from-green-500 to-green-600' },
    { icon: Award, label: 'Sertifikat', value: certificates.length.toString(), color: 'from-purple-500 to-purple-600' },
    { icon: Target, label: 'Progress Total', value: `${avgProgress}%`, color: 'from-amber-500 to-amber-600' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 font-semibold">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
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
          <Link to="/my-courses" className="text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Semua →
          </Link>
        </div>
        {activeCourses.length > 0 ? (
          <div className="space-y-4">
            {activeCourses.slice(0, 3).map((enrollment) => (
              <div key={enrollment.course.id} className="border-2 border-amber-100 rounded-xl p-4 hover:border-amber-300 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-amber-950 text-lg">{enrollment.course.title}</h3>
                    <span className="text-sm text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mt-2">
                      {enrollment.course.rankLevel}
                    </span>
                  </div>
                  <Link
                    to={`/learn/${enrollment.course.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition"
                  >
                    Lanjutkan
                  </Link>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-700 h-full rounded-full transition-all duration-500"
                    style={{ width: `${enrollment.course.progress}%` }}
                  />
                </div>
                <p className="text-sm text-amber-700 mt-2">{enrollment.course.progress}% selesai</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="mx-auto text-amber-400 mb-3" size={48} />
            <p className="text-amber-700">Belum ada kursus aktif</p>
            <Link to="/courses" className="text-amber-600 hover:text-amber-800 font-semibold mt-2 inline-block">
              Browse Kursus →
            </Link>
          </div>
        )}
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
  );
};

export default Dashboard;