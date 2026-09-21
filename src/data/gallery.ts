import { GalleryItem } from '../types';

export const GALLERY_CATEGORIES = [
  { id: "all", label: "सभी छायाचित्र" },
  { id: "rudrabhishek", label: "रुद्राभिषेक एवं शिव पूजन" },
  { id: "havan-yagya", label: "हवन एवं महायज्ञ" },
  { id: "mahakaleshwar-ujjain", label: "श्री महाकालेश्वर एवं उज्जैन" },
  { id: "acharya-profile", label: "आचार्य स्वरूप" },
  { id: "vedic-sanskars", label: "वैदिक संस्कार व पूजन" }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    title: "आचार्य श्री अक्षय अवस्थी जी — भगवा परिधान",
    category: "आचार्य स्वरूप",
    categorySlug: "acharya-profile",
    imageUrl: "/photos/acharya_hero_saffron.jpeg",
    caption: "वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य शास्त्री अक्षय अवस्थी जी (उज्जैन)",
    location: "उज्जैन, मध्य प्रदेश"
  },
  {
    id: "gal-2",
    title: "पवित्र वैदिक यज्ञ एवं हवनाग्नि अर्चन",
    category: "हवन एवं महायज्ञ",
    categorySlug: "havan-yagya",
    imageUrl: "/photos/acharya_havan.jpeg",
    caption: "यज्ञशाला में वैदिक मंत्रोच्चार के मध्य आहुतियां समर्पित करते हुए आचार्य जी",
    location: "उज्जैन तीर्थ क्षेत्र"
  },
  {
    id: "gal-3",
    title: "श्री महाकालेश्वर ज्योतिर्लिंग मंदिर प्रांगण",
    category: "श्री महाकालेश्वर एवं उज्जैन",
    categorySlug: "mahakaleshwar-ujjain",
    imageUrl: "/photos/acharya_mahakal_temple.jpeg",
    caption: "श्री महाकालेश्वर मंदिर शिखर के सम्मुख पावन दर्शन एवं वंदना",
    location: "श्री महाकालेश्वर मंदिर, उज्जैन"
  },
  {
    id: "gal-4",
    title: "आचार्य जी — पारम्परिक रेशमी पीताम्बर परिधान",
    category: "आचार्य स्वरूप",
    categorySlug: "acharya-profile",
    imageUrl: "/photos/acharya_yellow_kurta.jpeg",
    caption: "धार्मिक अनुष्ठानों के शास्त्रीय संकल्प हेतु सज्ज आचार्य शास्त्री अक्षय अवस्थी जी",
    location: "उज्जैन"
  },
  {
    id: "gal-5",
    title: "यज्ञोपवीत एवं पारम्परिक श्वेत परिधान",
    category: "वैदिक संस्कार व पूजन",
    categorySlug: "vedic-sanskars",
    imageUrl: "/photos/acharya_white_dhoti.jpeg",
    caption: "शास्त्रोक्त वैदिक संस्कार एवं पूजा विधान की तैयारी के क्षण",
    location: "उज्जैन"
  },
  {
    id: "gal-6",
    title: "माला अर्पण एवं पावन अनुष्ठान स्मृति",
    category: "वैदिक संस्कार व पूजन",
    categorySlug: "vedic-sanskars",
    imageUrl: "/photos/acharya_garland_portrait.jpeg",
    caption: "पुष्प माला एवं उत्तरीय धारण कर अनुष्ठान संपन्न करने के उपरांत",
    location: "उज्जैन"
  },
  {
    id: "gal-7",
    title: "आचार्य जी — त्रिपुंड एवं रुद्राक्ष धारण",
    category: "रुद्राभिषेक एवं शिव पूजन",
    categorySlug: "rudrabhishek",
    imageUrl: "/photos/acharya_red_portrait.jpeg",
    caption: "रुद्राक्ष माला एवं भस्म त्रिपुंड से सुशोभित शास्त्री जी",
    location: "उज्जैन"
  },
  {
    id: "gal-8",
    title: "अधिकृत संपर्क विवरण एवं महाकाल कृपा पत्र",
    category: "श्री महाकालेश्वर एवं उज्जैन",
    categorySlug: "mahakaleshwar-ujjain",
    imageUrl: "/photos/visiting_card.jpeg",
    caption: "श्री महाकालेश्वर ज्योतिर्लिंग, अवंतिका क्षेत्र, रामघाट उज्जैन कर्मक्षेत्र",
    location: "रामघाट, उज्जैन"
  }
];
