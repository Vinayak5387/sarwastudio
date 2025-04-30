'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function StudioAbout() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="studio-about"
      ref={sectionRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className={`text-3xl md:text-5xl font-bold mb-6 text-white transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              About Our Studio
            </h2>
            <div 
              className={`w-16 h-1 bg-[#a855f7] mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
              }`}
            ></div>
            <p 
              className={`text-lg mb-6 text-gray-300 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Sarwa Studio is a creative sanctuary where innovation and design converge. 
              Founded in 2018, our studio has evolved into a collaborative space where 
              talented designers, photographers, and creative thinkers come together to 
              craft meaningful brand experiences.
            </p>
            <p 
              className={`text-lg mb-8 text-gray-300 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Our workspace is designed to inspire creativity, with open areas for 
              collaboration, private spaces for focused work, and state-of-the-art 
              equipment to bring your vision to life.
            </p>
            <div 
              className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div>
                <h3 className="text-4xl font-bold text-[#a855f7] mb-2">5+</h3>
                <p className="text-gray-300">Years of Experience</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#a855f7] mb-2">100+</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#a855f7] mb-2">12</h3>
                <p className="text-gray-300">Team Members</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#a855f7] mb-2">15+</h3>
                <p className="text-gray-300">Industry Awards</p>
              </div>
            </div>
          </div>
          <div 
            className={`relative h-[500px] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/studio/workspace-1.jpg" 
                alt="Sarwa Studio workspace" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-lg overflow-hidden shadow-xl border-4 border-[#0a0a0a]">
              <Image 
                src="/images/studio/workspace-2.jpg" 
                alt="Sarwa Studio team" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}