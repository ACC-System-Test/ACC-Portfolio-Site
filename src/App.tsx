import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Solutions } from './pages/Solutions';
import { News } from './pages/News';
import { Contact } from './pages/Contact';

import { ArticleModal } from './components/ArticleModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white selection:bg-[#0084d1] selection:text-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <ArticleModal />

      <main className="pt-0">
        {currentPage === Page.HOME && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === Page.ABOUT && <About />}
        {currentPage === Page.SOLUTIONS && <Solutions />}
        {currentPage === Page.BLOG && <News />}
        {currentPage === Page.CONTACT && <Contact />}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
