import React from 'react';
import { useCMS } from '../lib/cmsStore';
import { BlogCard } from '../components/BlogCard';
import { Blog } from '../types';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/languageContext';

interface BlogsPageProps {
  onSelectBlog: (blog: Blog) => void;
  onNavigate: (path: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onSelectBlog, onNavigate }) => {
  const cms = useCMS();
  const { t } = useLanguage();
  const blogs = cms.blogs;

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
<div className="inline-flex items-center gap-2 text-saffron text-sm font-semibold tracking-wider font-serif">
            <Sparkles className="w-4 h-4" />
            <span>{t('शास्त्र सम्मत ज्ञान', 'Scriptural Knowledge')}</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-maroon">
            {t('वैदिक ज्ञान एवं धार्मिक जानकारी', 'Vedic Knowledge & Religious Information')}
          </h1>

          <p className="text-sm sm:text-lg font-serif text-charcoal/80 leading-relaxed">
            {t('उज्जैन महाकालेश्वर तीर्थ, रुद्राभिषेक, महामृत्युंजय जाप एवं वैदिक अनुष्ठानों का शास्त्रोक्त महत्व', 'Ujjain Mahakaleshwar Dham, Rudrabhishek, Mahamrityunjay Jaap and Vedic rituals significance')}
          </p>
        </div>

        {/* Dynamic Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onSelect={(b) => {
                onSelectBlog(b);
                onNavigate(`/blogs/${b.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>


      </div>
    </div>
  );
};
