import { FaqItem, NewsItem, ServiceItem, SiteConfig, AboutInfo, ContactInfo, AnalyticsData } from './types';
import { BookOpen, Image as ImageIcon, CreditCard, Presentation, Stamp, FileText, Gift, ClipboardList } from 'lucide-react';

export const siteConfigData: SiteConfig = {
  heroButtonText: '查看營業項目',
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
    description: '提供最專業的膠裝技術，書背平整、膠水均勻不脫頁。適合作品集、論文、產品手冊或個人出版，讓您的書冊擁有如精品店書籍般的卓越質感。',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen
  },
  {
    id: '2',
    title: '專業海報',
    description: '採用高解析噴墨技術，色彩飽和度極佳。無論是展覽活動海報、婚禮紀錄或商業宣傳看板，都能為您呈現最震撼的視覺效果。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    icon: ImageIcon
  },
  {
    id: '8',
    title: '商業簽收單',
    description: '各式複寫聯單、簽收單、估價單。提供專業表格排版服務，支援流水號與撕線加工，讓您的商業單據作業更具條理與企業形象。',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    icon: ClipboardList
  },
  {
    id: '3',
    title: '客製化貼紙',
    description: '各類型標籤、防水貼紙。支援少量印製與特殊裁切，滿足您商品包裝或個人創作的多樣化需求。',
    image: 'https://images.unsplash.com/photo-1572375992508-da2f050b1d02?auto=format&fit=crop&w=800&q=80',
    icon: Stamp
  },
  {
    id: '4',
    title: '精緻 DM',
    description: '常用商業宣傳單、折頁。備有多款磅數紙張選擇，數位印刷色澤亮麗，是您行銷推廣的最佳利器。',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    icon: FileText
  },
  {
    id: '7',
    title: '質感名片',
    description: '豐富的美術紙材質，支援燙金、局部光等加工，為您的社交第一現場打造最完美的形象。',
    image: 'https://images.unsplash.com/photo-1589255870093-9791000627b4?auto=format&fit=crop&w=800&q=80',
    icon: CreditCard
  },
  {
    id: '5',
    title: '各式展架',
    description: '易拉展、X 展架、關東旗。組裝簡便、色彩搶眼，適合短期參展或店面長期佈置。',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    icon: Presentation
  },
  {
    id: '6',
    title: '創意小物',
    description: '胸章、造型卡片、客製化周邊。將您的創意轉化為實體小物，作為活動贈品或品牌紀念最受歡迎。',
    image: 'https://images.unsplash.com/photo-1621566497276-888e280c4415?auto=format&fit=crop&w=800&q=80',
    icon: Gift
  },
];

export const faqData: FaqItem[] = [
  {
    question: "我沒有設計檔案，只有圖片可以印嗎？",
    answer: "只要圖片解析度夠高，我們都可以協助您處理。如果您有簡單的排版需求，也可以到現場由專人為您服務。"
  },
  {
    question: "最快什麼時候可以取件？",
    answer: "簡單的影印或普通文件可即時取件。若涉及裁切、膠裝或大圖輸出，通常為 1-2 個工作天，急件請務必先與我們連繫。"
  },
  {
    question: "請問有提供寄送服務嗎？",
    answer: "有的，我們支援郵寄、快遞或超商取貨，運費另計，詳情可透過官方 LINE 洽詢。"
  }
];

export const newsData: NewsItem[] = [
  {
    id: '1',
    date: '2024.01.20',
    title: '【春節營業公告】影城全體同仁祝您新春愉快',
    content: '春節期間我們將進行內部檢修暫停營業，具體恢復營業時間請密切關注官方 LINE 消息點擊「關於我們」查看詳細地址。',
    tag: '公告',
    image: 'https://images.unsplash.com/photo-1582213726893-edc441f9237a?auto=format&fit=crop&w=800&q=80'
  }
];