import { FaqItem, NewsItem, ServiceItem, SiteConfig, AboutInfo, ContactInfo, AnalyticsData } from './types';
import { BookOpen, Image as ImageIcon, CreditCard, Presentation, Stamp, FileText, Gift, ClipboardList } from 'lucide-react';

/**
 * 品牌 LOGO 設定
 * 您可以透過後台管理介面直接上傳圖片，或者在此處填寫圖片路徑
 * 若為 null，系統將自動顯示文字版 LOGO (影城數位印刷)
 */
export const brandLogo: string | null = null; 

export const siteConfigData: SiteConfig = {
  heroButtonText: '影城營業項目',
  lineUrl: 'https://lin.ee/Lif6oi7',
  fileTransferUrl: 'https://drive.google.com/', 
  adminPassword: 'admin123'
};

export const initialAnalyticsData: AnalyticsData = {
  totalVisits: 0,
  navClicks: {
    news: 0,
    services: 0,
    about: 0,
    faq: 0,
    contact: 0
  }
};

export const aboutData: AboutInfo = {
  title: "關於影城數位印刷",
  subtitle: "我們不只是印刷廠，更是您創意的顯影液。",
  content: [
    "在數位時代，實體印刷的質感是無法被取代的。影城數位印刷致力於將您的每一份檔案，轉化為手中厚實且精緻的成品。",
    "無論您是初次接觸印刷的設計新手，還是對色準要求極高的專業人士，我們都秉持著「誠懇、細心、專業」的態度，為您的每一份作品把關。",
    "從第一張紙的挑選，到最後一道加工的完成，影城都在這裡與您一同見證創意的誕生。"
  ],
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
};

export const contactData: ContactInfo = {
  address: "桃園市龜山區德明路136號",
  addressNote: "(銘傳圓環旁，歡迎蒞臨討論樣品)",
  phone: "03-3595760",
  email: "copycity99@gmail.com",
  openingHours: "週一至週五 09:00 ~ 19:00 (例假日公休)"
};

export const servicesData: ServiceItem[] = [
  {
    id: '1',
    title: '膠裝書籍',
    description: '提供最專業的膠裝技術，書背平整、膠水均勻不脫頁。適合作品集、論文、產品手冊 or 個人出版。',
    fullContent: '我們使用高效能進口膠裝機，確保每一本書籍都能經得起反覆翻閱而不掉頁。不論是學生的畢業論文，或是企業的產品目錄，影城都能提供高品質的裝訂解決方案。',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen
  },
  {
    id: '2',
    title: '專業海報',
    description: '採用高解析噴墨技術，色彩飽和度極佳。無論是展覽活動海報 or 商業宣傳看板。',
    fullContent: '數位噴墨技術讓海報色彩栩栩如生，我們提供多種紙材選擇，包括珍珠帆布、相片紙與普通海報紙，滿足您不同的視覺呈現需求。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    icon: ImageIcon
  },
  {
    id: '3',
    title: '商業簽收單',
    description: '各式複寫聯單、簽收單、估價單。提供專業表格排版服務，支援流水號與撕線加工。',
    fullContent: '專業的聯單印製服務，提供 2-5 聯複寫選擇，紙張顯色清晰，並可根據需求添加流水號、撕線或打孔加工，讓您的商務文書作業更具效率。',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    icon: ClipboardList
  },
  {
    id: '4',
    title: '質感名片',
    description: '豐富的美術紙材質，支援燙金、局部光等加工，打造完美的企業社交形象。',
    fullContent: '名片是社交的第一張臉。我們提供上百種美術紙材，從經典的一級卡到高質感的萊妮紙、象牙卡，甚至特殊的金屬質感紙張應有盡有。',
    image: 'https://images.unsplash.com/photo-1589255870093-9791000627b4?auto=format&fit=crop&w=800&q=80',
    icon: CreditCard
  }
];

export const faqData: FaqItem[] = [
  {
    id: '1',
    question: "我沒有設計檔案，只有圖片可以印嗎？",
    answer: "只要圖片解析度夠高，我們都可以協助您處理。",
    fullContent: "如果您的圖片解析度超過 300dpi，印刷效果會非常理想。若解析度較低，我們的門市人員會先與您討論可能的印製效果，或提供簡單的排版建議。現場也提供基礎的圖文排版服務（視複雜度酌收費用）。"
  },
  {
    id: '2',
    question: "最快什麼時候可以取件？",
    answer: "簡單文件可即時取件，加工品項約 1-2 工作天。",
    fullContent: "一般的黑白/彩色影印或無加工文件，通常可以現場取件。若涉及裁切、膠裝、護貝或大圖輸出，視現場排單狀況，通常於隔日或後天完成。如為急件，請務必先透過 LINE 聯繫確認。"
  }
];

export const newsData: NewsItem[] = [
  {
    id: '1',
    date: '2024.01.20',
    title: '【春節營業公告】影城全體同仁祝您新春愉快',
    content: '春節期間我們將進行內部檢修暫停營業，具體恢復營業時間請密切關注官方 LINE 消息。',
    tag: '公告',
    image: 'https://images.unsplash.com/photo-1582213726893-edc441f9237a?auto=format&fit=crop&w=800&q=80'
  }
];