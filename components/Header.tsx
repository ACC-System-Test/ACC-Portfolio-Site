
import React from 'react';
import { Page, NavItem } from '../types';
import { Shield } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: NavItem[] = [
  { label: 'Home', value: Page.HOME },
  { label: 'About Us', value: Page.ABOUT },
  { label: 'Solutions', value: Page.SOLUTIONS },
  { label: 'Blog', value: Page.BLOG },
  { label: 'Contact Us', value: Page.CONTACT },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <nav className="glass-nav px-8 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="bg-[#0084d1] p-2 rounded-lg text-white group-hover:bg-[#006bb0] transition-colors">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold leading-tight">Africa</h1>
            <p className="text-white text-[10px] opacity-80">Cybersecurity Consortium</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`text-sm font-medium transition-all ${
                currentPage === item.value 
                  ? 'text-[#0084d1] font-semibold' 
                  : 'text-white hover:text-[#0084d1]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onNavigate(Page.CONTACT)}
          className="bg-[#0084d1] hover:bg-[#006bb0] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg"
        >
          Reach Us
        </button>
      </nav>
    </header>
  );
};
