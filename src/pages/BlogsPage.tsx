import React from 'react';
import { BLOGS_DATA } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { Blog } from '../types';
import { Sparkles } from 'lucide-react';

interface BlogsPageProps {
  onSelectBlog: (blog: Blog) => void;
  onNavigate: (path: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onSelectBlog, onNavigate }) => {
  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-saffron text-sm font-semibold tracking-wider font-serif">
            <Sparkles className="w-4 h-4" />
            <span>॥ शास्त्र सम्मत ज्ञान ॥</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-maroon">
            वैदिक ज्ञान एवं धार्मिक जानकारी
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

          <p className="text-base sm:text-lg font-serif text-charcoal/80 leading-relaxed">
            उज्जैन महाकालेश्वर तीर्थ, रुद्राभिषेक, महामृत्युंजय जाप एवं वैदिक अनुष्ठानों का शास्त्रोक्त महत्व
          </p>
        </div>

        {/* 5 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS_DATA.map((blog) => (
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
