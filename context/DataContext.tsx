import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  servicesData as initialServices, 
  newsData as initialNews, 
  faqData as initialFaq, 
  siteConfigData as initialSiteConfig,
  aboutData as initialAbout,
  contactData as initialContact,
  initialAnalyticsData
} from '../data';
import { ServiceItem, NewsItem, FaqItem, SiteConfig, AboutInfo, ContactInfo, AnalyticsData } from '../types';

interface DataContextType {
  services: ServiceItem[];
  news: NewsItem[];
  faq: FaqItem[];
  logo: string | null;
  siteConfig: SiteConfig;
  about: AboutInfo;
  contact: ContactInfo;
  analytics: AnalyticsData;
  updateLogo: (newLogo: string | null) => void;
  trackVisit: () => void;
  trackNavClick: (navId: keyof AnalyticsData['navClicks']) => void;
  resetData: () => void;
  saveAllData: (
    newServices: ServiceItem[], 
    newNews: NewsItem[], 
    newFaq: FaqItem[], 
    newLogo: string | null, 
    newConfig: SiteConfig,
    newAbout: AboutInfo,
    newContact: ContactInfo
  ) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const PK = 'COPYCITY_FINAL_V1_';
const STORAGE_KEYS = {
  SERVICES: PK + 'SERVICES',
  NEWS: PK + 'NEWS',
  FAQ: PK + 'FAQ',
  LOGO: PK + 'LOGO',
  CONFIG: PK + 'CONFIG',
  ABOUT: PK + 'ABOUT',
  CONTACT: PK + 'CONTACT',
  ANALYTICS: PK + 'ANALYTICS'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const load = (key: string, defaultValue: any) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored || stored === 'undefined' || stored === 'null') return defaultValue;
      
      // Logo is raw base64 string, not JSON
      if (key === STORAGE_KEYS.LOGO && !stored.startsWith('{') && !stored.startsWith('[')) {
        return stored;
      }

      try {
        const parsed = JSON.parse(stored);
        return parsed || defaultValue;
      } catch (e) {
        // Fallback for raw strings or corrupted data
        return (stored.length > 100 && stored.startsWith('data:image')) ? stored : defaultValue;
      }
    } catch (e) { 
      console.error("Storage Load Error:", e);
      return defaultValue; 
    }
  };

  const save = (key: string, val: any) => {
    try { 
      const stringValue = typeof val === 'string' ? val : JSON.stringify(val);
      localStorage.setItem(key, stringValue); 
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('儲存空間已滿！這通常是因為圖片過多或解析度太高。請嘗試刪除部分圖片或縮小圖檔後再儲存。');
      }
    }
  };

  const [services, setServices] = useState<ServiceItem[]>(() => load(STORAGE_KEYS.SERVICES, initialServices));
  const [news, setNews] = useState<NewsItem[]>(() => load(STORAGE_KEYS.NEWS, initialNews));
  const [faq, setFaq] = useState<FaqItem[]>(() => load(STORAGE_KEYS.FAQ, initialFaq));
  const [logo, setLogo] = useState<string | null>(() => load(STORAGE_KEYS.LOGO, null));
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => load(STORAGE_KEYS.CONFIG, initialSiteConfig));
  const [about, setAbout] = useState<AboutInfo>(() => load(STORAGE_KEYS.ABOUT, initialAbout));
  const [contact, setContact] = useState<ContactInfo>(() => load(STORAGE_KEYS.CONTACT, initialContact));
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => load(STORAGE_KEYS.ANALYTICS, initialAnalyticsData));

  const saveAllData = (ns: ServiceItem[], nn: NewsItem[], nf: FaqItem[], nl: string | null, nc: SiteConfig, na: AboutInfo, nco: ContactInfo) => {
    setServices(ns); setNews(nn); setFaq(nf); setLogo(nl); setSiteConfig(nc); setAbout(na); setContact(nco);
    save(STORAGE_KEYS.SERVICES, ns);
    save(STORAGE_KEYS.NEWS, nn);
    save(STORAGE_KEYS.FAQ, nf);
    save(STORAGE_KEYS.LOGO, nl); 
    save(STORAGE_KEYS.CONFIG, nc);
    save(STORAGE_KEYS.ABOUT, na);
    save(STORAGE_KEYS.CONTACT, nco);
  };

  const updateLogo = (nl: string | null) => { setLogo(nl); save(STORAGE_KEYS.LOGO, nl); };
  
  const trackVisit = () => {
    setAnalytics(prev => {
      const newVal = { ...prev, totalVisits: (prev.totalVisits || 0) + 1 };
      save(STORAGE_KEYS.ANALYTICS, newVal);
      return newVal;
    });
  };

  const trackNavClick = (id: keyof AnalyticsData['navClicks']) => {
    setAnalytics(prev => {
      const newVal = { ...prev, navClicks: { ...prev.navClicks, [id]: (prev.navClicks[id] || 0) + 1 } };
      save(STORAGE_KEYS.ANALYTICS, newVal);
      return newVal;
    });
  };

  const resetData = () => { 
    if (confirm('這將清除所有自訂內容並重置網站。確定嗎？')) { 
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      window.location.reload(); 
    } 
  };

  return (
    <DataContext.Provider value={{ services, news, faq, logo, siteConfig, about, contact, analytics, updateLogo, trackVisit, trackNavClick, resetData, saveAllData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};