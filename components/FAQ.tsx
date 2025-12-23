import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const FAQ: React.FC = () => {
  const { faq } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
       {/* Background Decoration */}
       <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-50 pointer-events-none -z-0">
          <HelpCircle size={400} opacity={0.4} />
       </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionTitle 
          title="常見問題" 
          subtitle="第一次印刷？別擔心，這裡有您想知道的答案。" 
        />
        
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index 
                ? 'border-brand-200 bg-brand-50 shadow-soft' 
                : 'border-gray-100 hover:border-brand-200 bg-white'
              }`}
            >
              <button
                className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                    <span className={`font-serif text-2xl font-bold ${openIndex === index ? 'text-brand-300' : 'text-gray-200'}`}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-lg font-bold ${openIndex === index ? 'text-brand-800' : 'text-gray-700'}`}>
                    {item.question}
                    </span>
                </div>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-brand-100 text-brand-600' : 'text-gray-400'}`}>
                     {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out pl-20 ${
                  openIndex === index ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};