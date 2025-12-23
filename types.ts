import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  tag: '公告' | '優惠' | '新知';
  image?: string; // New: Optional image for news
}

export interface AboutInfo {
  title: string;
  subtitle: string;
  content: string[]; // Array of paragraphs
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
  adminPassword?: string; // Added: Optional field for admin password
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