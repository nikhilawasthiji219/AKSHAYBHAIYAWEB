import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useCMS } from '../lib/cmsStore';
import { Blog } from '../types';

interface FlipBlogCardsProps {
  onSelectBlog: (blog: Blog) => void;
  onContactClick?: () => void;
}

export const FlipBlogCards: React.FC<FlipBlogCardsProps> = ({ onSelectBlog }) => {
  const cms = useCMS();
  const [active, setActive] = useState(0);

  // Read up to 5 blogs dynamically from CMS store
  const articles = cms.blogs.slice(0, 5);

  return (
    <section className="section articles" id="blogs">
      <div className="section-heading">
        <span>✦</span>
        <h2>{t('हमारे लेख', 'Our Articles')}</h2>
        <span>✦</span>
      </div>

      <div className="stagger article-grid article-flip-grid">
        {articles.map((article, i) => (
          <button
            type="button"
            className={`reveal article-card ${active === i ? 'is-active' : ''}`}
            key={article.id}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => {
              setActive(i);
              onSelectBlog(article);
            }}
          >
            {/* Background Thumbnail Image */}
            <div
              className="article-image"
              style={{ backgroundImage: `url(${article.featuredImage || '/photos/acharya_havan.jpeg'})` }}
            />

            {/* Front Face */}
            <div className="article-face article-front">
              <small>{article.category}</small>
              <h3>{article.title}</h3>
              <span>
                Read More <ChevronRight size={14} />
              </span>
            </div>

            {/* Back Face (Interactive 3D Flip) */}
            <div className="article-face article-back">
              <span className="article-number">{String(i + 1).padStart(2, '0')}</span>
              <small>{article.category}</small>
              <h3>{article.title}</h3>
              <p className="line-clamp-3">{article.excerpt}</p>
              <span
                className="inline-flex items-center gap-1 font-bold text-xs text-white hover:underline mt-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBlog(article);
                }}
              >
                {t('संपूर्ण लेख पढ़ें', 'Read Full Article')} <ChevronRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
