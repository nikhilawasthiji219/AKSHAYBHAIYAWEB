import React from 'react';
import { Users, Award } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#FFF8E8] py-8 sm:py-10 border-b border-[#C89B3C]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: 15+ Years of Experience */}
          <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center group hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-[#FFF8E8] border-2 border-[#D4AF37] flex items-center justify-center text-[#B24505] mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <span className="text-3xl font-serif font-bold text-[#D9610B]">ॐ</span>
            </div>
            <h3 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#C89B3C] mb-2 tracking-tight">
              15+
            </h3>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#3B1D0B] uppercase mb-1">
              YEARS OF AUTHENTIC EXPERIENCE
            </p>
            <p className="text-xs text-[#7D2918] font-serif">
              वैदिक कर्मकांड एवं धार्मिक अनुष्ठान का अनुभव
            </p>
          </div>

          {/* Card 2: 10,000+ Satisfied Yajmans */}
          <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center group hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-[#FFF8E8] border-2 border-[#D4AF37] flex items-center justify-center text-[#C89B3C] mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Users className="w-8 h-8 text-[#D9610B]" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#C89B3C] mb-2 tracking-tight">
              10,000+
            </h3>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#3B1D0B] uppercase mb-1">
              SATISFIED YAJMANS
            </p>
            <p className="text-xs text-[#7D2918] font-serif">
              देश-विदेश से संतुष्ट यजमान एवं संपन्न संकल्प
            </p>
          </div>

          {/* Card 3: Government Gold Medalist Acharya / Certified */}
          <div className="bg-white rounded-2xl border border-[#C89B3C]/30 p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center group hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-[#FFF8E8] border-2 border-[#D4AF37] flex items-center justify-center text-[#C89B3C] mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Award className="w-8 h-8 text-[#D9610B]" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#C89B3C] mb-2 tracking-tight">
              MP
            </h3>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#3B1D0B] uppercase mb-1">
              GOVERNMENT GOLD MEDALIST ACHARYA
            </p>
            <p className="text-xs text-[#7D2918] font-serif">
              शास्त्री (व्याकरण) • आचार्य (संस्कृत) उपाधि
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
