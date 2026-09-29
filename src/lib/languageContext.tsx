import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'hi' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (hi: string, en: string) => string;
}

const LANG_KEY = 'akshay_site_lang';

const LanguageContext = createContext<LanguageContextType>({
  lang: 'hi',
  toggleLanguage: () => {},
  t: (hi) => hi,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      return stored === 'en' ? 'en' : 'hi';
    } catch {
      return 'hi';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
      // Set html lang attribute for accessibility / SEO
      document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    } catch {}
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  }, []);

  // Convenience translation function — returns Hindi or English string based on current lang
  const t = useCallback((hi: string, en: string): string => {
    return lang === 'hi' ? hi : en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
