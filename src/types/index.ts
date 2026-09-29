export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  significance: string;
  methodology: string;
  materials: string[];
  benefits: string[];
  suitableTime: string;
  iconType: string;
  badge?: string;
  featured?: boolean;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  author: string;
  featuredImage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  caption: string;
  location?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface ContactFormData {
  fullName: string;
  mobileNumber: string;
  dateOfBirth?: string;
  birthTime?: string;
  serviceRequired: string;
  message: string;
  isCustomPuja: boolean;
  isBookingSystem: boolean;
}

export interface SiteSettings {
  announcementTicker: string;
  isOnlinePujaActive: boolean;
  adminPasswordHash?: string;
}

export interface AcharyaProfileType {
  name: string;
  englishName: string;
  title: string;
  tagline: string;
  quote: string;
  education: Array<{ degree: string; subject: string; institute: string }>;
  experienceYears: string;
  experienceSummary: string;
  expertise: string;
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    whatsappNumber: string;
    email: string;
    city: string;
    state: string;
    postalLocation: string;
    homeAddress: string;
    karmakshetra: string;
    landmark: string;
    timings: string;
  };
  photos: {
    hero: string;
    havan: string;
    temple: string;
    portraitRed: string;
    kurtaYellow: string;
    dhotiWhite: string;
    garland: string;
    visitingCard: string;
    serviceCard: string;
  };
}

export interface CMSData {
  gallery: GalleryItem[];
  categories: GalleryCategory[];
  blogs: Blog[];
  services: Service[];
  profile: AcharyaProfileType;
  settings: SiteSettings;
  lastUpdated: string;
}
