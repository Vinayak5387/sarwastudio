'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function StudioHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/studio/hero-bg.jpg"
          alt="Sarwa Studio workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h1 
          className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Our Creative Studio
        </h1>
        <div 
          className={`w-24 h-1 bg-[#a855f7] mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 w-24' : 'opacity-0 w-0'
          }`}
        ></div>
        <p 
          className={`text-xl md:text-2xl max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Where creativity meets purpose. Explore the space where we bring your brand vision to life.
        </p>
        <button 
          className={`bg-[#a855f7] text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onClick={() => {
            const aboutSection = document.getElementById('studio-about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Discover Our Space
        </button>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
}