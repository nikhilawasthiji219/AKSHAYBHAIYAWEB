import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BLOGS_DATA } from '../data/blogs';
import { Blog } from '../types';

interface FlipBlogCardsProps {
  onSelectBlog: (blog: Blog) => void;
  onContactClick?: () => void;
}

export const FlipBlogCards: React.FC<FlipBlogCardsProps> = ({ onSelectBlog }) => {
  const [active, setActive] = useState(0);

  const articles = [
    {
      ...BLOGS_DATA[0],
      category: 'शिव आराधना',
      title: 'उज्जैन में रुद्राभिषेक का धार्मिक महत्व',
      excerpt: 'श्री महाकालेश्वर दक्षिणमुखी ज्योतिर्लिंग होने से मृत्युभय का नाश करते हैं। नमक-चमक रुद्राष्टाध्यायी से अभिषेक अति पुण्यकारी है।'
    },
    {
      ...BLOGS_DATA[1],
      category: 'वैदिक ज्ञान',
      title: 'महामृत्युंजय जाप का महत्व',
      excerpt: 'आयु, आरोग्य और संकट निवारण हेतु महर्षि वशिष्ठ प्रोक्त संजीवनी महामंत्र जप एवं दशांश हवन का शास्त्रोक्त विधान।'
    },
    {
      ...BLOGS_DATA[2],
      category: 'शक्ति उपासना',
      title: 'नवचंडी अनुष्ठान क्यों कराया जाता है?',
      excerpt: 'दुर्गा सप्तशती के ९ संपूर्ण संपुटित पाठों से समस्त शत्रु बाधा, कार्य बाधा व पितृ दोष शांत होते हैं।'
    },
    {
      ...BLOGS_DATA[3],
      category: 'गृह संस्कार',
      title: 'गृह शांति एवं वास्तु शांति का महत्व',
      excerpt: 'वास्तु पुरुष, दिक्पाल एवं नवग्रह आहुति द्वारा गृह में निरंतर सुख, धन-धान्य और मानसिक शांति का स्थायी वास होता है।'
    },
    {
      ...BLOGS_DATA[4],
      category: 'वैदिक संस्कार',
      title: 'प्राण प्रतिष्ठा की वैदिक विधि एवं महत्व',
      excerpt: 'जलाधिवास, धान्याधिवास और नेत्रोन्मीलन द्वारा मूर्ति में चैतन्य देवत्व का संचार करने वाली सर्वोच्च वैदिक विधि।'
    }
  ];

  return (
    <section className="section articles" id="blogs">
      <div className="section-heading">
        <span>✦</span>
        <h2>हमारे लेख</h2>
        <span>✦</span>
      </div>

      <div className="stagger article-grid article-flip-grid">
        {articles.map((article, i) => (
          <button
            type="button"
            className={`reveal article-card ${active === i ? 'is-active' : ''}`}
            key={article.title}
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
              style={{ backgroundImage: `url(${article.featuredImage})` }}
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
              <p>{article.excerpt}</p>
              <span
                className="inline-flex items-center gap-1 font-bold text-xs text-white hover:underline mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBlog(article);
                }}
              >
                संपूर्ण लेख पढ़ें <ChevronRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
