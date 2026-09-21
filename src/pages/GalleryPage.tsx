import React from 'react';
import { Gallery } from '../components/Gallery';

export const GalleryPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen py-8">
      {/* Reusable full gallery component with filters and lightbox */}
      <Gallery showFilters={true} />
    </div>
  );
};
