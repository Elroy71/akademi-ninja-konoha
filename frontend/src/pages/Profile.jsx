import React, { useState } from 'react';
import { User, Mail, Award, Calendar, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Naruto Uzumaki',
    email: user?.email || 'naruto@konoha.com'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // TODO: Implement save to backend
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const rankInfo = {
    current: user?.ninjaRank || 'Genin',
    level: 1,
    nextRank: 'Chunin',
    progressToNext: 65
  };

  const achievements = [
    { id: 1, title: 'First Course', desc: 'Menyelesaikan kursus pertama', date: '20 Des 2024', icon: '🎯' },
    { id: 2, title: 'Fast Learner', desc: 'Menyelesaikan 3 kursus dalam sebulan', date: '1 Jan 2025', icon: '⚡' },
    { id: 3, title: 'Perfect Score', desc: 'Mendapat nilai 100 di ujian', date: '15 Jan 2025', icon: '💯' }
  ];

  const getRankColor = (rank) => {
    const colors = {
      'Genin': 'from-green-600 to-green-700',
      'Chunin': 'from-blue-600 to-blue-700',
      'Jonin': 'from-purple-600 to-purple-700',
      'Hokage': 'from-red-600 to-red-700'
    };
    return colors[rank] || 'from-gray-600 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-950 mb-2">Profil Saya</h1>
          <p className="text-amber-800">Kelola informasi dan lihat progressmu</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            {/* Avatar & Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 mb-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-white text-5xl font-bold">
                    {formData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold text-amber-950 mb-1">{formData.name}</h2>
                    <p className="text-amber-700 mb-4">{formData.email}</p>
                  </>
                ) : (
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition flex items-center mx-auto"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profil
                  </button>
                ) : (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Simpan
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Rank Progress */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
              <h3 className="text-lg font-bold text-amber-950 mb-4">Ninja Rank</h3>
              <div className={`bg-gradient-to-r ${getRankColor(rankInfo.current)} text-white rounded-xl p-4 mb-4 text-center`}>
                <Award size={32} className="mx-auto mb-2" />
                <p className="text-2xl font-bold">{rankInfo.current}</p>
                <p className="text-sm opacity-90">Level {rankInfo.level}</p>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-amber-700">Progress ke {rankInfo.nextRank}</span>
                  <span className="font-bold text-amber-950">{rankInfo.progressToNext}%</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 h-full rounded-full transition-all"
                    style={{ width: `${rankInfo.progressToNext}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-amber-700 text-center">
                Selesaikan ujian untuk naik ke rank {rankInfo.nextRank}
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                <User className="text-amber-600 mb-3" size={32} />
                <p className="text-amber-700 text-sm font-medium mb-1">Member Since</p>
                <p className="text-xl font-bold text-amber-950">Des 2024</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                <Award className="text-blue-600 mb-3" size={32} />
                <p className="text-blue-700 text-sm font-medium mb-1">Certificates</p>
                <p className="text-xl font-bold text-blue-950">5</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                <Calendar className="text-green-600 mb-3" size={32} />
                <p className="text-green-700 text-sm font-medium mb-1">Courses</p>
                <p className="text-xl font-bold text-green-950">8</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-amber-950 mb-4">Pencapaian</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start p-4 bg-amber-50 rounded-lg border-2 border-amber-100">
                    <div className="text-4xl mr-4">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-950 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-amber-700 mb-1">{achievement.desc}</p>
                      <p className="text-xs text-amber-600 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
              <h3 className="text-xl font-bold text-amber-950 mb-4">Aktivitas Terakhir</h3>
              <div className="space-y-3">
                {[
                  { action: 'Menyelesaikan modul', detail: 'Hand Seals Dasar', time: '2 jam lalu' },
                  { action: 'Mendapat sertifikat', detail: 'Pengenalan Taijutsu', time: '1 hari lalu' },
                  { action: 'Mendaftar kursus', detail: 'Teknik Chakra Control', time: '3 hari lalu' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-2 border-amber-100 rounded-lg">
                    <div>
                      <p className="font-semibold text-amber-950">{activity.action}</p>
                      <p className="text-sm text-amber-700">{activity.detail}</p>
                    </div>
                    <p className="text-xs text-amber-600">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;