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
      <div className="reveal">
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
      </div>

      {/* 4. Elastic Accordion Gallery from website-ui-design with real ritual photos & interactive expanding panels */}
      <div className="reveal">
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
      </div>

      {/* 5. Dark Ribbon: Ramghat Ujjain with 'Contact Now' */}
      <div className="reveal">
        <DarkRibbon
          onContactClick={() => {
            onNavigate('/contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* 6. 3D Interactive Flipping Blog Cards: हमारे लेख */}
      <div className="reveal">
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
      </div>

      {/* 7. Contact / Enquiry Section */}
      <div className="reveal">
        <ContactSection />
      </div>

    </div>
  );
};
