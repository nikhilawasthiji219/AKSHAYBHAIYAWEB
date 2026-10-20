import React from 'react';
import { Gallery } from '../components/Gallery';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';

// Gallery items mapped to the actual photos in /photos/
const WHEEL_ITEMS: WorksWheelItem[] = [
  {
    title: 'भगवा परिधान',
    image: '/photos/acharya_hero_saffron.jpeg',
  },
  {
    title: 'हवनाग्नि अर्चन',
    image: '/photos/acharya_havan.jpeg',
  },
  {
    title: 'महाकालेश्वर मंदिर',
    image: '/photos/acharya_mahakal_temple.jpeg',
  },
  {
    title: 'पीताम्बर परिधान',
    image: '/photos/acharya_yellow_kurta.jpeg',
  },
  {
    title: 'श्वेत परिधान',
    image: '/photos/acharya_white_dhoti.jpeg',
  },
  {
    title: 'माला अर्पण',
    image: '/photos/acharya_garland_portrait.jpeg',
  },
  {
    title: 'रुद्राक्ष धारण',
    image: '/photos/acharya_red_portrait.jpeg',
  },
  {
    title: 'महाकाल कृपा',
    image: '/photos/visiting_card.jpeg',
  },
];

export const GalleryPage: React.FC = () => {
  return (
    <div className="bg-[#FFF8E8] min-h-screen">
      {/* 3D Works Wheel — interactive gallery hero */}
      <div className="w-full h-[92vh] relative">
        <WorksWheel
          items={WHEEL_ITEMS}
          label="हमारी गैलरी"
          action="देखें"
          className="h-full"
        />
        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="font-serif text-[#4A170C] text-xs tracking-wide">स्क्रॉल करें</span>
          <svg viewBox="0 0 16 24" className="w-4 h-6 text-[#C94F08] animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <line x1="8" y1="5" x2="8" y2="10" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-[#C89B3C]/25">
        <span className="text-[#C94F08] text-lg">❧</span>
        <span className="flex-1 h-px bg-gradient-to-r from-[#C89B3C]/40 via-[#C89B3C]/20 to-transparent" />
        <span className="font-serif text-xs text-[#4A170C]/60 tracking-wide">सम्पूर्ण छायाचित्र संग्रह</span>
        <span className="flex-1 h-px bg-gradient-to-l from-[#C89B3C]/40 via-[#C89B3C]/20 to-transparent" />
        <span className="text-[#C94F08] text-lg">❧</span>
      </div>

      {/* Full gallery grid with filters and lightbox */}
      <Gallery showFilters={true} />
    </div>
  );
};
