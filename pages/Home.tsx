import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { FAQ } from '../components/FAQ';
import { News } from '../components/News';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { useData } from '../context/DataContext';

export const Home: React.FC = () => {
  const { trackVisit } = useData();

  useEffect(() => {
    // Check if we've already tracked a visit in this session
    const hasVisited = sessionStorage.getItem('hasVisitedSession');
    
    if (!hasVisited) {
      trackVisit();
      sessionStorage.setItem('hasVisitedSession', 'true');
    }
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-paper-50 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <News />
        <Services />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};