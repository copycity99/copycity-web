import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';

export const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news } = useData();
  
  const item = news.find(n => n.id === id);

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
           {/* Breadcrumb */}
           <nav className="flex items-center gap-2 text-sm text-navy-400 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">首頁</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">最新消息</button>
            <ChevronRight size={14} />
            <span className="text-navy-900 font-bold truncate max-w-[200px]">{item.title}</span>
          </nav>

          <article className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            {item.image && (
              <div className="w-full aspect-video overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="p-8 md:p-16">
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-navy-400 font-medium">
                  <Calendar size={18} className="text-brand-500" />
                  {item.date}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    item.tag === '優惠' ? 'bg-red-100 text-red-600' :
                    item.tag === '新知' ? 'bg-blue-100 text-blue-600' :
                    'bg-navy-100 text-navy-600'
                  }`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-navy-900 mb-10 leading-tight">
                {item.title}
              </h1>

              <div className="prose prose-lg max-w-none text-navy-600 leading-loose space-y-8 whitespace-pre-wrap">
                {item.content}
              </div>

              <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 text-brand-600 font-bold hover:text-brand-700 transition-all hover:-translate-x-1"
                >
                  <ArrowLeft size={20} />
                  回到首頁查看更多資訊
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