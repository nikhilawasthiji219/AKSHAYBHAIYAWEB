import React from 'react';
import { Hero } from '../components/Hero';
import { OnlinePujaTicker } from '../components/OnlinePujaTicker';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesGrid } from '../components/ServicesGrid';
import { ElasticGallery } from '../components/ElasticGallery';
import { DarkRibbon } from '../components/DarkRibbon';
import { FlipBlogCards } from '../components/FlipBlogCards';
import { ContactSection } from '../components/ContactSection';
import { Service, Blog } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectService: (service: Service) => void;
  onSelectBlog: (blog: Blog) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectService,
  onSelectBlog
}) => {
  return (
    <div className="bg-[#FFF8E8]">
      
      {/* 1. Hero Section: Exact panoramic riverside temple scene with Acharya Ji & Jai Mahakal flag */}
      <Hero onNavigate={onNavigate} />

      {/* Online Puja Announcement Ticker matching reference video */}
      <OnlinePujaTicker onNavigate={onNavigate} />

      {/* 2. 3-Card Trust & Info Strip */}
      <div className="reveal">
        <TrustStrip />
      </div>

      {/* 3. 14 Services Grid (7x2) + Special Anushthan Card on the right */}
      {/* No outer .reveal wrapper — ServicesGrid contains per-card .reveal elements
          inside a .stagger container, so each card animates independently. */}
      <ServicesGrid
        onSelectService={(s) => {
          onSelectService(s);
          onNavigate(`/services/${s.slug}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookService={(s) => {
          onSelectService(s);
          onNavigate('/contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Elastic Accordion Gallery from website-ui-design with real ritual photos & interactive expanding panels */}
      <ElasticGallery
        onSelectRitual={() => {
          onNavigate('/gallery');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewAll={() => {
          onNavigate('/gallery');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. Dark Ribbon: Ramghat Ujjain with 'Contact Now' */}
      <DarkRibbon
        onContactClick={() => {
          onNavigate('/contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. 3D Interactive Flipping Blog Cards: हमारे लेख */}
      {/* No outer .reveal — each article-card has .reveal individually inside .stagger */}
      <FlipBlogCards
        onSelectBlog={(b) => {
          onSelectBlog(b);
          onNavigate(`/blogs/${b.slug}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onContactClick={() => {
          onNavigate('/contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. Contact / Enquiry Section */}
      <ContactSection />

    </div>
  );
};
