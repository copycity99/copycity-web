import React from 'react';
import { SectionTitle } from './SectionTitle';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Contact: React.FC = () => {
  const { siteConfig, contact } = useData();

  // 使用 Google Maps 最通用的 Embed 語法，確保在各種環境下都能正確顯示
  const googleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Tech Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">聯絡我們</h2>
            <p className="text-navy-300 text-lg max-w-2xl mx-auto">隨時準備好為您的創意服務，歡迎來店或線上諮詢。</p>
            <div className="h-1 w-20 bg-gradient-to-r from-brand-500 to-brand-400 mt-6 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-navy-900/80 backdrop-blur-xl rounded-3xl border border-navy-700 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Info & CTA */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-navy-700">
            <div>
                <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-brand-500 rounded-full"></span>
                    門市資訊
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="bg-navy-800 p-3 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg ring-1 ring-white/5 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">門市地址</p>
                      <p className="text-lg md:text-xl font-bold text-white tracking-wide">{contact.address}</p>
                      <p className="text-sm font-medium text-white mt-1 opacity-90">{contact.addressNote}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                     <div className="bg-navy-800 p-3 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg ring-1 ring-white/5 shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">服務專線</p>
                      <p className="text-lg md:text-xl font-bold text-white tracking-widest">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                     <div className="bg-navy-800 p-3 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg ring-1 ring-white/5 shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">電子信箱</p>
                      <p className="text-base md:text-lg font-medium text-white break-all">{contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                     <div className="bg-navy-800 p-3 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg ring-1 ring-white/5 shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">營業時間</p>
                      <p className="text-base md:text-lg font-medium text-white">{contact.openingHours}</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-navy-700">
                <a 
                    href={siteConfig.lineUrl || "https://lin.ee/Lif6oi7"}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#06C755] to-[#05b34c] hover:to-[#04a042] transition-all shadow-xl hover:shadow-[#06C755]/40 hover:-translate-y-1 group border border-[#4cd986]/30"
                >
                    <div className="flex items-center gap-6">
                        <div className="bg-white p-3 rounded-2xl shadow-sm">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
                                alt="LINE" 
                                className="w-10 h-10 md:w-12 md:h-12"
                            />
                        </div>
                        <div className="text-white">
                            <h4 className="font-bold text-xl md:text-2xl leading-tight mb-1">加入官方 LINE</h4>
                            <p className="text-white/90 text-sm md:text-base font-medium opacity-90">線上傳檔、即時詢價、專人服務</p>
                        </div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white group-hover:text-[#06C755] transition-all hidden sm:block">
                        <ArrowRight size={28} />
                    </div>
                </a>
            </div>
          </div>

          {/* Map Column */}
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-auto relative bg-navy-800">
             <iframe 
                title="Google Map"
                src={googleMapUrl}
                className="absolute inset-0 w-full h-full grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-navy-900/50 to-transparent pointer-events-none hidden lg:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
};