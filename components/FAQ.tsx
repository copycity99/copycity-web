import React from 'react';
import { SectionTitle } from './SectionTitle';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const { faq } = useData();
  const navigate = useNavigate();

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative Background Icon */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-50 pointer-events-none -z-0">
          <HelpCircle size={400} opacity={0.4} />
       </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionTitle 
          title="常見問題" 
          subtitle="第一次印刷？別擔心，這裡有您想知道的詳細答案。" 
        />
        
        <div className="grid gap-4">
          {faq.map((item, index) => (
            <div 
              key={item.id || index} 
              onClick={() => navigate(`/faq/${item.id || index}`)}
              className="group border border-gray-100 bg-white p-6 md:p-8 rounded-3xl hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all cursor-pointer flex justify-between items-center"
            >
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black text-brand-100 group-hover:text-brand-200 transition-colors font-display">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-navy-900 mb-1 group-hover:text-brand-600 transition-colors">
                        {item.question}
                    </h3>
                    <p className="text-navy-400 text-sm line-clamp-1">{item.answer}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-full text-gray-300 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <p className="text-navy-400 text-sm">
                沒找到您的問題？歡迎直接聯絡我們進行一對一諮詢。
            </p>
        </div>
      </div>
    </section>
  );
};