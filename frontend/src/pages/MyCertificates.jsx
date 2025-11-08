import React, { useState, useEffect } from 'react';
import { Award, Download, Share2, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import certificateService from '../services/certificateService';

const MyCertificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const response = await certificateService.getUserCertificates(user.id);
      if (response.success) {
        setCertificates(response.data);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    const colors = {
      'Genin': 'from-green-600 to-green-700',
      'Chunin': 'from-blue-600 to-blue-700',
      'Jonin': 'from-purple-600 to-purple-700',
      'Hokage': 'from-red-600 to-red-700'
    };
    return colors[rank] || 'from-gray-600 to-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 font-semibold">Memuat sertifikat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-950 mb-2">Sertifikat Saya</h1>
          <p className="text-amber-800">Koleksi pencapaianmu di Akademi Ninja Konoha</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mr-4">
              <Award className="text-white" size={32} />
            </div>
            <div>
              <p className="text-amber-700 text-sm font-medium">Total Sertifikat</p>
              <p className="text-4xl font-bold text-amber-950">{certificates.length}</p>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Certificate Header */}
              <div className={`h-32 bg-gradient-to-br ${getRankColor(cert.course.rankLevel)} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 text-6xl text-white">木</div>
                  <div className="absolute bottom-4 right-4 text-6xl text-white">証</div>
                </div>
                <div className="relative h-full flex items-center justify-center">
                  <Award className="text-white" size={48} />
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-950 mb-2">{cert.course.title}</h3>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                      {cert.course.rankLevel}
                    </span>
                  </div>
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                </div>

                <div className="space-y-2 text-sm text-amber-700 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(cert.issuedAt).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div>
                    <p className="text-xs text-amber-600">No. Sertifikat</p>
                    <p className="font-mono font-bold text-amber-950">{cert.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-600">Penerima</p>
                    <p className="font-semibold text-amber-900">{cert.user.name}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                  <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-semibold hover:bg-amber-200 transition">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border-2 border-amber-200">
            <Award className="mx-auto text-amber-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-amber-950 mb-2">Belum ada sertifikat</h3>
            <p className="text-amber-700 mb-6">Selesaikan kursus untuk mendapatkan sertifikat pertamamu</p>
          </div>
        )}

        {/* Certificate Preview Modal (Dummy) */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8">
          <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">Preview Sertifikat</h2>
          
          {/* Certificate Design */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-8 border-amber-600 rounded-lg p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 text-8xl text-amber-900">木</div>
              <div className="absolute bottom-8 right-8 text-8xl text-amber-900">葉</div>
            </div>

            <div className="relative text-center">
              {/* Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-white text-3xl font-bold">木</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-amber-950 mb-2">証明書</h1>
              <h2 className="text-2xl font-bold text-amber-800 mb-8">Certificate of Completion</h2>

              {/* Content */}
              <p className="text-amber-700 mb-4">Dengan ini menyatakan bahwa</p>
              <h3 className="text-3xl font-bold text-amber-950 mb-8">Naruto Uzumaki</h3>
              
              <p className="text-amber-700 mb-4">telah berhasil menyelesaikan kursus</p>
              <h4 className="text-2xl font-bold text-amber-900 mb-8">Pengenalan Taijutsu</h4>

              <p className="text-amber-700 mb-2">di Akademi Ninja Konoha</p>
              <p className="text-amber-700 mb-8">dengan rank: <span className="font-bold text-green-700">Genin</span></p>

              {/* Footer */}
              <div className="flex justify-between items-end mt-12 pt-8 border-t-2 border-amber-300">
                <div className="text-left">
                  <div className="border-t-2 border-amber-900 pt-2 mb-1">
                    <p className="text-sm font-bold text-amber-950">Kakashi Hatake</p>
                  </div>
                  <p className="text-xs text-amber-700">Instruktur</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-amber-700">15 Januari 2025</p>
                  <p className="text-xs text-amber-600 mt-2">KNH-2025-001-GEN</p>
                </div>
                <div className="text-right">
                  <div className="border-t-2 border-amber-900 pt-2 mb-1">
                    <p className="text-sm font-bold text-amber-950">Tsunade</p>
                  </div>
                  <p className="text-xs text-amber-700">Hokage</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-amber-700 text-sm mt-6">
            *Ini adalah preview desain sertifikat yang akan di-generate secara otomatis
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyCertificates;