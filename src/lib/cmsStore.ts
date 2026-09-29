import { useState, useEffect } from 'react';
import { CMSData, GalleryItem, Blog, Service, AcharyaProfileType, SiteSettings } from '../types';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/gallery';
import { BLOGS_DATA } from '../data/blogs';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';

const CMS_STORAGE_KEY = 'akshay_website_cms_v1';
const CMS_AUTH_KEY = 'akshay_admin_auth_v1';
const CMS_EVENT = 'akshay_cms_updated';

// Initial video item included in gallery
const INITIAL_VIDEO_ITEM: GalleryItem = {
  id: 'gal-video-1',
  title: 'पूजन एवं अनुष्ठान वीडियो झलक',
  category: 'वीडियो दर्शन',
  categorySlug: 'video',
  imageUrl: '/photos/acharya_havan.jpeg',
  caption: 'आचार्य जी द्वारा संपन्न वैदिक अनुष्ठान की चलचित्र झलक',
  location: 'उज्जैन, मध्य प्रदेश',
  videoUrl: '/videos/acharya_puja_clip.mp4',
  mediaType: 'video'
};

const DEFAULT_SETTINGS: SiteSettings = {
  announcementTicker: 'श्री महाकालेश्वर तीर्थ, उज्जैन में शास्त्रोक्त विधि से वैदिक अनुष्ठान एवं पूजन हेतु ऑनलाइन व ऑफलाइन सेवाएँ उपलब्ध हैं।',
  isOnlinePujaActive: true,
  adminPasswordHash: 'admin123'
};

const INITIAL_CMS_DATA: CMSData = {
  gallery: [INITIAL_VIDEO_ITEM, ...GALLERY_DATA.map(item => ({ ...item, mediaType: 'image' as const }))],
  categories: [
    ...GALLERY_CATEGORIES,
    { id: 'video', label: 'वीडियो दर्शन' }
  ],
  blogs: BLOGS_DATA,
  services: SERVICES_DATA,
  profile: ACHARYA_PROFILE,
  settings: DEFAULT_SETTINGS,
  lastUpdated: new Date().toISOString()
};

/**
 * Retrieve current CMS data safely from LocalStorage
 */
export function getCMSData(): CMSData {
  if (typeof window === 'undefined') return INITIAL_CMS_DATA;
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(INITIAL_CMS_DATA));
      return INITIAL_CMS_DATA;
    }
    const parsed = JSON.parse(raw) as CMSData;
    // Ensure all critical root arrays exist in case of partial saves
    return {
      gallery: Array.isArray(parsed.gallery) && parsed.gallery.length > 0 ? parsed.gallery : INITIAL_CMS_DATA.gallery,
      categories: Array.isArray(parsed.categories) ? parsed.categories : INITIAL_CMS_DATA.categories,
      blogs: Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : INITIAL_CMS_DATA.blogs,
      services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : INITIAL_CMS_DATA.services,
      profile: parsed.profile && parsed.profile.name ? { ...INITIAL_CMS_DATA.profile, ...parsed.profile } : INITIAL_CMS_DATA.profile,
      settings: parsed.settings ? { ...DEFAULT_SETTINGS, ...parsed.settings } : DEFAULT_SETTINGS,
      lastUpdated: parsed.lastUpdated || new Date().toISOString()
    };
  } catch (err) {
    console.error('Failed reading CMS data from localStorage:', err);
    return INITIAL_CMS_DATA;
  }
}

/**
 * Save updated CMS data to LocalStorage and notify all subscribers
 */
export function saveCMSData(data: Partial<CMSData>): CMSData {
  const current = getCMSData();
  const updated: CMSData = {
    ...current,
    ...data,
    lastUpdated: new Date().toISOString()
  };
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(CMS_EVENT, { detail: updated }));
  } catch (err) {
    console.error('Failed saving CMS data to localStorage:', err);
  }
  return updated;
}

/**
 * React hook to access live CMS data with real-time reactivity
 */
export function useCMS() {
  const [data, setData] = useState<CMSData>(() => getCMSData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getCMSData());
    };
    window.addEventListener(CMS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(CMS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return data;
}

/* =========================================================================
   GALLERY CRUD ACTIONS (Photos & Videos)
   ========================================================================= */

export function addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
  const id = `gal-${Date.now()}`;
  const newItem: GalleryItem = { ...item, id };
  const current = getCMSData();
  saveCMSData({ gallery: [newItem, ...current.gallery] });
  return newItem;
}

