import React from 'react';
import { Service } from '../types';
import { VedicIcon } from './VedicIcon';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  onBookNow: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, onBookNow }) => {
  return (
    <div className="bg-cream-light rounded-xl border border-gold/40 p-5 shadow-sm hover:shadow-gold-md hover:border-gold transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between relative group">
      
      {/* Optional Badge */}
      {service.badge && (
        <span className="absolute top-3 right-3 bg-saffron/10 text-saffron-dark border border-saffron/30 text-[11px] font-bold px-2 py-0.5 rounded-full font-serif">
          {service.badge}
        </span>
      )}

      <div>
        {/* Traditional Icon */}
        <div className="w-12 h-12 rounded-lg bg-cream border border-gold/50 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-colors mb-4">
          <VedicIcon type={service.iconType} className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-serif text-maroon group-hover:text-saffron-dark transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-charcoal/80 font-serif leading-relaxed mt-2 line-clamp-3">
          {service.shortDesc}
        </p>
      </div>

      {/* Actions */}
      <div className="pt-4 mt-4 border-t border-gold/20 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(service)}
          className="text-xs font-serif font-bold text-maroon hover:text-saffron flex items-center gap-1 transition-colors"
        >
          <span>विस्तृत विवरण</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onBookNow(service)}
          className="px-3 py-1.5 rounded-md bg-saffron hover:bg-saffron-dark text-white text-xs font-semibold shadow-sm transition-all"
        >
          Contact for Booking
        </button>
      </div>
    </div>
  );
};
