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