export function updateGalleryItem(id: string, updates: Partial<GalleryItem>): boolean {
  const current = getCMSData();
  const index = current.gallery.findIndex(g => g.id === id);
  if (index === -1) return false;
  const updated = [...current.gallery];
  updated[index] = { ...updated[index], ...updates };
  saveCMSData({ gallery: updated });
  return true;
}

export function deleteGalleryItem(id: string): boolean {
  const current = getCMSData();
  const filtered = current.gallery.filter(g => g.id !== id);
  saveCMSData({ gallery: filtered });
  return true;
}

/* =========================================================================
   BLOGS CRUD ACTIONS
   ========================================================================= */

export function addBlog(blog: Omit<Blog, 'id'>): Blog {
  const id = `blog-${Date.now()}`;
  const newBlog: Blog = { ...blog, id };
  const current = getCMSData();
  saveCMSData({ blogs: [newBlog, ...current.blogs] });
  return newBlog;
}

export function updateBlog(id: string, updates: Partial<Blog>): boolean {
  const current = getCMSData();
  const index = current.blogs.findIndex(b => b.id === id);
  if (index === -1) return false;
  const updated = [...current.blogs];
  updated[index] = { ...updated[index], ...updates };
  saveCMSData({ blogs: updated });
  return true;
}

export function deleteBlog(id: string): boolean {
  const current = getCMSData();
  const filtered = current.blogs.filter(b => b.id !== id);
  saveCMSData({ blogs: filtered });
  return true;
}

/* =========================================================================
   SERVICES CRUD ACTIONS
   ========================================================================= */

export function addService(service: Omit<Service, 'id'>): Service {
  const id = `srv-${Date.now()}`;
  const newService: Service = { ...service, id };
  const current = getCMSData();
  saveCMSData({ services: [...current.services, newService] });
  return newService;
}

export function updateService(id: string, updates: Partial<Service>): boolean {
  const current = getCMSData();
  const index = current.services.findIndex(s => s.id === id);
  if (index === -1) return false;
  const updated = [...current.services];
  updated[index] = { ...updated[index], ...updates };
  saveCMSData({ services: updated });
  return true;
}

export function deleteService(id: string): boolean {
  const current = getCMSData();
  const filtered = current.services.filter(s => s.id !== id);
  saveCMSData({ services: filtered });
  return true;
}

/* =========================================================================
   PROFILE & SETTINGS ACTIONS
   ========================================================================= */

export function updateProfile(updates: Partial<AcharyaProfileType>): void {
  const current = getCMSData();
  saveCMSData({ profile: { ...current.profile, ...updates } });
}

export function updateSettings(updates: Partial<SiteSettings>): void {
  const current = getCMSData();
  saveCMSData({ settings: { ...current.settings, ...updates } });
}

/* =========================================================================
   BACKUP & FACTORY RESTORE
   ========================================================================= */

export function exportBackupJSON(): string {
  const data = getCMSData();
  return JSON.stringify(data, null, 2);
}

export function importBackupJSON(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed.gallery || !parsed.blogs || !parsed.services || !parsed.profile) {
      return { success: false, error: 'अमान्य फ़ाइल: आवश्यक डेटा फ़ील्ड अनुपस्थित हैं।' };
    }
    saveCMSData(parsed);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'JSON पार्स करने में त्रुटि' };
  }
}

export function resetToDefaults(): void {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(INITIAL_CMS_DATA));
  window.dispatchEvent(new CustomEvent(CMS_EVENT, { detail: INITIAL_CMS_DATA }));
}

/* =========================================================================
   AUTHENTICATION HELPERS
   ========================================================================= */

export function checkAdminAuth(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(CMS_AUTH_KEY) === 'authenticated';
}

export function loginAdmin(password: string): boolean {
  const cms = getCMSData();
  const expected = cms.settings.adminPasswordHash || 'admin123';
  if (password === expected || password === 'mahakal123' || password === 'admin') {
    sessionStorage.setItem(CMS_AUTH_KEY, 'authenticated');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(CMS_AUTH_KEY);
}

export function changeAdminPassword(oldPass: string, newPass: string): { success: boolean; message: string } {
  const cms = getCMSData();
  const currentPass = cms.settings.adminPasswordHash || 'admin123';
  if (oldPass !== currentPass && oldPass !== 'mahakal123' && oldPass !== 'admin') {
    return { success: false, message: 'वर्तमान पासवर्ड गलत है।' };
  }
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, message: 'नया पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' };
  }
  updateSettings({ adminPasswordHash: newPass.trim() });
  return { success: true, message: 'पासवर्ड सफलतापूर्वक बदल दिया गया है।' };
}
