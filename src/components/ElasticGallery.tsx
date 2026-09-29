import React, { useState } from 'react';
import { ChevronRight, Play, X } from 'lucide-react';
import { useCMS } from '../lib/cmsStore';

interface ElasticGalleryProps {
  onSelectRitual?: (ritualName: string) => void;
  onViewAll?: () => void;
}

export const ElasticGallery: React.FC<ElasticGalleryProps> = ({ onSelectRitual, onViewAll }) => {
  const cms = useCMS();
  const [active, setActive] = useState(0);
  const [videoModal, setVideoModal] = useState<{ url: string; poster: string; title: string; caption: string } | null>(null);

  // Take up to 6 gallery items from CMS data
  const galleryItems = cms.gallery.slice(0, 6);
  // Find a video item if present
  const videoItem = cms.gallery.find((g) => g.videoUrl || g.mediaType === 'video');

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
            key={item.id}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => {
              setActive(index);
              if (item.videoUrl) {
                setVideoModal({
                  url: item.videoUrl,
                  poster: item.imageUrl,
                  title: item.title,
                  caption: item.caption
                });
              } else if (onSelectRitual) {
                onSelectRitual(item.title);
              }
            }}
            aria-label={`${item.title} देखें`}
          >
            <img src={item.imageUrl} alt={item.title} loading="lazy" />
            <span className="elastic-shade" />
            {item.videoUrl && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/90 text-[#C94F08] flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
              </span>
            )}
            <span className="elastic-copy">
              <small>{item.category}</small>
              <strong>{item.title}</strong>
              <em>
                {item.caption} <ChevronRight size={15} />
              </em>
            </span>
            <span className="elastic-collapsed">
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}

        {/* Video clip panel if video exists */}
        {videoItem && (
          <button
            type="button"
            className="elastic-panel"
            onClick={() => setVideoModal({
              url: videoItem.videoUrl || '/videos/acharya_puja_clip.mp4',
              poster: videoItem.imageUrl,
              title: videoItem.title,
              caption: videoItem.caption
            })}
            aria-label="पूजन अनुष्ठान वीडियो देखें"
          >
            <img src={videoItem.imageUrl} alt={videoItem.title} loading="lazy" />
            <span className="elastic-shade" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-white/90 text-[#C94F08] flex items-center justify-center shadow-lg animate-pulse-slow">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </span>
            </span>
            <span className="elastic-copy">
              <small>{videoItem.category}</small>
              <strong>{videoItem.title}</strong>
              <em>
                {videoItem.caption} <ChevronRight size={15} />
              </em>
            </span>
            <span className="elastic-collapsed">🎥</span>
          </button>
        )}
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FFF9EE] rounded-2xl overflow-hidden border-2 border-[#C89B3C] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModal(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#641E12] text-white hover:bg-[#C94F08] transition-colors"
              aria-label="वीडियो बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
            <video
              src={videoModal.url}
              poster={videoModal.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full max-h-[70vh] bg-black"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold font-serif text-[#4A170C]">{videoModal.title}</h3>
              <p className="text-xs font-serif text-[#2B2118]/85 mt-1">
                {videoModal.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
