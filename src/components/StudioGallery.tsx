'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    src: '/images/studio/gallery-1.jpg',
    alt: 'Studio workspace with creative team',
    width: 'col-span-2',
    height: 'row-span-2'
  },
  {
    src: '/images/studio/gallery-2.jpg',
    alt: 'Design brainstorming session',
    width: 'col-span-1',
    height: 'row-span-1'
  },
  {
    src: '/images/studio/gallery-3.jpg',
    alt: 'Photography equipment setup',
    width: 'col-span-1',
    height: 'row-span-1'
  },
  {
    src: '/images/studio/gallery-4.jpg',
    alt: 'Product photoshoot in progress',
    width: 'col-span-1',
    height: 'row-span-2'
  },
  {
    src: '/images/studio/gallery-5.jpg',
    alt: 'Team collaboration meeting',
    width: 'col-span-1',
    height: 'row-span-1'
  },
  {
    src: '/images/studio/gallery-6.jpg',
    alt: 'Creative workspace details',
    width: 'col-span-1',
    height: 'row-span-1'
  }
];

export default function StudioGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          className={`text-3xl md:text-5xl font-bold mb-6 text-white text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Studio Gallery
        </h2>
        <div 
          className={`w-16 h-1 bg-[#a855f7] mx-auto mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
          }`}
        ></div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.src}
              className={`relative overflow-hidden rounded-lg cursor-pointer ${image.width} ${image.height} transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                aspectRatio: image.width.includes('2') ? '2/1' : '1/1'
              }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image 
              src={selectedImage} 
              alt="Gallery image" 
              fill 
              className="object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}