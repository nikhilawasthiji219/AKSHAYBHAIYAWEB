import React from 'react';
import { Blog } from '../types';
import { BLOGS_DATA } from '../data/blogs';
import { ACHARYA_PROFILE } from '../data/acharya';
import { ArrowLeft, Calendar, Clock, User, CheckCircle2, Share2, Sparkles } from 'lucide-react';

interface BlogDetailPageProps {
  blog: Blog;
  onBack: () => void;
  onSelectRelated: (blog: Blog) => void;
  onContactClick: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  blog,
  onBack,
  onSelectRelated,
  onContactClick
}) => {
  const relatedBlogs = BLOGS_DATA.filter((b) => b.id !== blog.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('लेख का लिंक कॉपी कर लिया गया है!');
    }
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-serif font-bold text-maroon hover:text-saffron transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>समस्त लेखों पर लौटें (Back to All Blogs)</span>
        </button>

        {/* Article Container */}
        <article className="bg-cream-light rounded-2xl border-2 border-gold/40 p-6 sm:p-10 shadow-gold-md space-y-6">
          
          {/* Category & Meta */}
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded bg-saffron/10 text-saffron-dark text-xs font-serif font-bold border border-saffron/30">
              {blog.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-maroon leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/70 font-sans border-y border-gold/30 py-2.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-saffron" />
                {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-saffron" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-saffron" />
                {blog.readTime}
              </span>
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-1 text-xs text-saffron-dark font-semibold hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>शेयर करें</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden border border-gold/40 max-h-96 w-full shadow-inner">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Lead excerpt */}
          <p className="text-base sm:text-lg font-serif text-maroon font-medium leading-relaxed bg-cream p-4 rounded-xl border-l-4 border-gold italic">
            "{blog.excerpt}"
          </p>

          {/* Paragraphs */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-charcoal leading-relaxed">
            {blog.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-cream p-6 rounded-xl border-2 border-gold/40 space-y-3">
            <h3 className="font-serif font-bold text-maroon text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              मुख्य शास्त्रोक्त बिंदु (Key Takeaways)
            </h3>
            <ul className="space-y-2">
              {blog.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-serif text-charcoal/90">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Author Bio footer */}
          <div className="bg-cream-soft p-5 rounded-xl border border-gold/30 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
              <img
                src={ACHARYA_PROFILE.photos.hero}
                alt={ACHARYA_PROFILE.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-serif font-bold text-maroon text-sm">
                लेखक: {ACHARYA_PROFILE.name}
              </h4>
              <p className="text-xs font-serif text-saffron-dark">
                {ACHARYA_PROFILE.title} (उज्जैन)
              </p>
              <p className="text-xs text-charcoal/80 font-sans">
                शास्त्रोक्त वैदिक विधि-विधान एवं महाकालेश्वर तीर्थ में समस्त अनुष्ठान मार्गदर्शक।
              </p>
            </div>
            <div className="sm:ml-auto">
              <button
                onClick={onContactClick}
                className="px-4 py-2 bg-saffron hover:bg-saffron-dark text-white text-xs font-serif font-bold rounded-lg shadow-sm"
              >
                पूजन परामर्श
              </button>
            </div>
          </div>

        </article>

        {/* Related Articles */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-maroon">
            अन्य संबंधित वैदिक लेख
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedBlogs.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="bg-cream-light p-4 rounded-xl border border-gold/40 hover:border-saffron hover:shadow-sm cursor-pointer transition-all space-y-1.5"
              >
                <span className="text-[10px] font-serif font-bold text-saffron-dark px-2 py-0.5 rounded bg-cream border border-gold/30">
                  {rel.category}
                </span>
                <h4 className="font-serif font-bold text-sm text-maroon line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs font-serif text-charcoal/70 line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
