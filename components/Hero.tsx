import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Hero: React.FC = () => {
  const { siteConfig } = useData();
  
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-navy-950">
      
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. Base Image */}
        <img 
          src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80" 
          alt="High Quality Digital Print Content" 
          className="w-full h-full object-cover opacity-50 scale-105"
          style={{ filter: 'contrast(1.1) brightness(0.7) saturate(1.2)' }}
        />
        
        {/* 2. Overlays */}
        <div className="absolute inset-0 bg-navy-950/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)]"></div>

        {/* 3. Decorative Elements */}
        <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white flex flex-col items-center">
        
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/40 backdrop-blur-lg border border-white/10 text-brand-300 mb-8 fade-in-up shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase font-display">COPYCITY Digital Printing</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight md:leading-snug fade-in-up delay-100 tracking-tight text-white font-display max-w-5xl mx-auto drop-shadow-2xl">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-brand-500 to-brand-200 mb-2">
            多樣印製、專業對接，
          </span>
          <br />
          <span className="inline-block">
            讓印刷從此輕鬆簡單！
          </span>
        </h1>

        <p className="text-lg md:text-xl text-navy-100 max-w-2xl mb-12 fade-in-up delay-200 font-light leading-relaxed mx-auto drop-shadow-xl">
           極速交件 ‧ 品質保證 ‧ 靈活多樣 <br/>
           我們運用高規格的數位印刷技術，成為您創意的最強後盾。
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300 justify-center">
            <button 
            onClick={scrollToServices}
            className="group bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-brand-900/50 hover:shadow-brand-500/40 flex items-center justify-center gap-2"
            >
            {siteConfig.heroButtonText || '影城營業項目'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:border-brand-500 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center"
            >
                線上諮詢
            </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-navy-400 fade-in-up delay-300 z-10">
         <ChevronDown size={28} />
      </div>
    </div>
  );
};