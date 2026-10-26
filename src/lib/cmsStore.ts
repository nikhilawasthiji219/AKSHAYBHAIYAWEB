import { useState, useEffect } from 'react';
import { CMSData, GalleryItem, Blog, Service, AcharyaProfileType, SiteSettings } from '../types';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/gallery';
import { BLOGS_DATA } from '../data/blogs';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';

const CMS_STORAGE_KEY = 'akshay_website_cms_v2';
const CMS_AUTH_KEY = 'akshay_admin_auth_v1';
const CMS_EVENT = 'akshay_cms_updated';



const DEFAULT_SETTINGS: SiteSettings = {
  announcementTicker: 'श्री महाकालेश्वर तीर्थ, उज्जैन में शास्त्रोक्त विधि से वैदिक अनुष्ठान एवं पूजन हेतु ऑनलाइन व ऑफलाइन सेवाएँ उपलब्ध हैं।',
  isOnlinePujaActive: true,
  adminPasswordHash: 'admin123'
};

const INITIAL_CMS_DATA: CMSData = {
  gallery: GALLERY_DATA.map(item => ({ ...item, mediaType: 'image' as const })),
  categories: [...GALLERY_CATEGORIES],
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
    // Ensure all critical root arrays exist in case of partial saves.
    // NOTE: an empty array is a valid, intentional state (the admin deleted every
    // item), so only fall back to defaults when the key is missing / not an array.
    return {
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : INITIAL_CMS_DATA.gallery,
      categories: Array.isArray(parsed.categories) ? parsed.categories : INITIAL_CMS_DATA.categories,
      blogs: Array.isArray(parsed.blogs) ? parsed.blogs : INITIAL_CMS_DATA.blogs,
      services: Array.isArray(parsed.services) ? parsed.services : INITIAL_CMS_DATA.services,
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
  if (filtered.length === current.gallery.length) return false;
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
  if (filtered.length === current.blogs.length) return false;
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
  if (filtered.length === current.services.length) return false;
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
  // Never export the admin credential inside a shareable backup file.
  const safeSettings = { ...data.settings };
  delete safeSettings.adminPasswordHash;
  return JSON.stringify({ ...data, settings: safeSettings }, null, 2);
}

export function importBackupJSON(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { success: false, error: 'अमान्य फ़ाइल: बैकअप में JSON ऑब्जेक्ट होना चाहिए।' };
    }
    if (
      !Array.isArray(parsed.gallery) ||
      !Array.isArray(parsed.blogs) ||
      !Array.isArray(parsed.services)
    ) {
      return { success: false, error: 'अमान्य फ़ाइल: gallery, blogs एवं services सूचियाँ अनुपस्थित हैं।' };
    }
    if (!parsed.profile || typeof parsed.profile.name !== 'string' || !parsed.profile.name.trim()) {
      return { success: false, error: 'अमान्य फ़ाइल: प्रोफ़ाइल (profile.name) अनुपस्थित या अमान्य है।' };
    }

    const hasBadGalleryItem = parsed.gallery.some(
      (g: unknown) => !g || typeof (g as GalleryItem).id !== 'string' || typeof (g as GalleryItem).imageUrl !== 'string'
    );
    const hasBadBlog = parsed.blogs.some(
      (b: unknown) => !b || typeof (b as Blog).id !== 'string' || typeof (b as Blog).slug !== 'string'
    );
    const hasBadService = parsed.services.some(
      (s: unknown) => !s || typeof (s as Service).id !== 'string' || typeof (s as Service).slug !== 'string'
    );
    if (hasBadGalleryItem || hasBadBlog || hasBadService) {
      return { success: false, error: 'अमान्य फ़ाइल: कुछ प्रविष्टियों में आवश्यक फ़ील्ड अनुपस्थित हैं।' };
    }

    const payload: Partial<CMSData> = {
      gallery: parsed.gallery,
      blogs: parsed.blogs,
      services: parsed.services,
      profile: parsed.profile
    };
    if (Array.isArray(parsed.categories)) payload.categories = parsed.categories;

    if (parsed.settings && typeof parsed.settings === 'object') {
      // Never let an imported file overwrite the admin credential, and keep any
      // settings the file does not mention (merge over current values).
      const safeSettings = { ...parsed.settings };
      delete safeSettings.adminPasswordHash;
      payload.settings = { ...getCMSData().settings, ...safeSettings };
    }

    saveCMSData(payload);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error && err.message ? err.message : 'JSON पार्स करने में त्रुटि',
    };
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
  // NOTE: this is a client-side gate only (static site). Real protection needs
  // a server session — see PROJECT_STATE.md. Do not add backdoor passwords here.
  const expected = cms.settings.adminPasswordHash;
  if (expected && password === expected) {
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
  const currentPass = cms.settings.adminPasswordHash;
  if (!currentPass || oldPass !== currentPass) {
    return { success: false, message: 'वर्तमान पासवर्ड गलत है।' };
  }
  if (!newPass || newPass.trim().length < 8) {
    return { success: false, message: 'नया पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।' };
  }
  updateSettings({ adminPasswordHash: newPass.trim() });
  return { success: true, message: 'पासवर्ड सफलतापूर्वक बदल दिया गया है।' };
}
