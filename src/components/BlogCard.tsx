import React from 'react';
import { Blog } from '../types';
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  onSelect: (blog: Blog) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onSelect }) => {
  return (
    <div className="bg-cream-light rounded-xl border border-gold/40 overflow-hidden shadow-sm hover:shadow-gold-md hover:border-gold transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
      
      <div>
        {/* Thumbnail */}
        <div className="h-48 w-full overflow-hidden bg-stone-100 relative">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-maroon/90 text-gold-pale text-[11px] font-serif font-bold px-2.5 py-0.5 rounded border border-gold/40">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-3 text-[11px] text-charcoal/70 font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-saffron" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-saffron" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold font-serif text-maroon group-hover:text-saffron-dark transition-colors line-clamp-2 leading-snug">
            {blog.title}
          </h3>

          <p className="text-xs font-serif text-charcoal/80 leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onSelect(blog)}
          className="w-full py-2 px-3 rounded-md bg-cream hover:bg-saffron hover:text-white text-maroon border border-gold/50 text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>संपूर्ण लेख पढ़ें (Read More)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
