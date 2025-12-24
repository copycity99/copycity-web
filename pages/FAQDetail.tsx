import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, HelpCircle, ChevronRight, MessageSquare } from 'lucide-react';

export const FAQDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faq } = useData();
  
  const item = faq.find(f => f.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
           <nav className="flex items-center gap-2 text-sm text-navy-400 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">首頁</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">常見問題</button>
            <ChevronRight size={14} />
            <span className="text-navy-900 font-bold truncate max-w-[200px]">{item.question}</span>
          </nav>

          <article className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-navy-900 p-8 md:p-12 text-white flex items-center gap-6">
                <div className="bg-brand-500 p-4 rounded-2xl">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight">
                    {item.question}
                </h1>
            </div>
            
            <div className="p-8 md:p-16">
              <div className="prose prose-lg max-w-none text-navy-600 leading-loose space-y-8 whitespace-pre-wrap">
                <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 text-brand-900 font-medium mb-10">
                    簡答：{item.answer}
                </div>
                
                {item.fullContent && (
                    <div className="text-navy-800">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MessageSquare size={20} className="text-brand-500" />
                            詳細說明
                        </h2>
                        {item.fullContent}
                    </div>
                )}
              </div>

              <div className="mt-12 flex justify-center border-t pt-10 border-gray-100">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-12 py-4 rounded-2xl font-bold border border-navy-200 text-navy-600 hover:bg-navy-50 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  回到首頁
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};