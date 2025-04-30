'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Team member data
const teamMembers = [
  {
    name: 'Vinayak Vishwakarma',
    role: 'Owner & Creative Director',
    bio: 'Graphic Designer, Editor, Photographer',
    image: '/images/team/vinayak.jpg',
    social: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Chhyanchu Lathiya',
    role: 'Web Developer',
    bio: 'PHP Developer, Data Specialist',
    image: '/images/team/chhayanchu.jpg', // Fixed the typo in the filename
    social: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Hatim',
    role: 'Web Developer',
    bio: 'WordPress Specialist, PHP Developer',
    image: '/images/team/hatim.jpg',
    social: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  }
];

export default function StudioTeam() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="py-20 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 
          className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Our Team
        </h2>
        <div 
          className={`w-16 h-1 bg-[#22c55e] mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
          }`}
        ></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className={`bg-[#1a1a1a] rounded-lg overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100 + 300}ms` : '0ms' }}
            >
              <div className="aspect-[4/5] relative">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image for ${member.name}: ${member.image}`);
                    // Optional: Set a fallback image
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x500?text=" + encodeURIComponent(member.name);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#22c55e] font-medium mb-2">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}