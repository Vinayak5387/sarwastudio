'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import icons from React Icons
import { FaPaintBrush, FaLaptopCode, FaMobileAlt, FaBox, FaCamera } from 'react-icons/fa';

// Services data
const services = [
  {
    id: 'branding',
    title: 'Branding & Identity',
    description: 'We create distinctive brand identities that resonate with your audience and stand out in the market.',
    icon: <FaPaintBrush size={24} />,
    color: '#a855f7',
    features: [
      'Brand Strategy',
      'Logo Design',
      'Visual Identity Systems',
      'Brand Guidelines',
      'Brand Messaging',
      'Brand Positioning'
    ]
  },

  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'We build beautiful, functional websites that deliver exceptional user experiences and drive results.',
    icon: <FaLaptopCode size={24} />,
    imagePath: '/images/services/webdev.jpg',
    color: '#3b82f6',
    features: [
      'UI/UX Design',
      'Responsive Websites',
      'E-commerce Solutions',
      'Content Management Systems',
      'Web Applications',
      'Performance Optimization'
    ]
  },
  {
    id: 'product-design',
    title: 'Product & App Design',
    description: 'We design intuitive digital products and applications that solve real problems for users.',
    icon: <FaMobileAlt size={24} />,
    imagePath: '/images/services/product-app.jpg',
    color: '#22c55e',
    features: [
      'User Research',
      'User Interface Design',
      'User Experience Design',
      'Prototyping',
      'Usability Testing',
      'Design Systems'
    ]
  },
  {
    id: 'packaging',
    title: 'Packaging Design',
    description: 'We create packaging solutions that protect your product, tell your story, and catch the consumer\'s eye.',
    icon: <FaBox size={24} />,
    imagePath: '/images/services/Packaging-Design.jpg',
    color: '#f59e0b',
    features: [
      'Packaging Strategy',
      'Structural Design',
      'Label Design',
      'Retail Packaging',
      'Sustainable Solutions',
      'Packaging Production'
    ]
  },
  {
    id: 'photography',
    title: 'Photography & Video',
    description: 'We capture compelling visual content that showcases your brand, products, and services.',
    icon: <FaCamera size={24} />,
    color: '#ef4444',
    features: [
      'Product Photography',
      'Brand Photography',
      'Lifestyle Photography',
      'Video Production',
      'Motion Graphics',
      'Content Creation'
    ]
  }
];

export default function ServicesPage() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <section 
        ref={sectionRef}
        className="py-20 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-6xl mx-auto">
          <h1 
            className={`text-5xl md:text-6xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Our Services
          </h1>
          <div 
            className={`w-16 h-1 bg-[#a855f7] mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 w-16' : 'opacity-0 w-0'
            }`}
          ></div>
          <p 
            className={`text-xl text-gray-300 max-w-2xl mb-20 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            We offer a comprehensive range of creative services to help your brand stand out and connect with your audience.
          </p>

          {/* Services List */}
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col md:flex-row gap-12 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
              >
                {/* Left side - even index */}
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center mb-6">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                          style={{ backgroundColor: service.color }}
                        >
                          {service.icon}
                        </div>
                        <h2 className="text-3xl font-bold">{service.title}</h2>
                      </div>
                      <p className="text-gray-300 mb-8">{service.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: service.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 bg-[#1a1a1a] rounded-lg overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <Image 
                          src={service.imagePath || `/images/services/${service.id}.jpg`} 
                          alt={service.title} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 bg-[#1a1a1a] rounded-lg overflow-hidden md:order-1">
                      <div className="aspect-[4/3] relative">
                        <Image 
                          src={service.imagePath || `/images/services/${service.id}.jpg`} 
                          alt={service.title} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 md:order-2">
                      <div className="flex items-center mb-6">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                          style={{ backgroundColor: service.color }}
                        >
                          {service.icon}
                        </div>
                        <h2 className="text-3xl font-bold">{service.title}</h2>
                      </div>
                      <p className="text-gray-300 mb-8">{service.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: service.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div 
            className={`mt-24 text-center transition-all duration-700 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's collaborate to bring your vision to life with our creative expertise.
            </p>
            
            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-[#1a1a1a] p-8 rounded-lg">
              <form className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7] text-white"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7] text-white"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7] text-white"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a855f7] text-white resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="inline-block bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-400">Or reach us directly at</p>
              <a href="mailto:hello@sarwastudio.com" className="text-[#a855f7] hover:underline">hello@sarwastudio.com</a>
            </div>
            
            {/* Resources Section */}
            <div className="mt-16 pt-12 border-t border-[#2a2a2a]">
              <h3 className="text-2xl font-bold mb-8">Resources</h3>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blog Card */}
                <Link 
                  href="/blog" 
                  className="group bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="h-48 relative">
                    <Image 
                      src="/images/blog/blog-cover.jpg" 
                      alt="Sarwa Studio Blog" 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold">Our Blog</h4>
                      <p className="text-gray-300 text-sm mt-1">Insights, tips, and inspiration from our team</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-[#a855f7] font-medium">View Articles</span>
                    <svg className="w-5 h-5 text-[#a855f7] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
                
                {/* External Blog Link */}
                <a 
                  href="https://brandemic.in/blog/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="h-48 relative">
                    <Image 
                      src="/images/blog/brandemic-cover.jpg" 
                      alt="Brandemic Blog" 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold">Brandemic Blog</h4>
                      <p className="text-gray-300 text-sm mt-1">Industry insights and design resources</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-[#a855f7] font-medium">Visit Blog</span>
                    <svg className="w-5 h-5 text-[#a855f7] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>    
    </div>
  );
}