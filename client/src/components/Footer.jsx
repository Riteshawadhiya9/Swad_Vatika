import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/5 mt-auto relative z-10">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-montserrat text-xl md:text-2xl font-black tracking-widest text-text-light uppercase">
                SWAD <span className="text-accent-brand">VATIKA</span>
              </span>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-gray-500 font-bold -mt-0.5">
                M O D E R N   E A T E R Y
              </span>
            </Link>
            <p className="text-gray-450 text-xs sm:text-sm leading-relaxed font-light font-sans">
              Curating unforgettable culinary journeys through India's royal palaces and spice heritage, wrapped in modern indulgence.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Instagram Custom SVG */}
              <a href="#" className="text-gray-400 hover:text-accent-brand transition-colors duration-300" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook Custom SVG */}
              <a href="#" className="text-gray-400 hover:text-accent-brand transition-colors duration-300" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Twitter Custom SVG */}
              <a href="#" className="text-gray-400 hover:text-accent-brand transition-colors duration-300" aria-label="Twitter">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-sm font-bold text-text-light uppercase tracking-wider border-b border-white/5 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-450">
              <li>
                <Link to="/" className="hover:text-accent-brand transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-accent-brand transition-colors duration-300">Royal Menu</Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-accent-brand transition-colors duration-300">Order Online</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-accent-brand transition-colors duration-300">Book a Table</Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-sm font-bold text-text-light uppercase tracking-wider border-b border-white/5 pb-2">
              Timing
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-455">
              <li className="flex justify-between">
                <span>Lunch:</span>
                <span className="text-gray-400 font-semibold">12:00 PM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Dinner:</span>
                <span className="text-gray-400 font-semibold">7:00 PM - 11:30 PM</span>
              </li>
              <li className="flex justify-between text-accent-brand font-bold mt-1 uppercase tracking-wider">
                <span>Open Everyday</span>
                <span></span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-sm font-bold text-text-light uppercase tracking-wider border-b border-white/5 pb-2">
              Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-450">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-accent-brand flex-shrink-0 mt-0.5" />
                <span>100 Rajpath Palace Road, Jaipur, Rajasthan, 302001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent-brand flex-shrink-0" />
                <span>+91 141 555 7777</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent-brand flex-shrink-0" />
                <span>royal@swadvatika.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-black/30 border-t border-white/5 py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Swad Vatika. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-brand transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-accent-brand transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
