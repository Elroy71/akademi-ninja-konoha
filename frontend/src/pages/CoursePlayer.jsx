import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Play, Lock, ChevronRight } from 'lucide-react';

const CoursePlayer = () => {
  const { id } = useParams();
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState([0, 1]);

  // Dummy data
  const course = {
    title: 'Dasar-dasar Ninjutsu',
    modules: [
      { id: 0, title: 'Pengenalan Ninjutsu', type: 'video', content: 'Video content akan ditampilkan di sini' },
      { id: 1, title: 'Chakra: Sumber Kekuatan Ninja', type: 'video', content: 'Chakra adalah...' },
      { id: 2, title: 'Hand Seals Dasar (Part 1)', type: 'video', content: 'Hand seals...' },
      { id: 3, title: 'Hand Seals Dasar (Part 2)', type: 'video', content: 'Lanjutan hand seals...' },
      { id: 4, title: 'Teknik Transformasi', type: 'video', content: 'Transformasi adalah...' },
      { id: 5, title: 'Quiz: Teori Dasar Ninjutsu', type: 'quiz', content: 'Quiz akan muncul di sini' }
    ]
  };

  const progressPercentage = Math.round((completedModules.length / course.modules.length) * 100);

  const handleCompleteModule = () => {
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule]);
    }
    if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const isModuleLocked = (moduleId) => {
    return moduleId > 0 && !completedModules.includes(moduleId - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar - Module List */}
        <div className="lg:w-80 bg-white border-r-2 border-amber-200 overflow-y-auto">
          <div className="p-6 border-b-2 border-amber-200">
            <Link to="/courses" className="flex items-center text-amber-700 hover:text-amber-900 font-semibold mb-4">
              <ArrowLeft size={18} className="mr-2" />
              Keluar
            </Link>
            <h2 className="text-xl font-bold text-amber-950 mb-2">{course.title}</h2>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Progress</span>
                <span className="text-amber-950 font-bold">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-600 to-amber-700 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold text-amber-950 mb-3 px-2">Daftar Modul</h3>
            {course.modules.map((module, idx) => {
              const isCompleted = completedModules.includes(idx);
              const isLocked = isModuleLocked(idx);
              const isCurrent = currentModule === idx;

              return (
                <button
                  key={module.id}
                  onClick={() => !isLocked && setCurrentModule(idx)}
                  disabled={isLocked}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition ${
                    isCurrent 
                      ? 'bg-amber-100 border-2 border-amber-600' 
                      : isLocked 
                        ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                        : 'hover:bg-amber-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {isLocked ? (
                        <Lock size={18} className="text-gray-400" />
                      ) : isCompleted ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : (
                        <Play size={18} className="text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${isCurrent ? 'text-amber-950' : 'text-amber-900'}`}>
                        {idx + 1}. {module.title}
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        {module.type === 'video' ? 'Video' : 'Quiz'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Video/Content Player */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-amber-900 to-red-900 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Play size={64} className="mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-semibold">Video Player</p>
                  <p className="text-amber-200 text-sm mt-2">(Self-hosted video akan dimuat di sini)</p>
                </div>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-amber-950 mb-3">
                  {course.modules[currentModule].title}
                </h1>
                <p className="text-amber-700 mb-6">
                  {course.modules[currentModule].content}
                </p>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => currentModule > 0 && setCurrentModule(currentModule - 1)}
                    disabled={currentModule === 0}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      currentModule === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                    }`}
                  >
                    ← Sebelumnya
                  </button>

                  {completedModules.includes(currentModule) ? (
                    <button
                      onClick={() => currentModule < course.modules.length - 1 && setCurrentModule(currentModule + 1)}
                      disabled={currentModule === course.modules.length - 1}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition flex items-center"
                    >
                      Lanjutkan
                      <ChevronRight size={20} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteModule}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition flex items-center"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Resources/Notes */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
              <h3 className="text-lg font-bold text-amber-950 mb-4">Catatan Modul</h3>
              <p className="text-amber-700">
                Ini adalah bagian untuk catatan tambahan, resource links, atau materi pendukung lainnya yang terkait dengan modul ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;