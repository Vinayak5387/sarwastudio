'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <div className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled && !mobileMenuOpen ? 'md:pt-10 pt-0' : 'pt-0'
    }`}>
      <nav className={`bg-[#1a1a1ae2] backdrop-blur-lg py-4 px-6 md:px-12 lg:px-24 transition-all duration-500 ease-in-out ${
        isScrolled && !mobileMenuOpen ? 'md:w-[80%] md:mx-auto md:rounded-full md:shadow-lg w-full' : 'w-full' 
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <div className="h-10 w-auto flex items-center justify-center mr-3">
              <img src="/logos/sarwa-studio.png" alt="Sarwa Studio Logo" className="h-full w-auto" />
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
          
            <Link href="/portfolio" className="text-white hover:text-[#22c55e] transition-colors">
              Portfolio
            </Link>
            <div className="relative group">
              <Link href="/services" className="text-white hover:text-[#22c55e] transition-colors flex items-center">
                Services <span className="ml-1">▼</span>
              </Link>
              {/* Dropdown would go here */}
            </div>
            <Link href="/studio" className="text-white hover:text-[#22c55e] transition-colors">
              Creative Studio
            </Link>
            <Link href="/blogs" className="text-white hover:text-[#22c55e] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-[#22c55e] transition-colors">
              Contact Us
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#1a1a1ae2] backdrop-blur-lg rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              <Link href="/about" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                About Us
              </Link>
              <Link href="/portfolio" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                Portfolio
              </Link>
              <Link href="/services" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                Services
              </Link>
              <Link href="/studio" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                Creative Studio
              </Link>
              <Link href="/blogs" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                Blog
              </Link>
              <Link href="/contact" className="text-white hover:text-[#22c55e] transition-colors py-2" onClick={handleLinkClick}>
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}