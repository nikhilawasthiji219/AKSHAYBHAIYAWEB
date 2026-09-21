import React, { useState } from 'react';
import { X, Play, MapPin } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_DATA } from '../data/gallery';
import { GalleryItem } from '../types';

interface GalleryMedia extends GalleryItem {
  videoUrl?: string;
}

const VIDEO_ITEM: GalleryMedia = {
  id: 'gal-video',
  title: 'पूजन एवं अनुष्ठान वीडियो झलक',
  category: 'वीडियो दर्शन',
  categorySlug: 'video',
  imageUrl: '/photos/acharya_havan.jpeg',
  caption: 'आचार्य जी द्वारा संपन्न वैदिक अनुष्ठान की चलचित्र झलक',
  location: 'उज्जैन, मध्य प्रदेश',
  videoUrl: '/videos/acharya_puja_clip.mp4',
};

export const Gallery: React.FC<{ showFilters?: boolean }> = ({ showFilters }) => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<GalleryMedia | null>(null);

  const photos = filter === 'all' ? GALLERY_DATA : GALLERY_DATA.filter((g) => g.categorySlug === filter);
  const items: GalleryMedia[] = [VIDEO_ITEM, ...photos];

  return (
    <section className="py-10 bg-[#FFF8E8] relative border-b border-[#C89B3C]/20" id="gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#C89B3C]/20">
          <div className="flex items-center gap-2">
            <span className="text-[#C94F08] text-sm">❧</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#4A170C]">हमारी गैलरी</h2>
          </div>
          <span className="text-[11px] font-serif text-[#641E12]/70">
            {items.length} छायाचित्र एवं वीडियो
          </span>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-serif font-bold border transition-all duration-200 ${
                  filter === c.id
                    ? 'bg-[#D9610B] text-white border-[#D9610B] shadow-sm'
                    : 'bg-[#FFFDF7] text-[#4A170C] border-[#C89B3C]/40 hover:border-[#C94F08]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#C89B3C]/35 shadow-xs hover:shadow-md group text-left reveal"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              {item.videoUrl && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-serif font-bold border border-white/30">
                  <Play className="w-3 h-3 fill-current" /> वीडियो
                </span>
              )}
              {item.videoUrl && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 text-[#C94F08] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </span>
              )}
              <span className="absolute bottom-0 left-0 right-0 p-2.5">
                <span className="block font-serif font-bold text-xs text-white leading-snug drop-shadow-sm">
                  {item.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FFF9EE] rounded-2xl overflow-hidden border-2 border-[#C89B3C] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#641E12] text-white hover:bg-[#C94F08] transition-colors"
              aria-label="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
            {selected.videoUrl ? (
              <video
                src={selected.videoUrl}
                poster={selected.imageUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full max-h-[65vh] bg-black"
              />
            ) : (
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full max-h-[65vh] object-contain bg-black"
              />
            )}
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-bold font-serif text-[#4A170C]">{selected.title}</h3>
              <p className="text-xs font-serif text-[#2B2118]/85 leading-relaxed">{selected.caption}</p>
              {selected.location && (
                <p className="flex items-center gap-1 text-[11px] font-serif text-[#C94F08]">
                  <MapPin className="w-3 h-3" /> {selected.location}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
