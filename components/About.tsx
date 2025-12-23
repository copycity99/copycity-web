import React from 'react';
import { SectionTitle } from './SectionTitle';
import { Coffee, Heart, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export const About: React.FC = () => {
  const { about } = useData();

  return (
    <section id="about" className="py-24 bg-paper-50 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side with decoration */}
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-brand-100 rounded-3xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-paper-200 rounded-full -z-10 blur-2xl"></div>
            
            <img 
              src={about.image} 
              alt={about.title} 
              className="relative w-full rounded-2xl shadow-2xl z-10 object-cover aspect-[4/3]"
            />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <SectionTitle 
              title={about.title} 
              subtitle={about.subtitle} 
              align="left" 
            />
            
            <div className="space-y-6 text-gray-600 leading-loose text-lg font-light">
              {about.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="bg-brand-50 p-3 rounded-full text-brand-500 mb-4">
                    <Coffee size={24} />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">專業諮詢</h4>
                <p className="text-xs text-gray-500">不怕問笨問題<br/>新手最友善</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="bg-red-50 p-3 rounded-full text-red-500 mb-4">
                    <Heart size={24} />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">細節把關</h4>
                <p className="text-xs text-gray-500">精準化審稿<br/>印前討論</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                 <div className="bg-blue-50 p-3 rounded-full text-blue-500 mb-4">
                    <Clock size={24} />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">效率交件</h4>
                <p className="text-xs text-gray-500">急件處理<br/>準時守信</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};