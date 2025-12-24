import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Image as ImageIcon, BarChart3, Info, Phone, Settings, Tag, MessageSquare, BookOpen, ChevronUp, ChevronDown, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { ServiceItem, NewsItem, FaqItem, SiteConfig, AboutInfo, ContactInfo } from '../../types';

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
          
          // 強制大幅壓縮，針對 Logo 設定更嚴格
          const MAX_WIDTH = isLogo ? 300 : 800; 
          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // PNG 透明背景處理
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
          }
          
          // 如果是 Logo 盡量保留透明度使用 PNG，但如果還是太大則改用低質量 JPEG
          const dataUrl = canvas.toDataURL(isLogo ? 'image/png' : 'image/jpeg', 0.5);
          
          // 如果 DataURL 超過 1MB，則強制改用超低畫質 JPEG 以求成功存檔
          if (dataUrl.length > 1000000) {
            resolve(canvas.toDataURL('image/jpeg', 0.3));
          } else {
            resolve(dataUrl);
          }
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
      alert("圖片處理失敗，請嘗試使用較小的圖檔。");
    }
  };

  const handlePublishChanges = () => {
    if (localConfig.adminPassword !== liveConfig.adminPassword && currentPasswordConfirm !== liveConfig.adminPassword) {
      setPasswordError('若要修改密碼，請輸入目前密碼驗證。');
      return;
    }
    
    setIsSaving(true);
    
    // 延遲一點點讓 UI 有反應
    setTimeout(() => {
      try {
        saveAllData(localServices, localNews, localFaq, localLogo, localConfig, localAbout, localContact);
        setHasUnsavedChanges(false);
        setShowSaveSuccess(true);
        setPasswordError('');
        setTimeout(() => setShowSaveSuccess(false), 3000);
      } catch (e: any) {
        console.error("Save Error:", e);
        alert('儲存失敗！原因是資料量太大（圖片檔案太大）。請嘗試：\n1. 刪除不需要的圖片\n2. 上傳體積較小的 Logo\n3. 減少營業項目的數量');
      } finally {
        setIsSaving(false);
      }
    }, 100);
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
                <button onClick={() => { setLocalServices([{ id: Date.now().toString(), title: '新項目', description: '首頁簡述', fullContent: '詳細文案...', image: '' }, ...localServices]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 新增項目</button>
              </div>
              <div className="space-y-8">
                {localServices.map((service, index) => (
                  <div key={service.id} className="border p-6 rounded-2xl flex flex-col gap-6 bg-gray-50 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-start gap-6">
                        <ReorderButtons index={index} total={localServices.length} onMove={(dir) => moveItem(localServices, setLocalServices, index, dir)} />
                        <div className="w-32 h-32 shrink-0 bg-white border rounded-xl overflow-hidden relative group">
                            {service.image ? <img src={service.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400"><ImageIcon size={32}/></div>}
                            <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white text-xs gap-1 transition-opacity"><ImageIcon size={20} /><span>換圖</span><input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], false, (b) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, image: b} : s)); markAsChanged(); })}/></label>
                        </div>
                        <div className="flex-grow space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest mb-1 block">項目標題</label>
                                <input type="text" value={service.title} onChange={(e) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, title: e.target.value} : s)); markAsChanged(); }} className="w-full p-2 bg-white border rounded-lg font-bold text-lg outline-none focus:border-brand-500"/>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest mb-1 block">首頁簡短描述</label>
                                <textarea value={service.description} onChange={(e) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, description: e.target.value} : s)); markAsChanged(); }} className="w-full p-2 bg-white border rounded-lg outline-none text-sm text-gray-500 focus:border-brand-500" rows={2}/>
                            </div>
                        </div>
                        <button onClick={() => { if (confirm('確定刪除此項目？')) { setLocalServices(localServices.filter(s => s.id !== service.id)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <label className="text-[10px] font-black text-brand-500 uppercase tracking-widest mb-2 flex items-center gap-2">完整介紹文案</label>
                        <textarea value={service.fullContent || ''} onChange={(e) => { setLocalServices(localServices.map(s => s.id === service.id ? {...s, fullContent: e.target.value} : s)); markAsChanged(); }} className="w-full p-4 bg-white border rounded-xl outline-none text-sm text-gray-700 leading-loose focus:border-brand-500" rows={4}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-2xl font-black">最新消息管理</h2>
                    <button onClick={() => { setLocalNews([{ id: Date.now().toString(), date: new Date().toLocaleDateString(), title: '新消息', content: '內容...', tag: '公告', image: '' }, ...localNews]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 發佈新消息</button>
                </div>
                <div className="space-y-6">
                    {localNews.map((item, index) => (
                        <div key={item.id} className="p-6 bg-gray-50 rounded-2xl border flex flex-col gap-6 shadow-sm">
                            <div className="flex items-start gap-6">
                                <ReorderButtons index={index} total={localNews.length} onMove={(dir) => moveItem(localNews, setLocalNews, index, dir)} />
                                <div className="w-32 aspect-video shrink-0 bg-white border rounded-xl overflow-hidden relative group">
                                    {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-400 text-[10px]"><ImageIcon size={20}/></div>}
                                    <label className="absolute inset-0 bg-black/60 flex flex-center items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white text-[10px] transition-opacity"><ImageIcon size={16} /><input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], false, (b) => { setLocalNews(localNews.map(n => n.id === item.id ? {...n, image: b} : n)); markAsChanged(); })}/></label>
                                </div>
                                <div className="flex-grow space-y-4">
                                    <input type="text" value={item.title} onChange={(e) => { setLocalNews(localNews.map(n => n.id === item.id ? {...n, title: e.target.value} : n)); markAsChanged(); }} className="w-full font-bold bg-white border rounded-lg p-2 outline-none focus:border-brand-500"/>
                                    <textarea value={item.content} onChange={(e) => { setLocalNews(localNews.map(n => n.id === item.id ? {...n, content: e.target.value} : n)); markAsChanged(); }} className="w-full text-sm bg-white border rounded-lg p-2 outline-none focus:border-brand-500" rows={3}/>
                                </div>
                                <button onClick={() => { if (confirm('確定刪除？')) { setLocalNews(localNews.filter(n => n.id !== item.id)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          )}

          {activeTab === 'faq' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-2xl font-black">常見問題管理</h2>
                    <button onClick={() => { setLocalFaq([...localFaq, { id: Date.now().toString(), question: '問題', answer: '簡答', fullContent: '詳解' }]); markAsChanged(); }} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> 新增問答</button>
                </div>
                <div className="space-y-6">
                    {localFaq.map((item, index) => (
                        <div key={item.id || index} className="p-6 bg-gray-50 rounded-2xl border flex flex-col gap-4 shadow-sm">
                            <div className="flex items-start gap-6">
                                <ReorderButtons index={index} total={localFaq.length} onMove={(dir) => moveItem(localFaq, setLocalFaq, index, dir)} />
                                <div className="flex-grow space-y-4">
                                    <input type="text" value={item.question} onChange={(e) => { const next = [...localFaq]; next[index].question = e.target.value; setLocalFaq(next); markAsChanged(); }} className="w-full p-2 bg-white border rounded-lg font-bold focus:border-brand-500"/>
                                    <textarea value={item.answer} onChange={(e) => { const next = [...localFaq]; next[index].answer = e.target.value; setLocalFaq(next); markAsChanged(); }} className="w-full p-2 bg-white border rounded-lg text-sm focus:border-brand-500" rows={2}/>
                                </div>
                                <button onClick={() => { if (confirm('確定刪除？')) { setLocalFaq(localFaq.filter((_, i) => i !== index)); markAsChanged(); } }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={20}/></button>
                            </div>
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
                        <input type="text" value={localAbout.title} onChange={(e) => { setLocalAbout({...localAbout, title: e.target.value}); markAsChanged(); }} className="w-full p-3 border rounded-xl focus:border-brand-500"/>
                        <textarea value={localAbout.content.join('\n')} onChange={(e) => { setLocalAbout({...localAbout, content: e.target.value.split('\n')}); markAsChanged(); }} className="w-full p-3 border rounded-xl leading-loose focus:border-brand-500" rows={8}/>
                    </div>
                    <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative group">
                        <img src={localAbout.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white font-bold gap-2"><ImageIcon size={24}/> 更換照片<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], false, (b) => { setLocalAbout({...localAbout, image: b}); markAsChanged(); })}/></label>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'contact' && (
             <div className="space-y-8">
                <h2 className="text-2xl font-black pb-4 border-b">聯絡資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{ label: '門市地址', key: 'address' }, { label: '服務專線', key: 'phone' }, { label: '電子信箱', key: 'email' }, { label: '營業時間', key: 'openingHours' }].map((field) => (
                        <div key={field.key}><label className="block text-sm font-bold mb-2">{field.label}</label><input type="text" value={(localContact as any)[field.key]} onChange={(e) => { setLocalContact({...localContact, [field.key]: e.target.value}); markAsChanged(); }} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-500"/></div>
                    ))}
                </div>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="space-y-8">
                <h2 className="text-2xl font-black pb-4 border-b">系統設定</h2>
                
                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
                  <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
                  <div className="text-sm text-amber-800 leading-relaxed">
                    <p className="font-bold mb-1">提示：Logo 顯示優化</p>
                    <p>目前系統已設定為：<strong>深底自動顯白，白底顯原色</strong>。建議上傳<strong>深色或黑色</strong>的透明背景 PNG 檔，網站會自動幫您在 Hero 區塊轉為白色。</p>
                  </div>
                </div>

                <div className="bg-navy-50 p-6 rounded-3xl border border-navy-100 space-y-4">
                  <h3 className="font-bold text-navy-900 flex items-center gap-2"><ImageIcon size={20} /> 網站 Logo 上傳</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-white border border-dashed rounded-xl flex items-center justify-center relative group overflow-hidden">
                      {localLogo ? <img src={localLogo} className="max-w-full max-h-full object-contain" /> : <ImageIcon size={32} className="text-gray-300" />}
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white text-[10px] font-bold transition-opacity">更換 LOGO<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], true, (b) => { setLocalLogo(b); markAsChanged(); })}/></label>
                    </div>
                    <div className="text-xs text-navy-500 space-y-2">
                       <p>• 建議使用透明背景 PNG。</p>
                       <p>• 系統會自動壓縮寬度至 300px 以確保效能。</p>
                       {localLogo && <button onClick={() => {setLocalLogo(null); markAsChanged();}} className="text-red-500 underline">移除並還原文字 Logo</button>}
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-4">
                    <h3 className="font-bold text-red-900 flex items-center gap-2"><ShieldCheck size={20} /> 登入密碼修改</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" value={localConfig.adminPassword} onChange={(e) => { setLocalConfig({...localConfig, adminPassword: e.target.value}); markAsChanged(); }} className="p-3 border rounded-xl" placeholder="新密碼"/>
                        <input type="password" value={currentPasswordConfirm} onChange={(e) => { setCurrentPasswordConfirm(e.target.value); markAsChanged(); }} className="p-3 border rounded-xl" placeholder="驗證目前密碼"/>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-10">
                   <button onClick={() => resetData()} className="text-xs text-red-400 hover:text-red-500">重置網站內容為初始值</button>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};