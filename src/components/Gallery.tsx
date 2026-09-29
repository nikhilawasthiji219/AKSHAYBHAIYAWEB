import React, { useState } from 'react';
import { X, Play, MapPin, LayoutGrid, Droplets, Flame, Landmark, UserRound, Sparkles } from 'lucide-react';
import { useCMS } from '../lib/cmsStore';
import { useLanguage } from '../lib/languageContext';
import { GalleryItem } from '../types';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <LayoutGrid className="h-full w-full" />,
  rudrabhishek: <Droplets className="h-full w-full" />,
  'havan-yagya': <Flame className="h-full w-full" />,
  'mahakaleshwar-ujjain': <Landmark className="h-full w-full" />,
  'acharya-profile': <UserRound className="h-full w-full" />,
  'vedic-sanskars': <Sparkles className="h-full w-full" />,
  video: <Play className="h-full w-full" />,
};

export const Gallery: React.FC<{ showFilters?: boolean }> = ({ showFilters }) => {
  const cms = useCMS();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  // Dynamic gallery items and categories from CMS store
  const categories = cms.categories;
  const allItems = cms.gallery;

  const items = filter === 'all'
    ? allItems
    : allItems.filter((g) => g.categorySlug === filter || (filter === 'video' && (g.mediaType === 'video' || g.videoUrl)));

  const selectFilter = (id: string) => {
    setFilter(id);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={`py-8 sm:py-10 bg-[#FFF8E8] relative border-b border-[#C89B3C]/20 ${showFilters ? 'md:pb-24' : ''}`} id="gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gallery Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b border-[#C89B3C]/20">
          <div className="flex items-center gap-2">
            <span className="text-[#C94F08] text-sm">❧</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#4A170C]">
              {t('हमारी गैलरी', 'Our Gallery')}
            </h2>
          </div>
          <span className="text-[11px] font-serif text-[#641E12]/80">
            {items.length} छायाचित्र एवं वीडियो
          </span>
        </div>

        {/* Filter Pills — Smoothly Horizontally Scrollable on Mobile, Wrapped on Desktop */}
        {showFilters && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-serif font-bold border transition-all duration-200 shrink-0 whitespace-nowrap active:scale-95 ${filter === c.id
                    ? 'bg-[#D9610B] text-white border-[#D9610B] shadow-xs'
                    : 'bg-[#FFFDF7] text-[#4A170C] border-[#C89B3C]/40 hover:border-[#C94F08]'
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Media Grid (2-columns on mobile for clean touch layout, 4-columns on desktop) */}
        <div className="stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-[#C89B3C]/35 shadow-2xs hover:shadow-md group text-left reveal cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Video Play Badge */}
              {item.videoUrl && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-serif font-bold border border-white/30 backdrop-blur-xs">
                  <Play className="w-2.5 h-2.5 fill-current text-amber-400" /> {t('वीडियो', 'Video')}
                </span>
              )}

              {item.videoUrl && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#C94F08] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  </span>
                </span>
              )}

              <span className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5">
                <span className="block font-serif font-bold text-[11px] sm:text-xs text-white leading-snug drop-shadow-sm line-clamp-2">
                  {item.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Apple-style magnifying dock — desktop gallery navigator */}
      {showFilters && (
        <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
          <Dock
            className="bg-[#FFFDF7]/95 border border-[#C89B3C]/60 shadow-2xl shadow-[#3B1D0B]/25 backdrop-blur-md px-3"
            magnification={72}
            distance={140}
            panelHeight={56}
          >
            {categories.map((c) => (
              <DockItem key={c.id} className="h-full">
                <DockLabel className="border-[#C89B3C]/60 bg-[#FFFDF7] font-serif font-bold text-[#4A170C] shadow-md">
                  {c.label}
                </DockLabel>
                <DockIcon className="h-full p-1">
                  <button
                    type="button"
                    onClick={() => selectFilter(c.id)}
                    aria-label={c.label}
                    className={`flex h-full w-full items-center justify-center rounded-xl transition-colors ${filter === c.id
                        ? 'bg-[#D9610B]/15 text-[#D9610B]'
                        : 'text-[#7D2918] hover:text-[#D9610B]'
                      }`}
                  >
                    {CATEGORY_ICONS[c.id] || <Sparkles className="h-full w-full" />}
                  </button>
                </DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      )}

      {/* Lightbox / Video Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FFF9EE] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#C89B3C] shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#641E12]/90 text-white hover:bg-[#C94F08] transition-colors"
              aria-label={t('बंद करें', 'Close')}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-black flex items-center justify-center min-h-[220px] max-h-[60vh] overflow-hidden">
              {selected.videoUrl ? (
                <video
                  src={selected.videoUrl}
                  poster={selected.imageUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[60vh] bg-black object-contain"
                />
              ) : (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full max-h-[60vh] object-contain bg-black"
                />
              )}
            </div>

            <div className="p-4 space-y-1 bg-[#FFF9EE] overflow-y-auto">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-serif font-bold text-[#D9610B] uppercase">
                  {selected.category}
                </span>
                {selected.location && (
                  <span className="flex items-center gap-1 text-[11px] font-serif text-[#7D2918]">
                    <MapPin className="w-3 h-3 text-[#D9610B]" /> {selected.location}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#4A170C] leading-snug">
                {selected.title}
              </h3>
              <p className="text-xs font-serif text-[#2B2118]/85 leading-relaxed pt-0.5">
                {selected.caption}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
