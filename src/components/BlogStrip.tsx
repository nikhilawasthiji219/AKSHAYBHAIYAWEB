import React from 'react';
import { BLOGS_DATA } from '../data/blogs';
import { Blog } from '../types';

interface BlogStripProps {
  onSelectBlog: (blog: Blog) => void;
}

export const BlogStrip: React.FC<BlogStripProps> = ({ onSelectBlog }) => {
  // Matching the 5 blog cards in bottom-left of mockup
  const blogs = [
    { ...BLOGS_DATA[0], title: 'उज्जैन में रुद्राभिषेक का धार्मिक महत्व', img: '/images/blog_1.jpg' },
    { ...BLOGS_DATA[1], title: 'महामृत्युंजय जाप का महत्व', img: '/images/blog_2.jpg' },
    { ...BLOGS_DATA[2], title: 'नवचंडी अनुष्ठान क्यों कराया जाता है?', img: '/images/blog_3.jpg' },
    { ...BLOGS_DATA[3], title: 'गृह शांति एवं वास्तु शांति का महत्व', img: '/images/blog_4.jpg' },
    { ...BLOGS_DATA[4], title: 'प्राण प्रतिष्ठा की वैदिक विधि एवं महत्व', img: '/images/blog_5.jpg' },
  ];

  return (
    <section className="py-10 bg-[#FFF8E8] relative border-b border-[#C89B3C]/20" id="blogs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading matching exact mockup */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[#C94F08] text-base">☙</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#4A170C]">
              {t('हमारे ब्लॉग', 'Our Blog')}
            </h2>
          </div>
          <p className="text-xs font-serif text-[#641E12]/80">
            {t('धार्मिक ज्ञान और वैदिक महत्व पर आधारित लेख', 'Religious knowledge and Vedic significance based articles')}
          </p>
        </div>

        {/* 5 Cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {blogs.map((b, idx) => (
            <div
              key={idx}
              onClick={() => onSelectBlog(b)}
              className="bg-[#FFFDF7] rounded-lg border border-[#C89B3C]/35 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="h-28 w-full overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5">
                  <h4 className="font-serif font-bold text-xs text-[#3B1D0B] line-clamp-2 leading-snug group-hover:text-[#C94F08]">
                    {b.title}
                  </h4>
                </div>
              </div>
              <div className="px-2.5 pb-2.5">
                <span className="text-[10px] font-serif font-bold text-[#C94F08] hover:underline">
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
