import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullContent?: string; // 詳細介紹內容
  image: string;
  icon?: LucideIcon;
}

export interface FaqItem {
  id: string; // 新增 ID 以支援轉跳
  question: string;
  answer: string;
  fullContent?: string; // 詳細解答內容
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  tag: '公告' | '優惠' | '新知';
  image?: string;
}

export interface AboutInfo {
  title: string;
  subtitle: string;
  content: string[];
  image: string;
}

export interface ContactInfo {
  address: string;
  addressNote: string;
  phone: string;
  email: string;
  openingHours: string;
}

export interface SiteConfig {
  heroButtonText: string;
  lineUrl: string;
  fileTransferUrl: string; 
  adminPassword?: string;
}

export interface AnalyticsData {
  totalVisits: number;
  navClicks: {
    news: number;
    services: number;
    about: number;
    faq: number;
    contact: number;
  };
}