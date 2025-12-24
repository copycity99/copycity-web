import React, { useState, useEffect } from 'react';
import { Menu, X, Printer } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { logo, trackNavClick } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLogoError(false);
  }, [logo]);

  const navLinks = [
    { name: '最新消息', id: 'news', analyticsId: 'news' },
    { name: '營業項目', id: 'services', analyticsId: 'services' },
    { name: '關於影城', id: 'about', analyticsId: 'about' },
    { name: '常見問題', id: 'faq', analyticsId: 'faq' },
    { name: '聯絡我們', id: 'contact', analyticsId: 'contact' },
  ];

  const handleNavClick = (link: { name: string, id: string, analyticsId: string }) => {
    setIsMenuOpen(false); 
    trackNavClick(link.analyticsId as any);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(link.id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(link.id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const isTransparent = !isScrolled && !isMenuOpen && location.pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isTransparent ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <button 
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 transition-transform active:scale-95 focus:outline-none"
        >
          {logo && !logoError ? (
            <img 
              src={logo} 
              alt="影城數位印刷" 
              onError={() => setLogoError(true)} 
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              style={{ 
                /* 關鍵魔法：當導覽列透明(深底)時，將深色 Logo 反相為白色 */
                filter: isTransparent ? 'brightness(0) invert(1)' : 'none' 
              }}
            />
          ) : (
            <div className={`flex items-center gap-2 text-xl md:text-2xl font-bold font-display ${isTransparent ? 'text-white' : 'text-navy-900'}`}>
              <div className="p-2 rounded-lg bg-brand-500 text-white shadow-lg">
                <Printer size={20} />
              </div>
              <span className="tracking-tight">影城數位印刷</span>
            </div>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, index) => (
            <button 
              key={index}
              onClick={() => handleNavClick(link)}
              className={`font-bold text-sm tracking-wide transition-colors hover:text-brand-500 focus:outline-none ${
                !isTransparent ? 'text-navy-700' : 'text-white hover:text-brand-300'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="text-navy-900" size={28} />
          ) : (
            <Menu className={!isTransparent ? 'text-navy-900' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl animate-fadeIn">
          <div className="flex flex-col px-6 py-2">
            {navLinks.map((link, index) => (
              <button 
                key={index} 
                onClick={() => handleNavClick(link)}
                className="text-navy-700 font-bold hover:text-brand-500 text-left w-full py-4 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};