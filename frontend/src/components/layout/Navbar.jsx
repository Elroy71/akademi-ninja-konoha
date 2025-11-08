import React from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar?')) {
      logout();
    }
  };

  return (
    <nav className="bg-white border-b-2 border-amber-200 sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-amber-900 hover:bg-amber-50 transition"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">木</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-amber-950">
                Akademi Ninja Konoha
              </span>
            </Link>
          </div>

          {/* Right: User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-amber-700 hover:bg-amber-50 transition">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="flex items-center space-x-3 border-l-2 border-amber-200 pl-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-amber-950">{user?.name}</p>
                <p className="text-xs text-amber-700">{user?.ninjaRank || 'Genin'}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link 
                  to="/profile"
                  className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-bold hover:from-amber-700 hover:to-amber-800 transition"
                >
                  {user?.name?.charAt(0).toUpperCase() || 'N'}
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;