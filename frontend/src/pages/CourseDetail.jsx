import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Award, Users, CheckCircle, Play, ArrowLeft } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [enrolled, setEnrolled] = useState(false);

  // Dummy course data
  const course = {
    id: parseInt(id),
    title: 'Dasar-dasar Ninjutsu',
    rank: 'Genin',
    duration: '4 jam',
    modules: 12,
    enrolled: 234,
    description: 'Pelajari fundamental teknik ninjutsu dari dasar. Kursus ini dirancang khusus untuk ninja pemula yang ingin memahami chakra, hand seals, dan teknik-teknik dasar yang akan menjadi fondasi perjalanan ninja-mu.',
    instructor: 'Kakashi Hatake',
    whatYouLearn: [
      'Memahami konsep dasar chakra dan kontrolnya',
      'Menguasai 12 hand seals fundamental',
      'Teknik transformasi dan substitusi dasar',
      'Menerapkan strategi pertempuran basic',
      'Membangun stamina dan ketahanan fisik'
    ],
    syllabus: [
      { id: 1, title: 'Pengenalan Ninjutsu', duration: '20 menit', type: 'video' },
      { id: 2, title: 'Chakra: Sumber Kekuatan Ninja', duration: '25 menit', type: 'video' },
      { id: 3, title: 'Hand Seals Dasar (Part 1)', duration: '30 menit', type: 'video' },
      { id: 4, title: 'Hand Seals Dasar (Part 2)', duration: '30 menit', type: 'video' },
      { id: 5, title: 'Teknik Transformasi', duration: '25 menit', type: 'video' },
      { id: 6, title: 'Teknik Substitusi', duration: '25 menit', type: 'video' },
      { id: 7, title: 'Quiz: Teori Dasar Ninjutsu', duration: '15 menit', type: 'quiz' },
      { id: 8, title: 'Latihan Praktik Hand Seals', duration: '40 menit', type: 'practice' },
      { id: 9, title: 'Strategi Pertempuran Basic', duration: '30 menit', type: 'video' },
      { id: 10, title: 'Stamina dan Ketahanan', duration: '20 menit', type: 'video' },
      { id: 11, title: 'Ujian Akhir', duration: '30 menit', type: 'exam' },
      { id: 12, title: 'Sertifikat Penyelesaian', duration: '-', type: 'certificate' }
    ]
  };

  const handleEnroll = () => {
    setEnrolled(true);
    alert('Berhasil mendaftar! Kamu sekarang bisa mulai belajar.');
  };

  const getRankColor = (rank) => {
    const colors = {
      'Genin': 'bg-green-100 text-green-700 border-green-300',
      'Chunin': 'bg-blue-100 text-blue-700 border-blue-300',
      'Jonin': 'bg-purple-100 text-purple-700 border-purple-300',
      'Hokage': 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[rank] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getModuleIcon = (type) => {
    switch(type) {
      case 'video': return <Play size={18} className="text-amber-600" />;
      case 'quiz': return <CheckCircle size={18} className="text-blue-600" />;
      case 'practice': return <Award size={18} className="text-green-600" />;
      case 'exam': return <BookOpen size={18} className="text-red-600" />;
      case 'certificate': return <Award size={18} className="text-amber-600" />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/courses" className="inline-flex items-center text-amber-700 hover:text-amber-900 font-semibold mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Daftar Kursus
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden mb-6">
              <div className="h-64 bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center">
                <BookOpen className="text-white" size={96} />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-amber-950 mb-3">{course.title}</h1>
                    <p className="text-amber-700 text-lg mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-4 text-amber-700">
                      <div className="flex items-center">
                        <Clock size={20} className="mr-2" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen size={20} className="mr-2" />
                        {course.modules} modul
                      </div>
                      <div className="flex items-center">
                        <Users size={20} className="mr-2" />
                        {course.enrolled} ninja
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold border-2 ${getRankColor(course.rank)}`}>
                    {course.rank}
                  </span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-amber-950 mb-6">Yang Akan Kamu Pelajari</h2>
              <ul className="space-y-3">
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-amber-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8">
              <h2 className="text-2xl font-bold text-amber-950 mb-6">Materi Kursus</h2>
              <div className="space-y-3">
                {course.syllabus.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border-2 border-amber-100 rounded-lg hover:border-amber-300 transition">
                    <div className="flex items-center flex-1">
                      <div className="mr-4">
                        {getModuleIcon(module.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-amber-950">{module.title}</p>
                        <p className="text-sm text-amber-700">{module.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 sticky top-6">
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-amber-950 mb-2">GRATIS</p>
                <p className="text-amber-700">Semua kursus 100% gratis</p>
              </div>

              {!enrolled ? (
                <button
                  onClick={handleEnroll}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-lg hover:from-amber-700 hover:to-amber-800 shadow-lg transition transform hover:scale-105 mb-4"
                >
                  Daftar Sekarang
                </button>
              ) : (
                <Link
                  to={`/learn/${course.id}`}
                  className="block w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 shadow-lg transition transform hover:scale-105 mb-4 text-center"
                >
                  Mulai Belajar
                </Link>
              )}

              <div className="border-t-2 border-amber-200 pt-6 space-y-4">
                <h3 className="font-bold text-amber-950 mb-3">Kursus ini mencakup:</h3>
                <div className="flex items-center text-amber-700">
                  <CheckCircle size={18} className="mr-3 text-green-600" />
                  <span className="text-sm">Akses selamanya</span>
                </div>
                <div className="flex items-center text-amber-700">
                  <CheckCircle size={18} className="mr-3 text-green-600" />
                  <span className="text-sm">Sertifikat digital</span>
                </div>
                <div className="flex items-center text-amber-700">
                  <CheckCircle size={18} className="mr-3 text-green-600" />
                  <span className="text-sm">Materi video & modul</span>
                </div>
                <div className="flex items-center text-amber-700">
                  <CheckCircle size={18} className="mr-3 text-green-600" />
                  <span className="text-sm">Quiz & ujian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;