import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useCMS } from '../lib/cmsStore';
import { useLanguage } from '../lib/languageContext';
import { Blog } from '../types';

interface FlipBlogCardsProps {
  onSelectBlog: (blog: Blog) => void;
  onContactClick?: () => void;
}

/**
 * A single article card that flips to its back face on hover/focus and flips
 * back when the pointer or focus leaves. Each card owns its own `isActive`
 * state so hovering one card never affects its siblings and the flip always
 * resets when the cursor leaves — fixing cards that appeared to "disappear"
 * (front face hidden) as the cursor swept across the row.
 */
const ArticleCard: React.FC<{
  article: Blog;
  index: number;
  t: ReturnType<typeof useLanguage>['t'];
  onSelectBlog: (blog: Blog) => void;
}> = ({ article, index, t, onSelectBlog }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      className={`reveal article-card ${isActive ? 'is-active' : ''}`}
      key={article.id}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={() => {
        onSelectBlog(article);
      }}
    >
      {/* Background Thumbnail Image */}
      <div
        className="article-image"
        style={{
          backgroundImage: `url(${article.featuredImage || '/photos/acharya_havan.jpeg'})`,
        }}
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
        <span className="article-number">{String(index + 1).padStart(2, '0')}</span>
        <small>{article.category}</small>
        <h3>{article.title}</h3>
        <p className="line-clamp-3">{article.excerpt}</p>
        <span className="inline-flex items-center gap-1 font-bold text-xs text-white mt-1">
          {t('संपूर्ण लेख पढ़ें', 'Read Full Article')} <ChevronRight size={14} />
        </span>
      </div>
    </button>
  );
};

export const FlipBlogCards: React.FC<FlipBlogCardsProps> = ({ onSelectBlog }) => {
  const cms = useCMS();
  const { t } = useLanguage();

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
          <ArticleCard key={article.id} article={article} index={i} t={t} onSelectBlog={onSelectBlog} />
        ))}
      </div>
    </section>
  );
};
