import React, { useState } from 'react';
import { Menu, X, BookOpen, Award, Users, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">木</span>
              </div>
              <span className="text-xl font-bold text-amber-950">Akademi Ninja Konoha</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-amber-900 hover:text-amber-700 font-medium">Fitur</a>
              <a href="#courses" className="text-amber-900 hover:text-amber-700 font-medium">Kursus</a>
              <a href="#about" className="text-amber-900 hover:text-amber-700 font-medium">Tentang</a>
              <Link to="/login" className="text-amber-900 hover:text-amber-700 font-medium">Masuk</Link>
              <Link to="/register" className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold hover:from-amber-700 hover:to-amber-800 shadow-lg transition">
                Daftar Gratis
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-amber-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-amber-200">
              <a href="#features" className="block text-amber-900 hover:text-amber-700 font-medium">Fitur</a>
              <a href="#courses" className="block text-amber-900 hover:text-amber-700 font-medium">Kursus</a>
              <a href="#about" className="block text-amber-900 hover:text-amber-700 font-medium">Tentang</a>
              <Link to="/login" className="block text-amber-900 hover:text-amber-700 font-medium">Masuk</Link>
              <Link to="/register" className="block px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-center">
                Daftar Gratis
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-9xl text-amber-900">忍</div>
          <div className="absolute bottom-20 right-10 text-9xl text-amber-900">術</div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-950 mb-6">
              Tempa Dirimu Menjadi
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Ninja Hebat di Akademi Konoha
              </span>
            </h1>
            <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
              Platform e-learning bertema ninja dengan kursus gratis, sistem ranking, dan sertifikat digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-lg hover:from-amber-700 hover:to-amber-800 shadow-xl transition transform hover:scale-105 flex items-center justify-center">
                Mulai Perjalananmu
                <ChevronRight className="ml-2" />
              </Link>
              <a href="#courses" className="px-8 py-4 bg-white border-2 border-amber-600 text-amber-900 rounded-lg font-bold text-lg hover:bg-amber-50 shadow-lg transition flex items-center justify-center">
                <Play className="mr-2" size={20} />
                Lihat Kursus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-950 text-center mb-12">
            Kenapa Akademi Ninja Konoha?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Kursus Gratis', desc: 'Semua kursus 100% gratis untuk semua ninja' },
              { icon: Award, title: 'Sistem Ranking', desc: 'Naik dari Genin hingga Hokage' },
              { icon: Users, title: 'Komunitas', desc: 'Belajar bersama ninja lainnya' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Pantau perkembangan belajarmu' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-amber-950 mb-2">{feature.title}</h3>
                <p className="text-amber-800">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-600 to-red-700 rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Ninja-mu?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Daftar sekarang dan dapatkan akses ke semua kursus gratis
          </p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-amber-900 rounded-lg font-bold text-lg hover:bg-amber-50 shadow-xl transition transform hover:scale-105">
            Daftar Sekarang - Gratis!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">Akademi Ninja Konoha</span>
          </div>
          <p className="text-amber-300">© 2025 Akademi Ninja Konoha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;