import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, Award } from 'lucide-react';

const ExamPage = () => {
  const { id } = useParams();

  // Dummy exam data
  const exam = {
    courseTitle: 'Dasar-dasar Ninjutsu',
    title: 'Ujian Akhir - Dasar Ninjutsu',
    duration: 30,
    totalQuestions: 10,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan Chakra dalam dunia ninja?',
        options: [
          'Energi fisik saja',
          'Kombinasi energi spiritual dan fisik',
          'Energi spiritual saja',
          'Kekuatan dari alam'
        ]
      },
      {
        id: 2,
        question: 'Berapa jumlah hand seal fundamental dalam ninjutsu?',
        options: ['10', '12', '15', '20']
      },
      {
        id: 3,
        question: 'Teknik apa yang memungkinkan ninja untuk mengubah penampilan mereka?',
        options: [
          'Teknik Substitusi',
          'Teknik Transformasi',
          'Teknik Clone',
          'Teknik Teleportasi'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link to={`/learn/${id}`} className="inline-flex items-center text-amber-700 hover:text-amber-900 font-semibold mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Kursus
        </Link>

        {/* Exam Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-amber-950 mb-2">{exam.title}</h1>
              <p className="text-amber-700">Kursus: {exam.courseTitle}</p>
            </div>
            <Award className="text-amber-600" size={48} />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
              <Clock className="text-amber-600 mb-2" size={24} />
              <p className="text-sm text-amber-700 mb-1">Durasi</p>
              <p className="text-xl font-bold text-amber-950">{exam.duration} menit</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
              <AlertCircle className="text-amber-600 mb-2" size={24} />
              <p className="text-sm text-amber-700 mb-1">Total Soal</p>
              <p className="text-xl font-bold text-amber-950">{exam.totalQuestions} soal</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
              <Award className="text-amber-600 mb-2" size={24} />
              <p className="text-sm text-amber-700 mb-1">Passing Score</p>
              <p className="text-xl font-bold text-amber-950">{exam.passingScore}%</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
            <h3 className="font-bold text-amber-950 mb-2 flex items-center">
              <AlertCircle size={20} className="mr-2" />
              Petunjuk Ujian
            </h3>
            <ul className="text-amber-800 space-y-1 text-sm ml-7">
              <li>• Bacalah setiap pertanyaan dengan teliti sebelum menjawab</li>
              <li>• Anda hanya memiliki satu kali kesempatan mengerjakan ujian</li>
              <li>• Nilai minimal untuk lulus adalah {exam.passingScore}%</li>
              <li>• Pastikan koneksi internet stabil selama ujian</li>
            </ul>
          </div>
        </div>

        {/* Sample Questions (Dummy - Not Clickable) */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-amber-950 mb-6">Preview Soal</h2>
          <div className="space-y-6">
            {exam.questions.map((q) => (
              <div key={q.id} className="border-2 border-amber-100 rounded-lg p-6">
                <p className="font-bold text-amber-950 mb-4">
                  {q.id}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center p-3 border-2 border-amber-100 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed"
                    >
                      <input 
                        type="radio" 
                        disabled 
                        className="mr-3" 
                      />
                      <span className="text-amber-800">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/learn/${id}`}
              className="flex-1 px-6 py-3 bg-amber-200 text-amber-900 rounded-lg font-semibold hover:bg-amber-300 transition text-center"
            >
              Batal
            </Link>
            <button
              disabled
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed text-center"
            >
              Mulai Ujian (Demo Mode - Disabled)
            </button>
          </div>
          <p className="text-center text-amber-700 text-sm mt-4">
            <AlertCircle size={16} className="inline mr-1" />
            Fitur ujian akan diaktifkan setelah backend terintegrasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;