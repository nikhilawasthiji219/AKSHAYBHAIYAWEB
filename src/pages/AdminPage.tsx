import React, { useState, useRef } from 'react';
import { 
  Lock, LogOut, Plus, Trash2, Edit3, Image as ImageIcon, Video, 
  FileText, Sparkles, Phone, Settings, Download, 
  Upload, RotateCcw, Check, AlertCircle, Eye, EyeOff, X, ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { 
  useCMS, addGalleryItem, updateGalleryItem, deleteGalleryItem,
  addBlog, updateBlog, deleteBlog,
  updateService,
  updateProfile, updateSettings, exportBackupJSON, importBackupJSON,
  resetToDefaults, checkAdminAuth, loginAdmin, logoutAdmin, changeAdminPassword
} from '../lib/cmsStore';
import { GalleryItem, Blog, Service } from '../types';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const cms = useCMS();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAdminAuth());
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab: 'gallery' | 'blogs' | 'services' | 'profile' | 'settings'
  const [activeTab, setActiveTab] = useState<'gallery' | 'blogs' | 'services' | 'profile' | 'settings'>('gallery');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // -------------------------------------------------------------
  // GALLERY STATE & MODALS
  // -------------------------------------------------------------
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState<{
    title: string;
    category: string;
    categorySlug: string;
    imageUrl: string;
    videoUrl: string;
    caption: string;
    location: string;
    mediaType: 'image' | 'video';
  }>({
    title: '',
    category: 'रुद्राभिषेक एवं शिव पूजन',
    categorySlug: 'rudrabhishek',
    imageUrl: '',
    videoUrl: '',
    caption: '',
    location: 'उज्जैन, मध्य प्रदेश',
    mediaType: 'image'
  });

  // -------------------------------------------------------------
  // BLOG STATE & MODALS
  // -------------------------------------------------------------
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState<{
    title: string;
    category: string;
    readTime: string;
    excerpt: string;
    content: string;
    keyTakeaways: string;
    author: string;
    featuredImage: string;
  }>({
    title: '',
    category: 'शिव आराधना',
    readTime: '4 मिनट',
    excerpt: '',
    content: '',
    keyTakeaways: '',
    author: cms.profile.name,
    featuredImage: ''
  });

  // -------------------------------------------------------------
  // SERVICE STATE & MODALS
  // -------------------------------------------------------------
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    shortDesc: string;
    significance: string;
    methodology: string;
    materials: string;
    benefits: string;
    suitableTime: string;
    iconType: string;
    badge: string;
  }>({
    title: '',
    shortDesc: '',
    significance: '',
    methodology: '',
    materials: '',
    benefits: '',
    suitableTime: 'शुभ मुहूर्त अनुसार',
    iconType: 'shiva',
    badge: ''
  });

  // -------------------------------------------------------------
  // PROFILE EDIT FORM
  // -------------------------------------------------------------
  const [profileForm, setProfileForm] = useState({
    name: cms.profile.name,
    title: cms.profile.title,
    tagline: cms.profile.tagline,
    primaryPhone: cms.profile.contact.primaryPhone,
    secondaryPhone: cms.profile.contact.secondaryPhone,
    whatsappNumber: cms.profile.contact.whatsappNumber,
    email: cms.profile.contact.email,
    postalLocation: cms.profile.contact.postalLocation,
    homeAddress: cms.profile.contact.homeAddress,
    karmakshetra: cms.profile.contact.karmakshetra,
    experienceYears: cms.profile.experienceYears,
    announcementTicker: cms.settings.announcementTicker
  });

  // -------------------------------------------------------------
  // PASSWORD CHANGE FORM
  // -------------------------------------------------------------
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // File Input References for Uploads
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const blogImageInputRef = useRef<HTMLInputElement>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------
  // AUTHENTICATION LOGIC
  // -------------------------------------------------------------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput.trim())) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('व्यवस्थापक पोर्टल में आपका स्वागत है! (Welcome to Admin CMS)');
    } else {
      setAuthError('अमान्य पासवर्ड! कृपया सही पासवर्ड दर्ज करें। (Invalid password)');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    showToast('आप सफलतापूर्वक लॉगआउट हो गए हैं।');
  };

  // Convert File to Base64
  const handleFileUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      callback(result);
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // GALLERY HANDLERS
  // -------------------------------------------------------------
  const openAddGalleryModal = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      title: '',
      category: 'रुद्राभिषेक एवं शिव पूजन',
      categorySlug: 'rudrabhishek',
      imageUrl: '',
      videoUrl: '',
      caption: '',
      location: 'उज्जैन, मध्य प्रदेश',
      mediaType: 'image'
    });
    setIsGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      categorySlug: item.categorySlug,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl || '',
      caption: item.caption,
      location: item.location || 'उज्जैन, मध्य प्रदेश',
      mediaType: item.mediaType || (item.videoUrl ? 'video' : 'image')
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title.trim()) {
      showToast('कृपया शीर्षक (Title) दर्ज करें', 'error');
      return;
    }
    if (!galleryForm.imageUrl.trim() && !galleryForm.videoUrl.trim()) {
      showToast('कृपया फ़ोटो या वीडियो चुनें या URL दर्ज करें', 'error');
      return;
    }

    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, {
        title: galleryForm.title,
        category: galleryForm.category,
        categorySlug: galleryForm.categorySlug,
        imageUrl: galleryForm.imageUrl || '/photos/acharya_havan.jpeg',
        videoUrl: galleryForm.videoUrl,
        caption: galleryForm.caption,
        location: galleryForm.location,
        mediaType: galleryForm.mediaType
      });
      showToast('छायाचित्र/वीडियो सफलतापूर्वक अपडेट हुआ!');
    } else {
      addGalleryItem({
        title: galleryForm.title,
        category: galleryForm.category,
        categorySlug: galleryForm.categorySlug,
        imageUrl: galleryForm.imageUrl || '/photos/acharya_havan.jpeg',
        videoUrl: galleryForm.videoUrl,
        caption: galleryForm.caption,
        location: galleryForm.location,
        mediaType: galleryForm.mediaType
      });
      showToast('नया छायाचित्र/वीडियो सफलतापूर्वक जोड़ा गया!');
    }
    setIsGalleryModalOpen(false);
  };

  const handleDeleteGallery = (id: string, title: string) => {
    if (window.confirm(`क्या आप निश्चित हैं कि आप "${title}" को हटाना चाहते हैं?`)) {
      deleteGalleryItem(id);
      showToast('आइटम हटा दिया गया है।');
    }
  };

  // -------------------------------------------------------------
  // BLOG HANDLERS
  // -------------------------------------------------------------
  const openAddBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      category: 'शिव आराधना',
      readTime: '4 मिनट',
      excerpt: '',
      content: '',
      keyTakeaways: '',
      author: cms.profile.name,
      featuredImage: '/photos/acharya_havan.jpeg'
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      readTime: blog.readTime,
      excerpt: blog.excerpt,
      content: blog.content.join('\n\n'),
      keyTakeaways: blog.keyTakeaways.join('\n'),
      author: blog.author,
      featuredImage: blog.featuredImage
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast('कृपया ब्लॉग का शीर्षक दर्ज करें', 'error');
      return;
    }

    const contentParagraphs = blogForm.content
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const takeaways = blogForm.keyTakeaways
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = editingBlog 
      ? editingBlog.slug 
      : 'blog-' + Date.now().toString(36);

    if (editingBlog) {
      updateBlog(editingBlog.id, {
        title: blogForm.title,
        category: blogForm.category,
        readTime: blogForm.readTime,
        excerpt: blogForm.excerpt,
        content: contentParagraphs.length > 0 ? contentParagraphs : [blogForm.excerpt],
        keyTakeaways: takeaways,
        author: blogForm.author,
        featuredImage: blogForm.featuredImage || '/photos/acharya_havan.jpeg'
      });
      showToast('ब्लॉग सफलतापूर्वक अपडेट किया गया!');
    } else {
      addBlog({
        title: blogForm.title,
        slug,
        category: blogForm.category,
        date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: blogForm.readTime,
        excerpt: blogForm.excerpt,
        content: contentParagraphs.length > 0 ? contentParagraphs : [blogForm.excerpt],
        keyTakeaways: takeaways,
        author: blogForm.author,
        featuredImage: blogForm.featuredImage || '/photos/acharya_havan.jpeg'
      });
      showToast('नया ब्लॉग सफलतापूर्वक प्रकाशित हुआ!');
    }
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`क्या आप निश्चित हैं कि आप "${title}" लेख को हटाना चाहते हैं?`)) {
      deleteBlog(id);
      showToast('ब्लॉग हटा दिया गया है।');
    }
  };

  // -------------------------------------------------------------
  // SERVICE HANDLERS
  // -------------------------------------------------------------
  const openEditServiceModal = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      shortDesc: service.shortDesc,
      significance: service.significance,
      methodology: service.methodology,
      materials: service.materials.join(', '),
      benefits: service.benefits.join('\n'),
      suitableTime: service.suitableTime,
      iconType: service.iconType,
      badge: service.badge || ''
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      title: serviceForm.title,
      shortDesc: serviceForm.shortDesc,
      significance: serviceForm.significance,
      methodology: serviceForm.methodology,
      materials: serviceForm.materials.split(',').map((m) => m.trim()).filter(Boolean),
      benefits: serviceForm.benefits.split('\n').map((b) => b.trim()).filter(Boolean),
      suitableTime: serviceForm.suitableTime,
      iconType: serviceForm.iconType,
      badge: serviceForm.badge
    });
    showToast('पूजा सेवा विवरण सफलतापूर्वक अपडेट हुआ!');
    setIsServiceModalOpen(false);
  };

  // -------------------------------------------------------------
  // PROFILE HANDLER
  // -------------------------------------------------------------
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      title: profileForm.title,
      tagline: profileForm.tagline,
      experienceYears: profileForm.experienceYears,
      contact: {
        ...cms.profile.contact,
        primaryPhone: profileForm.primaryPhone,
        secondaryPhone: profileForm.secondaryPhone,
        whatsappNumber: profileForm.whatsappNumber,
        email: profileForm.email,
        postalLocation: profileForm.postalLocation,
        homeAddress: profileForm.homeAddress,
        karmakshetra: profileForm.karmakshetra
      }
    });

    updateSettings({
      announcementTicker: profileForm.announcementTicker
    });

    showToast('वेबसाइट विवरण एवं संपर्क नंबर सफलतापूर्वक अपडेट हो गए!');
  };

  // -------------------------------------------------------------
  // BACKUP & RESTORE
  // -------------------------------------------------------------
  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shastri_akshay_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('बैकअप फ़ाइल सफलतापूर्वक डाउनलोड हो गई!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackupJSON(content);
      if (res.success) {
        showToast('बैकअप सफलतापूर्वक पुनर्स्थापित (Restore) हो गया!');
      } else {
        showToast(`त्रुटि: ${res.error}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetFactory = () => {
    if (window.confirm('सावधानी! क्या आप पूरी वेबसाइट का डेटा मूल फ़ैक्टरी स्थिति पर रीसेट करना चाहते हैं? आपके द्वारा किए गए सभी बदलाव रीसेट हो जाएंगे।')) {
      resetToDefaults();
      showToast('वेबसाइट मूल स्थिति पर रीसेट कर दी गई है।');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const res = changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      showToast(res.message);
      setOldPassword('');
      setNewPassword('');
    } else {
      showToast(res.message, 'error');
    }
  };

  // =============================================================
  // LOGIN SCREEN (If not authenticated)
  // =============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFFDF7] via-[#FFF8E8] to-[#FFF3D6]">
        <div className="max-w-md w-full bg-white rounded-3xl border-2 border-[#C89B3C] shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Spiritual Watermark */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#D9610B]/10 blur-xl pointer-events-none" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D9610B] to-[#9A1B1E] text-white flex items-center justify-center mx-auto shadow-md border-2 border-[#FFD978]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-serif font-bold text-[#D9610B] uppercase tracking-widest block">
                ॥ श्री महाकालेश्वर व्यवस्थापक ॥
              </span>
              <h1 className="text-2xl font-bold font-serif text-[#3B1D0B] mt-1">
                Admin CMS Portal
              </h1>
              <p className="text-xs font-serif text-[#7D2918] mt-1">
                वेबसाइट के छायाचित्र, वीडियो, ब्लॉग एवं विवरण प्रबंधित करें
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1.5">
                व्यवस्थापक पासवर्ड (Admin Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="पासवर्ड दर्ज करें..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-[#C89B3C]/50 focus:border-[#D9610B] focus:ring-2 focus:ring-[#D9610B]/20 outline-none text-sm font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-serif flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] hover:from-[#B84904] hover:to-[#7E1417] text-white font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all tracking-wide"
            >
              पोर्टल में प्रवेश करें (Login)
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#F3E7CA] flex flex-col items-center gap-3 text-center">
            <span className="text-[11px] text-[#7D2918] bg-[#FFF8E8] px-3 py-1 rounded-full border border-[#C89B3C]/40">
              💡 डिफ़ॉल्ट पासवर्ड: <strong>admin123</strong>
            </span>

            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-serif text-[#D9610B] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>वेबसाइट पर वापस जाएँ</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =============================================================
  // MAIN AUTHENTICATED ADMIN DASHBOARD
  // =============================================================
  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-24 text-[#2B2118]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-serif font-bold text-white transition-all transform animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FFF8E8] border-b border-[#C89B3C]/40 shadow-xs px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-white border border-[#C89B3C]/40 text-[#4A170C] hover:bg-[#FFF3D6] transition-colors"
              title="वेबसाइट पर जाएँ"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D9610B] text-white">
                  CMS ADMIN
                </span>
                <span className="text-xs text-[#7D2918] font-serif hidden sm:inline">
                  {cms.profile.name}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold font-serif text-[#3B1D0B] leading-none mt-0.5">
                वेबसाइट नियंत्रण कक्ष (Website Control Panel)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#C89B3C]/50 text-xs font-serif font-bold text-[#4A170C] bg-white hover:bg-[#FFF3D6] shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D9610B]" />
              <span>लाइव साइट देखें</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FFF3D6] text-xs font-serif font-bold text-[#8E2800] border border-[#C89B3C]/60 hover:bg-[#FFE8B8]"
              title="बैकअप डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">बैकअप</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-serif font-bold shadow-2xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#C89B3C]/30 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D9610B] flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#3B1D0B]">{cms.gallery.length}</div>
              <div className="text-[11px] font-serif text-gray-500">गैलरी फ़ोटो व वीडियो</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#C89B3C]/30 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#3B1D0B]">{cms.blogs.length}</div>
              <div className="text-[11px] font-serif text-gray-500">प्रकाशित लेख / ब्लॉग</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#C89B3C]/30 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-[#3B1D0B]">{cms.services.length}</div>
              <div className="text-[11px] font-serif text-gray-500">वैदिक पूजा सेवाएँ</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#C89B3C]/30 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold font-serif text-[#3B1D0B] truncate">{cms.profile.contact.whatsappNumber}</div>
              <div className="text-[11px] font-serif text-gray-500">सक्रिय WhatsApp</div>
            </div>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar border-b border-[#C89B3C]/30 pb-2">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-[#D9610B] text-white shadow-sm'
                : 'bg-white text-[#4A170C] border border-[#C89B3C]/40 hover:bg-[#FFF8E8]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>गैलरी (Photos & Videos)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
              {cms.gallery.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'blogs'
                ? 'bg-[#D9610B] text-white shadow-sm'
                : 'bg-white text-[#4A170C] border border-[#C89B3C]/40 hover:bg-[#FFF8E8]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>ब्लॉग प्रबंधन (Blogs)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
              {cms.blogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-[#D9610B] text-white shadow-sm'
                : 'bg-white text-[#4A170C] border border-[#C89B3C]/40 hover:bg-[#FFF8E8]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>पूजा सेवाएँ (Services)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#D9610B] text-white shadow-sm'
                : 'bg-white text-[#4A170C] border border-[#C89B3C]/40 hover:bg-[#FFF8E8]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>संपर्क व विवरण (Contact & Profile)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#D9610B] text-white shadow-sm'
                : 'bg-white text-[#4A170C] border border-[#C89B3C]/40 hover:bg-[#FFF8E8]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>बैकअप एवं सेटिंग्स (Backup & Settings)</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: GALLERY MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#C89B3C]/30 shadow-xs">
              <div>
                <h2 className="text-lg font-bold font-serif text-[#3B1D0B]">
                  गैलरी प्रबंधन (Photos & Videos Manager)
                </h2>
                <p className="text-xs font-serif text-gray-600 mt-0.5">
                  यहाँ से आप वेबसाइट की गैलरी में नए फ़ोटो व वीडियो जोड़ सकते हैं, बदल सकते हैं अथवा हटा सकते हैं।
                </p>
              </div>

              <button
                onClick={openAddGalleryModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] hover:from-[#B84904] hover:to-[#7E1417] text-white font-serif font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>नया फ़ोटो / वीडियो जोड़ें</span>
              </button>
            </div>

            {/* Gallery Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cms.gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#C89B3C]/40 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.videoUrl && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 text-white text-[10px] font-serif font-bold border border-white/30">
                        <Video className="w-3 h-3 text-red-400" /> वीडियो
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-serif">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#3B1D0B] line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-serif text-gray-600 line-clamp-2 mt-0.5">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-serif">
                      <span className="text-[11px] text-gray-500 truncate max-w-[120px]">
                        {item.location}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditGalleryModal(item)}
                          className="p-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                          title="बदलें / संपादित करें"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item.id, item.title)}
                          className="p-1.5 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          title="हटाएँ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: BLOGS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#C89B3C]/30 shadow-xs">
              <div>
                <h2 className="text-lg font-bold font-serif text-[#3B1D0B]">
                  ब्लॉग व धार्मिक लेख प्रबंधन (Blogs Manager)
                </h2>
                <p className="text-xs font-serif text-gray-600 mt-0.5">
                  यहाँ से आप नए वैदिक व धार्मिक लेख प्रकाशित कर सकते हैं, पुराने लेख संपादित या हटा सकते हैं।
                </p>
              </div>

              <button
                onClick={openAddBlogModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] hover:from-[#B84904] hover:to-[#7E1417] text-white font-serif font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>नया लेख लिखें</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cms.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl border border-[#C89B3C]/40 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] bg-gray-100">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#D9610B] text-white text-[10px] font-serif font-bold shadow-xs">
                      {blog.category}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-serif">
                      ⏱ {blog.readTime}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-gray-500 font-serif mb-1">
                        📅 {blog.date} • ✍️ {blog.author}
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#3B1D0B] line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs font-serif text-gray-600 line-clamp-3 mt-1.5 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate(`/blogs/${blog.slug}`)}
                        className="text-xs font-serif font-bold text-[#D9610B] hover:underline"
                      >
                        वेबसाइट पर देखें ➔
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditBlogModal(blog)}
                          className="p-2 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                          title="संपादित करें"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id, blog.title)}
                          className="p-2 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          title="हटाएँ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SERVICES MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-[#C89B3C]/30 shadow-xs">
              <h2 className="text-lg font-bold font-serif text-[#3B1D0B]">
                प्रमुख पूजा एवं अनुष्ठान सेवाएँ ({cms.services.length})
              </h2>
              <p className="text-xs font-serif text-gray-600 mt-0.5">
                यहाँ से आप किसी भी पूजा सेवा का नाम, विवरण, धार्मिक महत्व, सामग्री और लाभ संपादित कर सकते हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cms.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-[#C89B3C]/40 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-base text-[#4A170C]">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-serif font-bold shrink-0">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-serif text-gray-600 line-clamp-3">
                      {service.shortDesc}
                    </p>
                    <div className="text-[11px] font-serif text-[#D9610B]">
                      ⏱ {service.suitableTime}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(`/services/${service.slug}`)}
                      className="text-xs font-serif text-gray-500 hover:text-[#D9610B]"
                    >
                      पेज देखें ➔
                    </button>
                    <button
                      onClick={() => openEditServiceModal(service)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-serif font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>संपादित करें</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PROFILE & CONTACT DETAILS */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-5 sm:p-6 shadow-xs max-w-4xl mx-auto">
            <div className="mb-6 pb-3 border-b border-[#C89B3C]/20">
              <h2 className="text-lg font-bold font-serif text-[#3B1D0B]">
                आचार्य विवरण एवं संपर्क सूत्र (Profile & Contact Info)
              </h2>
              <p className="text-xs font-serif text-gray-600">
                यहाँ किए गए बदलाव पूरी वेबसाइट (हेडर, फ़ूटर, होमपेज, WhatsApp बटन्स) पर तुरंत लागू होंगे।
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    आचार्य जी का नाम (Full Name)
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    पदवी / उपाधि (Title)
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    प्राथमिक फोन नंबर (Primary Phone)
                  </label>
                  <input
                    type="text"
                    value={profileForm.primaryPhone}
                    onChange={(e) => setProfileForm({ ...profileForm, primaryPhone: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    द्वितीय फोन नंबर (Secondary Phone)
                  </label>
                  <input
                    type="text"
                    value={profileForm.secondaryPhone}
                    onChange={(e) => setProfileForm({ ...profileForm, secondaryPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-emerald-800 mb-1">
                    WhatsApp नंबर (Direct Chat)
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsappNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/40 text-sm font-sans focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    ईमेल (Email Address)
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    अनुभव वर्ष (Experience Years)
                  </label>
                  <input
                    type="text"
                    value={profileForm.experienceYears}
                    onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  तीर्थ क्षेत्र / कर्मक्षेत्र (Temple / Location)
                </label>
                <input
                  type="text"
                  value={profileForm.postalLocation}
                  onChange={(e) => setProfileForm({ ...profileForm, postalLocation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  घर / आश्रम का पूरा पता (Address)
                </label>
                <input
                  type="text"
                  value={profileForm.homeAddress}
                  onChange={(e) => setProfileForm({ ...profileForm, homeAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  शीर्ष टैगलाइन (Tagline)
                </label>
                <textarea
                  rows={2}
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-sans focus:border-[#D9610B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#D9610B] mb-1">
                  घोषणा पट्टी / टिकर संदेश (Announcement Ticker)
                </label>
                <input
                  type="text"
                  value={profileForm.announcementTicker}
                  onChange={(e) => setProfileForm({ ...profileForm, announcementTicker: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-sm font-sans focus:border-[#D9610B] outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] hover:from-[#B84904] hover:to-[#7E1417] text-white font-serif font-bold text-sm shadow-md transition-all"
                >
                  बदलाव सहेजें (Save Changes)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BACKUP, SETTINGS & SECURITY */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Backup & Export / Import Card */}
            <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold font-serif text-[#3B1D0B] flex items-center gap-2">
                <Download className="w-5 h-5 text-[#D9610B]" />
                <span>वेबसाइट डेटा बैकअप एवं पुनर्स्थापना (Data Backup & Restore)</span>
              </h2>
              <p className="text-xs font-serif text-gray-600">
                आप अपनी पूरी वेबसाइट के फ़ोटो, वीडियो, ब्लॉग और विवरण का बैकअप कभी भी एक क्लिक में डाउनलोड कर सकते हैं या किसी अन्य डिवाइस में अपलोड कर सकते हैं।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportBackup}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D9610B] hover:bg-[#B84904] text-white text-xs sm:text-sm font-serif font-bold shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>संपूर्ण डेटा बैकअप डाउनलोड करें (.JSON)</span>
                </button>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white text-xs sm:text-sm font-serif font-bold shadow-xs cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>बैकअप फ़ाइल अपलोड करें</span>
                  <input
                    type="file"
                    ref={jsonFileInputRef}
                    onChange={handleImportFile}
                    accept=".json,application/json"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold font-serif text-[#3B1D0B] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#9A1B1E]" />
                <span>व्यवस्थापक पासवर्ड बदलें (Change Admin Password)</span>
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    वर्तमान पासवर्ड (Current Password)
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    placeholder="वर्तमान पासवर्ड..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    नया पासवर्ड (New Password)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="नया पासवर्ड..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#9A1B1E] hover:bg-[#7E1417] text-white text-xs sm:text-sm font-serif font-bold shadow-xs"
                >
                  पासवर्ड बदलें
                </button>
              </form>
            </div>

            {/* Factory Reset Card */}
            <div className="bg-red-50/50 rounded-2xl border border-red-200 p-5 sm:p-6 shadow-xs space-y-3">
              <h2 className="text-lg font-bold font-serif text-red-800 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-600" />
                <span>मूल स्थिति पर रीसेट करें (Reset to Default Data)</span>
              </h2>
              <p className="text-xs font-serif text-red-700">
                यदि आप वेबसाइट का सारा डेटा पुनः प्रारम्भिक स्थिति में वापस लाना चाहते हैं, तो नीचे दिए गए बटन पर क्लिक करें।
              </p>
              <button
                onClick={handleResetFactory}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-serif font-bold transition-colors"
              >
                डिफ़ॉल्ट डेटा रीसेट करें
              </button>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT GALLERY ITEM */}
      {/* ========================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-[#C89B3C] shadow-2xl relative my-8">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-serif text-[#3B1D0B] mb-4">
              {editingGalleryItem ? 'छायाचित्र / वीडियो संपादित करें' : 'नया छायाचित्र / वीडियो जोड़ें'}
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              
              {/* Media Type Selection */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1.5">
                  मीडिया प्रकार (Media Type)
                </label>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-xs font-serif font-bold cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      value="image"
                      checked={galleryForm.mediaType === 'image'}
                      onChange={() => setGalleryForm({ ...galleryForm, mediaType: 'image' })}
                    />
                    <span>📷 छायाचित्र (Photo)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-serif font-bold cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      value="video"
                      checked={galleryForm.mediaType === 'video'}
                      onChange={() => setGalleryForm({ ...galleryForm, mediaType: 'video' })}
                    />
                    <span>🎥 वीडियो (Video)</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  शीर्षक (Title) *
                </label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="उदा. पावन रुद्राभिषेक पूजन"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  श्रेणी (Category)
                </label>
                <select
                  value={galleryForm.categorySlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const cat = cms.categories.find((c) => c.id === slug);
                    setGalleryForm({
                      ...galleryForm,
                      categorySlug: slug,
                      category: cat ? cat.label : galleryForm.category
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                >
                  {cms.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload / URL */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  {galleryForm.mediaType === 'video' ? 'वीडियो थंबनेल फ़ोटो (Poster Photo)' : 'फ़ोटो फ़ाइल अथवा URL *'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={galleryForm.imageUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                    placeholder="/photos/... या https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-sans outline-none focus:border-[#D9610B]"
                  />
                  <label className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-serif font-bold cursor-pointer shrink-0">
                    <span>फ़ाइल चुनें</span>
                    <input
                      type="file"
                      ref={imageFileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (base64) => {
                            setGalleryForm({ ...galleryForm, imageUrl: base64 });
                            showToast('फ़ोटो अपलोड हो गई!');
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                {galleryForm.imageUrl && (
                  <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                    <img src={galleryForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Video URL (if video) */}
              {galleryForm.mediaType === 'video' && (
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    वीडियो फ़ाइल अथवा URL (Video File / URL) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={galleryForm.videoUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, videoUrl: e.target.value })}
                      placeholder="/videos/acharya_puja_clip.mp4"
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-sans outline-none focus:border-[#D9610B]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-serif font-bold cursor-pointer shrink-0">
                      <span>वीडियो फ़ाइल चुनें</span>
                      <input
                        type="file"
                        ref={videoFileInputRef}
                        accept="video/mp4,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, (base64) => {
                              setGalleryForm({ ...galleryForm, videoUrl: base64 });
                              showToast('वीडियो फ़ाइल अपलोड हो गई!');
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  विवरण / कैप्शन (Caption)
                </label>
                <textarea
                  rows={2}
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  placeholder="पूजा एवं अनुष्ठान के विषय में संक्षिप्त विवरण..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-sans outline-none focus:border-[#D9610B]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  स्थान (Location)
                </label>
                <input
                  type="text"
                  value={galleryForm.location}
                  onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                  placeholder="उज्जैन, रामघाट, महाकाल मंदिर"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-sans outline-none focus:border-[#D9610B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-serif font-bold text-gray-700 hover:bg-gray-50"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] text-white text-xs font-serif font-bold shadow-xs hover:from-[#B84904] hover:to-[#7E1417]"
                >
                  {editingGalleryItem ? 'अपडेट करें' : 'गैलरी में जोड़ें'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT BLOG */}
      {/* ========================================================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border-2 border-[#C89B3C] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-serif text-[#3B1D0B] mb-4">
              {editingBlog ? 'धार्मिक लेख / ब्लॉग संपादित करें' : 'नया धार्मिक लेख लिखें'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  ब्लॉग शीर्षक (Title) *
                </label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="उदा. उज्जैन में रुद्राभिषेक का आध्यात्मिक महत्व"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    श्रेणी (Category)
                  </label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    placeholder="शिव आराधना, वैदिक ज्ञान"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    पढ़ने का समय (Read Time)
                  </label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="4 मिनट"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    लेखक (Author)
                  </label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  कवर फ़ोटो (Featured Image)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={blogForm.featuredImage}
                    onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                    placeholder="/photos/... या इमेज URL"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                  <label className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-serif font-bold cursor-pointer shrink-0">
                    <span>फ़ाइल चुनें</span>
                    <input
                      type="file"
                      ref={blogImageInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (base64) => {
                            setBlogForm({ ...blogForm, featuredImage: base64 });
                            showToast('कवर फ़ोटो अपलोड हो गई!');
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  संक्षिप्त सारांश (Excerpt) *
                </label>
                <textarea
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="लेख का मुख्य परिचय जो कार्ड्स पर दिखेगा..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              {/* Content Paragraphs */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  संपूर्ण लेख की सामग्री (Full Content - पैराग्राफ के बीच में दो बार Enter दबाएं) *
                </label>
                <textarea
                  rows={7}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="यहाँ लेख का विस्तृत वर्णन लिखें..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B] leading-relaxed"
                />
              </div>

              {/* Key Takeaways */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  मुख्य निष्कर्ष व लाभ (Key Takeaways - प्रत्येक पंक्ति एक बिंदु बनेगी)
                </label>
                <textarea
                  rows={3}
                  value={blogForm.keyTakeaways}
                  onChange={(e) => setBlogForm({ ...blogForm, keyTakeaways: e.target.value })}
                  placeholder="अकाल मृत्यु निवारण\nदीर्घायु व आरोग्यता की प्राप्ति"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-serif font-bold text-gray-700 hover:bg-gray-50"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9610B] to-[#9A1B1E] text-white text-xs font-serif font-bold shadow-xs hover:from-[#B84904] hover:to-[#7E1417]"
                >
                  {editingBlog ? 'ब्लॉग अपडेट करें' : 'ब्लॉग प्रकाशित करें'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT SERVICE */}
      {/* ========================================================= */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border-2 border-[#C89B3C] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-serif text-[#3B1D0B] mb-4">
              पूजा सेवा विवरण संपादित करें
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  पूजा का नाम (Title) *
                </label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#D9610B]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  संक्षिप्त विवरण (Short Description)
                </label>
                <textarea
                  rows={2}
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  धार्मिक महत्व (Significance)
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.significance}
                  onChange={(e) => setServiceForm({ ...serviceForm, significance: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  शास्त्रोक्त विधि-विधान (Methodology)
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.methodology}
                  onChange={(e) => setServiceForm({ ...serviceForm, methodology: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                  पूजन के मुख्य लाभ (Benefits - प्रत्येक पंक्ति में एक लाभ लिखें)
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.benefits}
                  onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    शुभ समय / मुहूर्त
                  </label>
                  <input
                    type="text"
                    value={serviceForm.suitableTime}
                    onChange={(e) => setServiceForm({ ...serviceForm, suitableTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-[#3B1D0B] mb-1">
                    बैज (Badge - जैसे 'अति लोकप्रिय')
                  </label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#D9610B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-serif font-bold text-gray-700 hover:bg-gray-50"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D9610B] hover:bg-[#B84904] text-white text-xs font-serif font-bold shadow-xs"
                >
                  अपडेट सहेजें
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
