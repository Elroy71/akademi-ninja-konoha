import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  User, 
  X,
  Library
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/courses', icon: Library, label: 'Browse Kursus' },
    { path: '/my-courses', icon: BookOpen, label: 'Kursus Saya' },
    { path: '/certificates', icon: Award, label: 'Sertifikat' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r-2 border-amber-200 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-amber-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">木</span>
            </div>
            <span className="font-bold text-amber-950">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-amber-700 hover:bg-amber-50 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                      : 'text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t-2 border-amber-200">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200">
            <p className="text-sm font-semibold text-amber-950 mb-2">
              🎯 Tips Ninja
            </p>
            <p className="text-xs text-amber-700">
              Selesaikan semua modul untuk mendapat sertifikat dan naik rank!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;