'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ModernLoftPage() {
  const [activeImage, setActiveImage] = useState(0);
  
  // Project details with updated image paths
  const project = {
    title: "Modern Loft",
    description: "A minimalist urban living space that combines industrial elements with warm textures. This project transforms a former warehouse into a sophisticated residential loft with open spaces, abundant natural light, and thoughtful design details.",
    client: "Urban Living Development",
    location: "Downtown District",
    year: "2023",
    area: "2,800 sq ft",
    services: ["Interior Design", "Space Planning", "Custom Furniture", "Lighting Design"],
    images: [
      "/images/portfolio/interior-design/1.jpeg",
      "/images/portfolio/interior-design/2.jpeg",
      "/images/portfolio/interior-design/3.jpeg",
      "/images/portfolio/interior-design/4.jpeg",
      "/images/portfolio/interior-design/5.jpeg",
      "/images/portfolio/interior-design/6.jpeg",
      "/images/portfolio/interior-design/7.jpeg",
      "/images/portfolio/interior-design/8.jpeg",
      "/images/portfolio/interior-design/9.jpeg",
      "/images/portfolio/interior-design/10.jpeg",
      "/images/portfolio/interior-design/11.jpeg",
      "/images/portfolio/interior-design/12.jpeg",
      "/images/portfolio/interior-design/13.jpeg",
      "/images/portfolio/interior-design/14.jpeg",
      "/images/portfolio/interior-design/15.jpeg",
    ]
  };

  // Function to navigate to previous image
  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  // Function to navigate to next image
  const nextImage = () => {
    setActiveImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero section with main image */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image 
          src={project.images[activeImage]} 
          alt={`${project.title} - Featured image`}
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="transition-opacity duration-500"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-between px-6">
          <button 
            onClick={prevImage}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all transform hover:scale-110"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all transform hover:scale-110"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent py-10 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <Link href="/portfolio" className="inline-flex items-center text-[#22c55e] hover:underline mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white">{project.title}</h1>
            <div className="w-16 h-1 bg-[#22c55e] mt-4"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 lg:px-24">
        {/* Image counter and gallery controls */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400">
            Image {activeImage + 1} of {project.images.length}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveImage(0)}
              className="text-sm px-4 py-2 border border-[#22c55e] text-[#22c55e] rounded-lg hover:bg-[#22c55e] hover:text-black transition-colors"
            >
              View All
            </button>
          </div>
        </div>

        {/* Thumbnail gallery - horizontal scrollable */}
        <div className="mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className={`relative w-40 h-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-[#22c55e] ring-offset-2 ring-offset-[#0a0a0a]' : 'opacity-70'}`}
                onClick={() => setActiveImage(index)}
              >
                <Image 
                  src={image} 
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project content in a more readable layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Project details sidebar - now on the left for better reading flow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111] p-8 rounded-xl h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            
            <div className="mb-6">
              <h3 className="text-[#22c55e] font-medium mb-2">Client</h3>
              <p className="text-gray-300">{project.client}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-[#22c55e] font-medium mb-2">Location</h3>
              <p className="text-gray-300">{project.location}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-[#22c55e] font-medium mb-2">Year</h3>
              <p className="text-gray-300">{project.year}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-[#22c55e] font-medium mb-2">Area</h3>
              <p className="text-gray-300">{project.area}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-[#22c55e] font-medium mb-2">Services</h3>
              <ul className="text-gray-300 list-disc pl-5">
                {project.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/contact" 
                className="block w-full py-3 px-4 bg-[#22c55e] text-center text-white font-medium rounded-lg hover:bg-[#1ea750] transition-colors"
              >
                Discuss Your Project
              </Link>
            </div>
          </motion.div>

          {/* Main content - now on the right with more space */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {project.description}
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              This modern loft features an open floor plan that maximizes the sense of space while maintaining distinct functional areas. The industrial heritage of the building is celebrated through exposed brick walls, concrete floors, and original steel beams, while being softened with carefully selected furnishings and textiles.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Natural light floods the space through large factory windows, complemented by a thoughtful lighting design that creates ambiance and highlights architectural features. The material palette combines raw textures with refined finishes, creating a balanced and sophisticated aesthetic.
            </p>
            
            <h2 className="text-3xl font-bold mb-6 mt-12">Design Approach</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our approach to this project was to honor the building's industrial character while creating a comfortable, contemporary living environment. We preserved original architectural elements where possible and introduced modern interventions that complement rather than compete with the existing structure.
            </p>
          </motion.div>
        </div>
        
        {/* Related projects section with improved cards */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/portfolio/interior-design/luxury-villa" className="group">
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <Image 
                  src="/images/portfolio/interior-design/6.jpeg" 
                  alt="Luxury Villa" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">View Project</span>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-[#22c55e] transition-colors">Luxury Villa</h3>
              <p className="text-gray-400">Elegant coastal retreat</p>
            </Link>
            
            <Link href="/portfolio/interior-design/boutique-hotel" className="group">
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <Image 
                  src="/images/portfolio/interior-design/9.jpeg" 
                  alt="Boutique Hotel Lobby" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">View Project</span>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-[#22c55e] transition-colors">Boutique Hotel Lobby</h3>
              <p className="text-gray-400">Sophisticated hospitality design</p>
            </Link>
            
            <Link href="/portfolio/interior-design/creative-office" className="group">
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <Image 
                  src="/images/portfolio/interior-design/12.jpeg" 
                  alt="Creative Office Space" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">View Project</span>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-[#22c55e] transition-colors">Creative Office Space</h3>
              <p className="text-gray-400">Collaborative workspace design</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Add custom styles for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}