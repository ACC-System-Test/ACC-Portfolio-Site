
import React from 'react';
import { Page } from '../types';
import { Shield, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-100 p-2 rounded-lg text-[#0084d1]">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold leading-tight text-gray-900">Africa</h2>
                <p className="text-gray-500 text-[10px]">Cybersecurity Consortium</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-sm mb-8">
              Felis consequat magnis fames sagittis ultrices plasodales porttitor quisque ultrice tempor turpis.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Send].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-500 hover:text-[#0084d1] hover:bg-blue-50 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate(Page.HOME)} className="text-gray-600 hover:text-[#0084d1] text-sm">Home</button></li>
              <li><button onClick={() => onNavigate(Page.ABOUT)} className="text-gray-600 hover:text-[#0084d1] text-sm">About Us</button></li>
              <li><button onClick={() => onNavigate(Page.SOLUTIONS)} className="text-gray-600 hover:text-[#0084d1] text-sm">Projects</button></li>
              <li><button onClick={() => onNavigate(Page.BLOG)} className="text-gray-600 hover:text-[#0084d1] text-sm">Blog</button></li>
              <li><button onClick={() => onNavigate(Page.CONTACT)} className="text-gray-600 hover:text-[#0084d1] text-sm">Contact Us</button></li>
            </ul>
          </div>

          {/* Contact Details or extra info */}
          <div>
             <h3 className="text-lg font-bold mb-6 text-gray-900">Privacy & Terms</h3>
             <ul className="space-y-4">
               <li><a href="#" className="text-gray-600 hover:text-[#0084d1] text-sm">Privacy Policy</a></li>
               <li><a href="#" className="text-gray-600 hover:text-[#0084d1] text-sm">Terms & Condition</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
          <p className="text-gray-500 text-sm">Copyright All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
