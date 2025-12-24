
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  servicesData as initialServices, 
  newsData as initialNews, 
  faqData as initialFaq, 
  siteConfigData as initialSiteConfig,
  aboutData as initialAbout,
  contactData as initialContact,
  initialAnalyticsData,
  brandLogo 
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

const PK = 'COPYCITY_FINAL_V2_';
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
  // 強化的讀取函數：確保讀取的資料格式符合預期（例如陣列必須是陣列）
  const load = (key: string, defaultValue: any, type: 'array' | 'object' | 'string' = 'object') => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored || stored === 'undefined' || stored === 'null') return defaultValue;
      
      // 如果預期是字串（如 Logo），直接返回
      if (type === 'string') return stored;

      try {
        const parsed = JSON.parse(stored);
        
        // 類型安全檢查：如果預期是陣列但解析出來不是，則返回預設值，防止 .map() 錯誤
        if (type === 'array' && !Array.isArray(parsed)) return defaultValue;
        if (type === 'object' && (typeof parsed !== 'object' || Array.isArray(parsed))) return defaultValue;
        
        return parsed || defaultValue;
      } catch (e) {
        // Fix: Removed redundant type === 'string' check as it's already handled and narrowed above
        return defaultValue;
      }
    } catch (e) { 
      return defaultValue; 
    }
  };

  const [services, setServices] = useState<ServiceItem[]>(() => load(STORAGE_KEYS.SERVICES, initialServices, 'array'));
  const [news, setNews] = useState<NewsItem[]>(() => load(STORAGE_KEYS.NEWS, initialNews, 'array'));
  const [faq, setFaq] = useState<FaqItem[]>(() => load(STORAGE_KEYS.FAQ, initialFaq, 'array'));
  const [logo, setLogo] = useState<string | null>(() => load(STORAGE_KEYS.LOGO, brandLogo, 'string'));
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => load(STORAGE_KEYS.CONFIG, initialSiteConfig, 'object'));
  const [about, setAbout] = useState<AboutInfo>(() => load(STORAGE_KEYS.ABOUT, initialAbout, 'object'));
  const [contact, setContact] = useState<ContactInfo>(() => load(STORAGE_KEYS.CONTACT, initialContact, 'object'));
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => load(STORAGE_KEYS.ANALYTICS, initialAnalyticsData, 'object'));

  const save = (key: string, val: any) => {
    try { 
      const stringValue = typeof val === 'string' ? val : JSON.stringify(val);
      localStorage.setItem(key, stringValue); 
    } catch (e) {
      // 捕獲 QuotaExceededError (空間不足)
      throw new Error('儲存空間不足，請縮減圖片大小或減少項目數量。');
    }
  };

  const updateLogo = (newLogo: string | null) => {
    try {
      setLogo(newLogo);
      save(STORAGE_KEYS.LOGO, newLogo || '');
    } catch (e) {
      alert('Logo 檔案過大，無法儲存。');
    }
  };

  const trackVisit = () => {
    setAnalytics(prev => {
      const next = { ...prev, totalVisits: prev.totalVisits + 1 };
      try { save(STORAGE_KEYS.ANALYTICS, next); } catch(e) {}
      return next;
    });
  };

  const trackNavClick = (navId: keyof AnalyticsData['navClicks']) => {
    setAnalytics(prev => {
      const next = {
        ...prev,
        navClicks: { ...prev.navClicks, [navId]: prev.navClicks[navId] + 1 }
      };
      try { save(STORAGE_KEYS.ANALYTICS, next); } catch(e) {}
      return next;
    });
  };

  const resetData = () => {
    if (confirm('確定要清除所有修改，還原至初始設定嗎？')) {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      window.location.reload();
    }
  };

  const saveAllData = (
    newServices: ServiceItem[], 
    newNews: NewsItem[], 
    newFaq: FaqItem[], 
    newLogo: string | null, 
    newConfig: SiteConfig,
    newAbout: AboutInfo,
    newContact: ContactInfo
  ) => {
    // 先執行所有儲存，如果任一失敗會拋出錯誤
    save(STORAGE_KEYS.SERVICES, newServices);
    save(STORAGE_KEYS.NEWS, newNews);
    save(STORAGE_KEYS.FAQ, newFaq);
    save(STORAGE_KEYS.LOGO, newLogo || '');
    save(STORAGE_KEYS.CONFIG, newConfig);
    save(STORAGE_KEYS.ABOUT, newAbout);
    save(STORAGE_KEYS.CONTACT, newContact);

    // 儲存成功才更新 React State
    setServices(newServices);
    setNews(newNews);
    setFaq(newFaq);
    setLogo(newLogo);
    setSiteConfig(newConfig);
    setAbout(newAbout);
    setContact(newContact);
  };

  return (
    <DataContext.Provider value={{ 
      services, news, faq, logo, siteConfig, about, contact, analytics,
      updateLogo, trackVisit, trackNavClick, saveAllData, resetData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
