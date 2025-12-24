import React from 'react';
import { SectionTitle } from './SectionTitle';
import { useData } from '../context/DataContext';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const { services } = useData();
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="營業項目" 
          subtitle="全方位的印刷解決方案，滿足您所有的商業與個人需求。" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => navigate(`/service/${service.id}`)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col relative h-full hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-60"></div>
                
                {/* Icon overlaid on image */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-brand-600 shadow-lg transform group-hover:scale-110 transition-transform">
                   {service.icon && <service.icon size={24} />}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                        {service.title}
                    </h3>
                </div>
                
                <p className="text-navy-500 leading-relaxed text-sm flex-grow line-clamp-2">
                  {service.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-navy-400 uppercase tracking-wider">查看詳情內容</span>
                    <div className="bg-brand-50 p-2 rounded-full text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};