import React, { useState } from 'react';
import { Page, NavItem } from '../types';
import { Shield, Menu, X } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className={`px-8 py-3 flex items-center justify-between rounded-2xl transition-all duration-300 ${isScrolled
            ? 'bg-gray-100/90 backdrop-blur-md shadow-sm border border-gray-200'
            : 'glass-nav'
          }`}>
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigate(Page.HOME)}
          >
            <div className={`p-2 rounded-lg transition-colors ${isScrolled ? 'bg-[#0084d1] text-white' : 'bg-[#0084d1] text-white group-hover:bg-[#006bb0]'
              }`}>
              <Shield size={24} />
            </div>
            <div>
              <h1 className={`font-bold leading-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}>Africa</h1>
              <p className={`text-[10px] transition-colors ${isScrolled ? 'text-gray-600' : 'text-white opacity-80'
                }`}>Cybersecurity Consortium</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavigate(item.value)}
                className={`text-sm font-medium transition-all ${currentPage === item.value
                    ? 'text-[#0084d1] font-semibold'
                    : isScrolled
                      ? 'text-gray-600 hover:text-[#0084d1]'
                      : 'text-white hover:text-[#0084d1]'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavigate(Page.CONTACT)}
            className="hidden md:block bg-[#0084d1] hover:bg-[#006bb0] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Reach Us
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-2xl flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 duration-200">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavigate(item.value)}
                  className={`text-left py-3 px-4 rounded-xl transition-all ${currentPage === item.value
                    ? 'bg-[#0084d1]/10 text-[#0084d1] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate(Page.CONTACT)}
                className="bg-[#0084d1] hover:bg-[#006bb0] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg mt-2"
              >
                Reach Us
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
