import React from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/languageContext';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="min-h-[70vh] bg-[#FFF8E8] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF0D4] border border-[#C89B3C]/50 text-[#C94F08]">
          <Sparkles className="w-7 h-7" />
        </div>

        <p className="font-serif text-[#C94F08] tracking-[0.3em] text-xs uppercase">
          ॥ ॐ नमः शिवाय ॥
        </p>

        <h1 className="font-serif font-bold text-[#641E12] text-4xl sm:text-5xl">
          404
        </h1>

        <h2 className="font-serif font-bold text-[#3B1D0B] text-xl sm:text-2xl">
          {t('यह पृष्ठ नहीं मिला', 'This page could not be found')}
        </h2>

        <p className="font-serif text-sm sm:text-base text-[#2B2118]/75 leading-relaxed">
          {t(
            'आप जिस पृष्ठ की खोज कर रहे हैं वह हटा दिया गया है या उसका पता बदल गया है। कृपया होम पर लौटें या हमारी सेवाएँ देखें।',
            'The page you are looking for has been moved or no longer exists. Please return home or browse our services.'
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#D9610B] hover:bg-[#B84904] text-white font-serif font-bold text-sm shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('होम पर जाएँ', 'Go to Home')}
          </button>

          <button
            onClick={() => onNavigate('/services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#FFFDF7] border border-[#C89B3C]/60 hover:border-[#C94F08] text-[#4A170C] font-serif font-bold text-sm transition-colors"
          >
            {t('सभी सेवाएँ देखें', 'View all services')}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto pt-0" />
      </div>
    </section>
  );
};
