import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { RitualAccents } from './components/RitualAccents';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { BackgroundMusic } from './components/audio/BackgroundMusic';

// Pages — lazy-split to keep initial bundle small (vendor-motion split in vite.config)
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const SpecialAnushthanPage = lazy(() => import('./pages/SpecialAnushthanPage').then((m) => ({ default: m.SpecialAnushthanPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then((m) => ({ default: m.BlogsPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrototypesPage = lazy(() => import('./pages/PrototypesPage').then((m) => ({ default: m.PrototypesPage })));
const LegalPages = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.LegalPages })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));

// Data & Reactive CMS Hook
import { useCMS } from './lib/cmsStore';
import { Service, Blog } from './types';

export const App: React.FC = () => {
  const cms = useCMS();

  // Simple client-side routing based on current URL path or state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedService, setSelectedService] = useState<Service>(() => cms.services[0]);
  const [selectedBlog, setSelectedBlog] = useState<Blog>(() => cms.blogs[0]);
  const [showLoader, setShowLoader] = useState(true);
  const handleLoaderFinish = useCallback(() => setShowLoader(false), []);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll-reveal cascade for every route.
  // Routes are lazy-mounted, so a MutationObserver adopts .reveal nodes as they
  // appear; IO is the primary trigger, with an immediate first pass plus a
  // rAF-throttled scroll/resize sweep so content can never stay hidden in
  // browsers where IntersectionObserver callbacks never fire.
  useEffect(() => {
    const pending = new Set<Element>();
    const hasIO = 'IntersectionObserver' in window;
    let raf = 0;

    const observer = hasIO
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) show(entry.target);
            });
          },
          { threshold: 0, rootMargin: '0px 0px -60px 0px' }
        )
      : null;

    function show(el: Element) {
      el.classList.add('is-visible');
      pending.delete(el);
      observer?.unobserve(el);
    }

    const sweep = () => {
      const vh = window.innerHeight;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh - 40 && rect.bottom > 0) show(el);
      });
    };

    const queueSweep = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sweep();
      });
    };

    const adopt = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        if (pending.has(el)) return;
        if (!observer) {
          el.classList.add('is-visible');
          return;
        }
        pending.add(el);
        observer.observe(el);
      });
    };

    adopt();
    sweep();

    const mo = new MutationObserver((mutations) => {
      let dirty = false;
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (dirty || node.nodeType !== 1) return;
          const el = node as Element;
          if (el.matches('.reveal:not(.is-visible)') || el.querySelector('.reveal:not(.is-visible)')) {
            dirty = true;
          }
        });
      });
      if (dirty) {
        adopt();
        queueSweep();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', queueSweep, { passive: true });
    window.addEventListener('resize', queueSweep);

    return () => {
      mo.disconnect();
      observer?.disconnect();
      window.removeEventListener('scroll', queueSweep);
      window.removeEventListener('resize', queueSweep);
      if (raf) cancelAnimationFrame(raf);
    };
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
      const matched = cms.services.find((s) => s.slug === slug) || selectedService || cms.services[0];
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
      const matched = cms.blogs.find((b) => b.slug === slug) || selectedBlog || cms.blogs[0];
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

    // 12. Prototypes preview (dev/QA only — side-by-side A/B/C/D)
    if (currentPath === '/prototypes') {
      return <PrototypesPage onNavigate={navigate} />;
    }

    // 13. Admin CMS Dashboard
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
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
    <div className="min-h-screen flex flex-col overflow-x-clip bg-cream text-charcoal font-sans antialiased selection:bg-gold-light selection:text-maroon">
      {/* Sacred loading screen — first visit only */}
      {showLoader && <Loader onFinish={handleLoaderFinish} />}

      {/* Sticky Responsive Header */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Body with mobile bottom safe padding */}
      <main className="flex-grow overflow-x-clip pb-20 md:pb-0">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-16 text-center font-serif text-maroon">
              ॥ श्री महाकालेश्वराय नमः ॥ — लोड हो रहा है…
            </div>
          }
        >
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Floating Animated Diya & Petal Orbits from website-ui-design */}
      {currentPath !== '/admin' && <RitualAccents />}

      {/* Floating WhatsApp Action Button */}
      {currentPath !== '/admin' && <WhatsAppButton />}

      {/* Mobile Bottom Navigation Bar */}
      {currentPath !== '/admin' && <MobileBottomBar currentPath={currentPath} onNavigate={navigate} />}

      {/* Background devotional music — auto-starts on first interaction */}
      {currentPath !== '/admin' && <BackgroundMusic />}

      {/* Dark Heritage Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

