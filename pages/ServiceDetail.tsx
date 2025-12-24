import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, MessageCircle, ChevronRight, Printer } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, siteConfig } = useData();
  
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">載入中或項目不存在...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-navy-400 mb-8 overflow-hidden whitespace-nowrap">
            <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">首頁</button>
            <ChevronRight size={14} />
            <span className="text-navy-900 font-bold truncate">{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-brand-100/50 rounded-[2rem] -z-10 blur-2xl group-hover:bg-brand-200/50 transition-colors"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mb-4">
                <span className="text-brand-500 font-black tracking-widest uppercase text-xs">SERVICES DETAILS</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-8 leading-tight font-display">
                {service.title}
              </h1>
              
              <div className="prose prose-lg text-navy-600 leading-relaxed space-y-6 whitespace-pre-wrap">
                {service.fullContent ? (
                  <p>{service.fullContent}</p>
                ) : (
                  <p className="text-lg">{service.description}</p>
                )}
                
                <div className="p-8 bg-navy-50 rounded-3xl border border-navy-100 mt-10">
                   <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                     <Printer size={20} className="text-brand-500" />
                     影城專業服務
                   </h3>
                   <ul className="space-y-3 text-sm font-medium">
                     <li className="flex items-center gap-2">高解析數位噴墨 ‧ 特選紙材現場挑選</li>
                     <li className="flex items-center gap-2">專人審稿 ‧ 少量多樣印製服務</li>
                   </ul>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a 
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow bg-brand-600 hover:bg-brand-500 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={24} />
                  LINE 諮詢詳情
                </a>
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-5 rounded-2xl font-bold text-lg border border-navy-200 text-navy-600 hover:bg-navy-50 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  返回首頁
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};