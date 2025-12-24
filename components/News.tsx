import React from 'react';
import { SectionTitle } from './SectionTitle';
import { useData } from '../context/DataContext';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const News: React.FC = () => {
  const { news } = useData();
  const navigate = useNavigate();

  return (
    <section id="news" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="最新消息" subtitle="掌握影城的第一手資訊與優惠活動" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/news/${item.id}`)}
              className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-brand-200 shadow-sm hover:shadow-soft transition-all duration-300"
            >
              
              {item.image && (
                <div className="h-52 overflow-hidden rounded-t-2xl relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                     <span className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-white/20 uppercase tracking-widest ${
                        item.tag === '優惠' ? 'bg-red-500/90 text-white' :
                        item.tag === '新知' ? 'bg-blue-500/90 text-white' :
                        'bg-gray-800/80 text-white'
                        }`}>
                        {item.tag}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow relative">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 font-medium">
                    <CalendarDays size={14} />
                    <span>{item.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-600 transition-colors">
                    {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {item.content}
                </p>

                <div className="flex items-center text-brand-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                    閱讀全文 <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};