import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { RitualAccents } from './components/RitualAccents';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SpecialAnushthanPage } from './pages/SpecialAnushthanPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';

// Data
import { SERVICES_DATA } from './data/services';
import { BLOGS_DATA } from './data/blogs';
import { Service, Blog } from './types';

export const App: React.FC = () => {
  // Simple client-side routing based on current URL path or state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedService, setSelectedService] = useState<Service>(SERVICES_DATA[0]);
  const [selectedBlog, setSelectedBlog] = useState<Blog>(BLOGS_DATA[0]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll-reveal cascade for every route
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPath]);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to resolve route components
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectService={(s) => {
            setSelectedService(s);
            navigate(`/services/${s.slug}`);
          }}
          onSelectBlog={(b) => {
            setSelectedBlog(b);
            navigate(`/blogs/${b.slug}`);
          }}
        />
      );
    }

    // 2. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 3. Services Listing
    if (currentPath === '/services') {
      return (
        <ServicesPage
          onSelectService={(s) => {
            setSelectedService(s);
            navigate(`/services/${s.slug}`);
          }}
          onBookService={(s) => {
            setSelectedService(s);
            navigate('/contact');
          }}
          onNavigate={navigate}
        />
      );
    }

    // 4. Individual Service Detail
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const matched = SERVICES_DATA.find((s) => s.slug === slug) || selectedService;
      return (
        <ServiceDetailPage
          service={matched}
          onBack={() => navigate('/services')}
          onBookNow={(s) => {
            setSelectedService(s);
            navigate('/contact');
          }}
          onSelectRelated={(s) => {
            setSelectedService(s);
            navigate(`/services/${s.slug}`);
          }}
        />
      );
    }

    // 5. Special Anushthan
    if (currentPath === '/special-anushthan') {
      return <SpecialAnushthanPage onNavigate={navigate} />;
    }

    // 6. Gallery
    if (currentPath === '/gallery') {
      return <GalleryPage />;
    }

    // 7. Blogs Listing
    if (currentPath === '/blogs') {
      return (
        <BlogsPage
          onSelectBlog={(b) => {
            setSelectedBlog(b);
            navigate(`/blogs/${b.slug}`);
          }}
          onNavigate={navigate}
        />
      );
    }

    // 8. Individual Blog Detail
    if (currentPath.startsWith('/blogs/')) {
      const slug = currentPath.replace('/blogs/', '');
      const matched = BLOGS_DATA.find((b) => b.slug === slug) || selectedBlog;
      return (
        <BlogDetailPage
          blog={matched}
          onBack={() => navigate('/blogs')}
          onSelectRelated={(b) => {
            setSelectedBlog(b);
            navigate(`/blogs/${b.slug}`);
          }}
          onContactClick={() => navigate('/contact')}
        />
      );
    }

    // 9. Contact / Enquiry
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 10. Privacy Policy
    if (currentPath === '/privacy-policy') {
      return <LegalPages type="privacy" />;
    }

    // 11. Terms & Conditions
    if (currentPath === '/terms-and-conditions') {
      return <LegalPages type="terms" />;
    }

    // Fallback to Home
    return (
      <HomePage
        onNavigate={navigate}
        onSelectService={(s) => {
          setSelectedService(s);
          navigate(`/services/${s.slug}`);
        }}
        onSelectBlog={(b) => {
          setSelectedBlog(b);
          navigate(`/blogs/${b.slug}`);
        }}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased selection:bg-gold-light selection:text-maroon">
      {/* Sticky Responsive Header */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Body */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Floating Animated Diya & Petal Orbits from website-ui-design */}
      <RitualAccents />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar currentPath={currentPath} onNavigate={navigate} />

      {/* Dark Heritage Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
};
