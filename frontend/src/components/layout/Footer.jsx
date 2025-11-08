import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-amber-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">木</span>
              </div>
              <span className="text-xl font-bold">Akademi Ninja Konoha</span>
            </div>
            <p className="text-amber-300 text-sm">
              Platform e-learning terbaik untuk melatih kemampuan ninja-mu dengan kursus gratis dan sertifikat profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-amber-300">
              <li>
                <Link to="/courses" className="hover:text-amber-100 transition">
                  Browse Kursus
                </Link>
              </li>
              <li>
                <Link to="/my-courses" className="hover:text-amber-100 transition">
                  Kursus Saya
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-amber-100 transition">
                  Sertifikat
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-amber-100 transition">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3 text-amber-300 text-sm">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>support@akademikonoha.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Desa Konoha, Negara Api</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-300 text-sm">
            © 2025 Akademi Ninja Konoha. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-amber-300 hover:text-amber-100 transition text-sm">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-amber-300 hover:text-amber-100 transition text-sm">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;