import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Image as ImageIcon, Save, BarChart3, Info, Phone, Settings, Tag, MessageSquare, BookOpen, MapPin, Mail, Clock, ChevronUp, ChevronDown, MoveVertical, ShieldCheck, AlertCircle, Download, Upload, Database } from 'lucide-react';
import { ServiceItem, NewsItem, FaqItem, SiteConfig, AboutInfo, ContactInfo, AnalyticsData } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    services: liveServices, 
    news: liveNews, 
    faq: liveFaq, 
    logo: liveLogo,
    siteConfig: liveConfig,
    about: liveAbout,
    contact: liveContact,
    analytics: liveAnalytics,
    saveAllData,
    resetData 
  } = useData();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'services' | 'news' | 'faq' | 'about' | 'contact' | 'settings'>('analytics');

  const [localServices, setLocalServices] = useState<ServiceItem[]>([]);
  const [localNews, setLocalNews] = useState<NewsItem[]>([]);
  const [localFaq, setLocalFaq] = useState<FaqItem[]>([]);
  const [localLogo, setLocalLogo] = useState<string | null>(null);
  const [localConfig, setLocalConfig] = useState<SiteConfig>({ heroButtonText: '', lineUrl: '', fileTransferUrl: '', adminPassword: '' });
  const [localAbout, setLocalAbout] = useState<AboutInfo>(liveAbout);
  const [localContact, setLocalContact] = useState<ContactInfo>(liveContact);
  
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    setLocalServices(liveServices);
    setLocalNews(liveNews);
    setLocalFaq(liveFaq);
    setLocalLogo(liveLogo);
    setLocalConfig(liveConfig);
    setLocalAbout(liveAbout);
    setLocalContact(liveContact);
  }, [liveServices, liveNews, liveFaq, liveLogo, liveConfig, liveAbout, liveContact]); 

  const markAsChanged = () => {
    setHasUnsavedChanges(true);
    setShowSaveSuccess(false);
  };

  const compressImage = (file: File, isLogo: boolean = false): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = isLogo ? 400 : 800; 
          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(isLogo ? 'image/png' : 'image/jpeg', 0.6)); 
        };
      };
      reader.onerror = (e) => reject(e);
    });
  };

  const handleImageUpload = async (file: File | undefined, isLogo: boolean, callback: (base64: string) => void) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, isLogo);
      callback(compressed);
      markAsChanged();
    } catch (e) {
      alert("圖片處理失敗");
    }
  };

  const handlePublishChanges = () => {
    if (localConfig.adminPassword !== liveConfig.adminPassword && currentPasswordConfirm !== liveConfig.adminPassword) {
      setPasswordError('若要修改密碼，請輸入目前密碼驗證。');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      try {
        saveAllData(localServices, localNews, localFaq, localLogo, localConfig, localAbout, localContact);
        setHasUnsavedChanges(false);
        setShowSaveSuccess(true);
        setPasswordError('');
        setTimeout(() => setShowSaveSuccess(false), 3000);
      } catch (e) {
        console.error(e);
        alert('儲存失敗！可能是因為圖片資料量過大。請嘗試減少圖片數量或壓縮圖片。');
      } finally {
        setIsSaving(false);
      }
    }, 200);
  };

  const moveItem = (list: any[], setList: Function, index: number, direction: 'up' | 'down') => {
    const newList = [...list];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    setList(newList);
    markAsChanged();
  };

  const ReorderButtons = ({ index, total, onMove }: { index: number, total: number, onMove: (dir: 'up' | 'down') => void }) => (
    <div className="flex flex-col gap-1 shrink-0">
      <button onClick={() => onMove('up')} disabled={index === 0} className="p-2 bg-white border border-gray-200 rounded-lg hover:text-brand-500 disabled:opacity-20 shadow-sm"><ChevronUp size={20} /></button>
      <button onClick={() => onMove('down')} disabled={index === total - 1} className="p-2 bg-white border border-gray-200 rounded-lg hover:text-brand-500 disabled:opacity-20 shadow-sm"><ChevronDown size={20} /></button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-24 text-gray-800">
      <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold font-display">影城數位印刷 | 後台管理</h1>
             {hasUnsavedChanges && <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase animate-pulse">待發佈變更</span>}
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handlePublishChanges} disabled={isSaving || !hasUnsavedChanges} className={`px-5 py-2 rounded-lg font-bold shadow-md transition-all ${!hasUnsavedChanges ? 'bg-gray-700 text-gray-500' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}>{isSaving ? '同步中...' : '儲存發佈'}</button>
             <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white px-2">回首頁</button>
             <button onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/'); }} className="text-gray-400 hover:text-red-400 p-2"><LogOut size={20} /></button>
          </div>
        </div>
      </header>

      {showSaveSuccess && <div className="bg-emerald-500 text-white py-2 text-center font-bold text-sm sticky top-16 z-30 animate-slideDown shadow-lg">✓ 網站內容已完成同步更新！</div>}
      {passwordError && <div className="bg-red-500 text-white py-2 text-center font-bold text-sm sticky top-16 z-30 animate-slideDown shadow-lg">{passwordError}</div>}

      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <nav className="flex flex-col">
              {[
                { id: 'analytics', label: '數據統計', icon: <BarChart3 size={18}/> },
                { id: 'services', label: '營業項目', icon: <BookOpen size={18}/> },
                { id: 'news', label: '最新消息', icon: <Tag size={18}/> },
                { id: 'about', label: '關於影城', icon: <Info size={18}/> },
                { id: 'faq', label: '常見問題', icon: <MessageSquare size={18}/> },
                { id: 'contact', label: '聯絡資訊', icon: <Phone size={18}/> },
                { id: 'settings', label: '網站設定', icon: <Settings size={18}/> }
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-4 text-left font-medium border-l-4 transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-navy-50 border-navy-600 text-navy-900 font-bold' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>{tab.icon} {tab.label}</button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 min-h-[600px]">
          {activeTab === 'analytics' && (
             <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-black">網站數據統計</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-navy-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden group">
                        <p className="text-navy-300 text-xs font-bold uppercase tracking-widest mb-2">累計瀏覽人次</p>
                        <h3 className="text-5xl font-black tracking-tighter">{liveAnalytics.totalVisits.toLocaleString()}</h3>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-2xl font-black">營業項目管理</h2>
                <button onClick={() => { setLocalServices([{ id: Date.now().toString(), title: '新項目', description: '描述', image: '' }, ...localServices]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 新增項目</button>
              </div>
              <div className="space-y-4">
                {localServices.map((service, index) => (
                  <div key={service.id} className="border p-6 rounded-2xl flex items-start gap-6 bg-gray-50 hover:bg-white transition-all shadow-sm">
                    <ReorderButtons index={index} total={localServices.length} onMove={(dir) => moveItem(localServices, setLocalServices, index, dir)} />
                    <div className="w-32 h-32 shrink-0 bg-white border rounded-xl overflow-hidden relative group">
                        {service.image ? <img src={service.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400"><ImageIcon size={32}/></div>}
                        <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white text-xs gap-1 transition-opacity"><ImageIcon size={20} /><span>換圖</span><input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], false, (b) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, image: b} : s)); markAsChanged(); })}/></label>
                    </div>
                    <div className="flex-grow space-y-3">
                        <input type="text" value={service.title} onChange={(e) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, title: e.target.value} : s)); markAsChanged(); }} className="w-full p-1 bg-transparent border-b font-bold text-lg outline-none border-gray-200"/>
                        <textarea value={service.description} onChange={(e) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, description: e.target.value} : s)); markAsChanged(); }} className="w-full p-1 bg-transparent outline-none text-sm text-gray-500 leading-relaxed" rows={2}/>
                    </div>
                    <button onClick={() => { if (confirm('刪除？')) { setLocalServices(localServices.filter(s => s.id !== service.id)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-2xl font-black">最新消息管理</h2>
                    <button onClick={() => { setLocalNews([{ id: Date.now().toString(), date: new Date().toLocaleDateString(), title: '新消息', content: '內容', tag: '公告' }, ...localNews]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 發佈新消息</button>
                </div>
                <div className="space-y-4">
                    {localNews.map((item, index) => (
                        <div key={item.id} className="p-6 bg-gray-50 rounded-2xl border flex items-start gap-6 shadow-sm">
                            <ReorderButtons index={index} total={localNews.length} onMove={(dir) => moveItem(localNews, setLocalNews, index, dir)} />
                            <div className="flex-grow space-y-2">
                                <input type="text" value={item.title} onChange={(e) => { setLocalNews(localNews.map(n => n.id === item.id ? {...n, title: e.target.value} : n)); markAsChanged(); }} className="w-full font-bold bg-transparent outline-none border-b border-gray-200 pb-1"/>
                                <textarea value={item.content} onChange={(e) => { setLocalNews(localNews.map(n => n.id === item.id ? {...n, content: e.target.value} : n)); markAsChanged(); }} className="w-full text-sm text-gray-500 bg-transparent outline-none" rows={2}/>
                            </div>
                            <button onClick={() => { if (confirm('刪除？')) { setLocalNews(localNews.filter(n => n.id !== item.id)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                        </div>
                    ))}
                </div>
             </div>
          )}

          {activeTab === 'faq' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-2xl font-black">常見問題管理</h2>
                    <button onClick={() => { setLocalFaq([...localFaq, { question: '新問題', answer: '新回答' }]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 新增問答</button>
                </div>
                <div className="space-y-4">
                    {localFaq.map((item, index) => (
                        <div key={index} className="p-6 bg-gray-50 rounded-2xl border flex items-start gap-6 shadow-sm">
                            <ReorderButtons index={index} total={localFaq.length} onMove={(dir) => moveItem(localFaq, setLocalFaq, index, dir)} />
                            <div className="flex-grow space-y-4">
                                <input type="text" value={item.question} onChange={(e) => { const next = [...localFaq]; next[index].question = e.target.value; setLocalFaq(next); markAsChanged(); }} className="w-full p-2 bg-transparent border-b border-gray-200 font-bold outline-none"/>
                                <textarea value={item.answer} onChange={(e) => { const next = [...localFaq]; next[index].answer = e.target.value; setLocalFaq(next); markAsChanged(); }} className="w-full p-2 bg-transparent outline-none text-sm text-gray-500" rows={2}/>
                            </div>
                            <button onClick={() => { if (confirm('刪除？')) { setLocalFaq(localFaq.filter((_, i) => i !== index)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                        </div>
                    ))}
                </div>
             </div>
          )}

          {activeTab === 'about' && (
             <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-black pb-4 border-b">關於影城</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div><label className="block text-sm font-bold mb-2">主標題</label><input type="text" value={localAbout.title} onChange={(e) => { setLocalAbout({...localAbout, title: e.target.value}); markAsChanged(); }} className="w-full p-3 border border-gray-200 rounded-xl outline-none"/></div>
                        <div><label className="block text-sm font-bold mb-2">內文</label><textarea value={localAbout.content.join('\n')} onChange={(e) => { setLocalAbout({...localAbout, content: e.target.value.split('\n')}); markAsChanged(); }} className="w-full p-3 border border-gray-200 rounded-xl outline-none" rows={8}/></div>
                    </div>
                    <div><label className="block text-sm font-bold mb-2">照片</label><div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative group">
                        <img src={localAbout.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white font-bold gap-2"><ImageIcon size={24}/> 換照<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], false, (b) => { setLocalAbout({...localAbout, image: b}); markAsChanged(); })}/></label>
                    </div></div>
                </div>
             </div>
          )}

          {activeTab === 'contact' && (
             <div className="space-y-8">
                <h2 className="text-2xl font-black pb-4 border-b">聯絡資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{ label: '地址', key: 'address' }, { label: '電話', key: 'phone' }, { label: 'Email', key: 'email' }, { label: '時間', key: 'openingHours' }].map((field) => (
                        <div key={field.key}><label className="block text-sm font-bold mb-2">{field.label}</label><input type="text" value={(localContact as any)[field.key]} onChange={(e) => { setLocalContact({...localContact, [field.key]: e.target.value}); markAsChanged(); }} className="w-full p-3 border border-gray-200 rounded-xl outline-none"/></div>
                    ))}
                </div>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="space-y-8">
                <h2 className="text-2xl font-black pb-4 border-b">系統設定</h2>
                
                <div className="bg-navy-50 p-6 rounded-3xl border border-navy-100 space-y-4">
                  <h3 className="font-bold text-navy-900 flex items-center gap-2"><ImageIcon size={20} /> 網站 Logo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-white border border-dashed rounded-xl flex items-center justify-center relative group overflow-hidden">
                      {localLogo ? <img src={localLogo} className="max-w-full max-h-full object-contain" /> : <ImageIcon size={32} className="text-gray-300" />}
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white text-[10px] font-bold transition-opacity">上傳新 LOGO<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], true, (b) => { setLocalLogo(b); markAsChanged(); })}/></label>
                    </div>
                    <p className="text-xs text-navy-500">建議使用去背 PNG 圖檔。<br/>上傳後 Logo 在前台深色背景會自動轉為白色。</p>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-4">
                    <h3 className="font-bold text-red-900 flex items-center gap-2"><ShieldCheck size={20} /> 修改管理密碼</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="block text-sm font-bold text-red-700">新密碼</label><input type="text" value={localConfig.adminPassword} onChange={(e) => { setLocalConfig({...localConfig, adminPassword: e.target.value}); markAsChanged(); }} className="w-full p-3 border border-red-200 rounded-xl outline-none"/></div>
                        <div className="space-y-2"><label className="block text-sm font-bold text-red-700">舊密碼驗證</label><input type="password" value={currentPasswordConfirm} onChange={(e) => { setCurrentPasswordConfirm(e.target.value); markAsChanged(); }} className="w-full p-3 border border-red-200 rounded-xl outline-none" placeholder="確認舊密碼"/></div>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-10">
                   <button onClick={() => resetData()} className="text-xs text-red-400 hover:text-red-500">重置網站為初始值</button>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};