import React, { useState } from 'react';
import { ChevronRight, Play, X } from 'lucide-react';

interface ElasticGalleryProps {
  onSelectRitual?: (ritualName: string) => void;
  onViewAll?: () => void;
}

export const ElasticGallery: React.FC<ElasticGalleryProps> = ({ onSelectRitual, onViewAll }) => {
  const [active, setActive] = useState(2);
  const [videoOpen, setVideoOpen] = useState(false);

  const galleryItems = [
    {
      title: 'स्वास्तिक',
      category: 'वैदिक संस्कार',
      img: '/photos/acharya_white_dhoti.jpeg',
      desc: 'पवित्र स्वास्तिक एवं स्वस्तिवाचन वैदिक अनुष्ठान'
    },
    {
      title: 'महामृत्युंजय जाप',
      category: 'संजीवनी अनुष्ठान',
      img: '/photos/acharya_havan.jpeg',
      desc: 'अकाल मृत्यु निवारण एवं दीर्घायु हेतु सवा लाख जप'
    },
    {
      title: 'नवचंडी अनुष्ठान',
      category: 'शक्ति साधना',
      img: '/photos/acharya_garland_portrait.jpeg',
      desc: 'श्री दुर्गा सप्तशती के ९ संपूर्ण पाठ एवं महायज्ञ'
    },
    {
      title: 'शतचंडी यज्ञ',
      category: 'महायज्ञ',
      img: '/photos/acharya_hero_saffron.jpeg',
      desc: '१०० चंडी पाठ एवं शास्त्रोक्त वेदी हवन'
    },
    {
      title: 'दुर्गा अर्चन',
      category: 'भगवती आराधना',
      img: '/photos/acharya_red_portrait.jpeg',
      desc: 'सहस्रनामावलियों एवं कुमकुम अर्चन द्वारा मनोकामना पूर्ति'
    },
    {
      title: 'महारुद्र प्रयोग',
      category: 'शिव महायज्ञ',
      img: '/photos/acharya_yellow_kurta.jpeg',
      desc: '११ वैदिक ऋत्विकों द्वारा १२१ रुद्री पाठों का महायज्ञ'
    }
  ];

  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading">
        <span>✦</span>
        <h2>हमारी गैलरी</h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[#d85f0d] font-bold text-xs hover:underline cursor-pointer ml-auto"
          >
            View All <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Elastic accordion panels */}
      <div className="elastic-gallery" aria-label="पूजन एवं अनुष्ठान गैलरी">
        {galleryItems.map((item, index) => (
          <button
            type="button"
            className={`elastic-panel ${active === index ? 'is-active' : ''}`}
            key={item.title}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => {
              setActive(index);
              if (onSelectRitual) onSelectRitual(item.title);
            }}
            aria-label={`${item.title} देखें`}
          >
            <img src={item.img} alt={item.title} />
            <span className="elastic-shade" />
            <span className="elastic-copy">
              <small>{item.category}</small>
              <strong>{item.title}</strong>
              <em>
                {item.desc} <ChevronRight size={15} />
              </em>
            </span>
            <span className="elastic-collapsed">
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}

        {/* Video clip panel: plays the puja recording on demand */}
        <button
          type="button"
          className="elastic-panel"
          onClick={() => setVideoOpen(true)}
          aria-label="पूजन अनुष्ठान वीडियो देखें"
        >
          <img src="/photos/acharya_mahakal_temple.jpeg" alt="पूजन अनुष्ठान वीडियो" loading="lazy" />
          <span className="elastic-shade" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-white/90 text-[#C94F08] flex items-center justify-center shadow-lg animate-pulse-slow">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </span>
          </span>
          <span className="elastic-copy">
            <small>वीडियो दर्शन</small>
            <strong>पूजन अनुष्ठान वीडियो झलक</strong>
            <em>
              आचार्य जी द्वारा संपन्न वैदिक अनुष्ठान की चलचित्र झलक <ChevronRight size={15} />
            </em>
          </span>
          <span className="elastic-collapsed">07</span>
        </button>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FFF9EE] rounded-2xl overflow-hidden border-2 border-[#C89B3C] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#641E12] text-white hover:bg-[#C94F08] transition-colors"
              aria-label="वीडियो बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
            <video
              src="/videos/acharya_puja_clip.mp4"
              poster="/photos/acharya_mahakal_temple.jpeg"
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full max-h-[70vh] bg-black"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold font-serif text-[#4A170C]">पूजन अनुष्ठान वीडियो झलक</h3>
              <p className="text-xs font-serif text-[#2B2118]/85 mt-1">
                आचार्य शास्त्री अक्षय अवस्थी जी द्वारा उज्जैन में संपन्न वैदिक अनुष्ठान की चलचित्र झलक।
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
