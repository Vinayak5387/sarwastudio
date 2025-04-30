import Image from "next/image";
import Link from "next/link";
import ServicesSection from "../components/ServicesSection";
import TeamMembers from "@/components/TeamMembers";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section with animated text */}
      {/* Hero Section with animated text */}
            <section className="py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
              <div className="max-w-6xl w-full">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                  <span className="block text-gradient animate-slide-up opacity-0" style={{ animationDelay: "0s", animationFillMode: "forwards" }}>ELEVATING</span>
                  <span className="block text-gradient animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>BRANDS</span>
                  <span className="block text-gradient animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>VISUALLY</span>
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <p className="text-xl max-w-md mb-8 md:mb-0 animate-slide-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                    We craft stunning visuals and engaging video content for brands that want to stand out.
                  </p>
                  <Link href="/contact" className="px-6 py-3 bg-[#974bdf] text-white rounded-full hover-lift animate-slide-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
                    Let's collaborate →
                  </Link>
                </div>
              </div>
            </section>

      {/* Scrolling text banner */}
      <div className="py-8 overflow-hidden bg-[#1f1f1f] relative">
        <div className="whitespace-nowrap animate-scroll">
          <span className="text-4xl font-bold mx-4">GRAPHIC DESIGN</span>
          <span className="text-4xl font-bold mx-4">•</span>
          <span className="text-4xl font-bold mx-4">VIDEO EDITING</span>
          <span className="text-4xl font-bold mx-4">•</span>
          <span className="text-4xl font-bold mx-4">BRAND IDENTITY</span>
          <span className="text-4xl font-bold mx-4">•</span>
          <span className="text-4xl font-bold mx-4">MOTION GRAPHICS</span>
          <span className="text-4xl font-bold mx-4">•</span>
        </div>
      </div>
      
      {/* Brands we work with */}
      <div className="py-12 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-xl text-gray-400 mb-10">Trusted by innovative brands</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-24 h-12 md:w-32 md:h-16 relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image 
                src="/images/portfolio/vvise-partner/Aurielle/Untitled-1.png" 

                alt="Brand Partner" 
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-12 md:w-32 md:h-16 relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image 
                src="/images/portfolio/vvise-partner/Untitled-1.png" 
                alt="Brand Partner" 
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-12 md:w-32 md:h-16 relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image 
                src="/images/brands/brand3.png" 
                alt="Brand Partner" 
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-12 md:w-32 md:h-16 relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image 
                src="/images/brands/brand4.png" 
                alt="Brand Partner" 
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-12 md:w-32 md:h-16 relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image 
                src="/images/brands/brand5.png" 
                alt="Brand Partner" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">SELECTED WORK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Project 1 */}
            <div className="stack-carddd card hover-lift group">
            
            {/* And similarly for the other project cards */}
              <div className="stack-card-internal aspect-square bg-[#1f1f1f] relative overflow-hidden">
                <Image 
                  src="/images/SELECTED-WORK/brand-identity.jpg"
                  alt="Brand Identity Project"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute bottom-4 right-4 text-4xl font-bold text-white opacity-80">01</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Brand Identity</h3>
                <p className="text-gray-400 mb-4">
                  Complete visual identity for a modern lifestyle brand.
                </p>
              </div>
            </div>
            
            {/* Project¬ 2 */}
            <div className="stack-carddd card hover-lift">
              <div className="stack-card-internal aspect-square bg-[#1f1f1f] relative overflow-hidden">
                <Image 
                  src="/images/SELECTED-WORK/Video Campaign.jpg"
                  alt="Video Campaign Project"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute bottom-4 right-4 text-4xl font-bold text-white opacity-80">02</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Video Campaign</h3>
                <p className="text-gray-400 mb-4">
                  Series of promotional videos with custom motion graphics.
                </p>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="stack-carddd card hover-lift">
              <div className="stack-card-internal aspect-square bg-[#1f1f1f] relative overflow-hidden">
                <Image 
                  src="/images/SELECTED-WORK/social media.jpg"
                  alt="Social Media Project"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute bottom-4 right-4 text-4xl font-bold text-white opacity-80">03</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Social Media</h3>
                <p className="text-gray-400 mb-4">
                  Comprehensive content package for digital platforms.
                </p>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="stack-carddd card hover-lift">
              <div className="stack-card-internal aspect-square bg-[#1f1f1f] relative overflow-hidden">
                <Image 
                  src="/images/SELECTED-WORK/uui-ux.jpg"
                  alt="UI/UX Design Project"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute bottom-4 right-4 text-4xl font-bold text-white opacity-80">04</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">UI/UX Design</h3>
                <p className="text-gray-400 mb-4">
                  User interface design for web and mobile applications.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/portfolio" className="px-6 py-3 border border-[#974bdf] text-white rounded-full hover:bg-[#974bdf] transition-colors duration-300">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section with Overlapping Cards */}
      <ServicesSection />
      
      {/* Client Testimonials Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1f1f1f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#2a2a2a] p-8 rounded-lg hover-lift transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">A</span>
                </div>
                <div>
                  <h3 className="font-bold">Alex Thompson</h3>
                  <p className="text-sm text-gray-400">CEO, Innovate Tech</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Sarwa Studio transformed our brand identity completely. Their creative approach and attention to detail exceeded our expectations."
              </p>
              <div className="flex mt-4">
                <span className="text-[#a855f7]">★★★★★</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-[#2a2a2a] p-8 rounded-lg hover-lift transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">M</span>
                </div>
                <div>
                  <h3 className="font-bold">Maria Rodriguez</h3>
                  <p className="text-sm text-gray-400">Marketing Director, Elevate Brands</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The video campaign Sarwa created for us generated a 200% increase in engagement. Their team is incredibly talented and responsive."
              </p>
              <div className="flex mt-4">
                <span className="text-[#a855f7]">★★★★★</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-[#2a2a2a] p-8 rounded-lg hover-lift transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">J</span>
                </div>
                <div>
                  <h3 className="font-bold">James Wilson</h3>
                  <p className="text-sm text-gray-400">Founder, Nexus Startup</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Working with Sarwa Studio was a game-changer for our startup. Their design work helped us secure our next round of funding."
              </p>
              <div className="flex mt-4">
                <span className="text-[#a855f7]">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div className="p-6">
              <h3 className="text-4xl font-bold text-[#a855f7] mb-2">100+</h3>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-[#a855f7] mb-2">50+</h3>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Insights</h2>
            <Link href="/blog" className="text-[#a855f7] hover:underline">
              View All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden hover-lift transition-all">
              <div className="h-48 bg-[#2a2a2a] relative">
                <div className="absolute top-4 left-4 bg-[#a855f7] text-white text-sm px-3 py-1 rounded-full">
                  Design
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-2">March 15, 2023</p>
                <h3 className="text-xl font-bold mb-3">The Evolution of Brand Design in 2023</h3>
                <p className="text-gray-400 mb-4">
                  Exploring the latest trends and innovations in brand design and visual identity.
                </p>
                <Link href="/blog/evolution-brand-design" className="text-[#a855f7] hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
            
            {/* Blog Post 2 */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden hover-lift transition-all">
              <div className="h-48 bg-[#2a2a2a] relative">
                <div className="absolute top-4 left-4 bg-[#a855f7] text-white text-sm px-3 py-1 rounded-full">
                  Video
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-2">February 28, 2023</p>
                <h3 className="text-xl font-bold mb-3">Why Video Content Dominates Digital Marketing</h3>
                <p className="text-gray-400 mb-4">
                  How video has become the most effective medium for brand storytelling.
                </p>
                <Link href="/blog/video-content-marketing" className="text-[#a855f7] hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
            
            {/* Blog Post 3 */}
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden hover-lift transition-all">
              <div className="h-48 bg-[#2a2a2a] relative">
                <div className="absolute top-4 left-4 bg-[#a855f7] text-white text-sm px-3 py-1 rounded-full">
                  Strategy
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-2">January 15, 2023</p>
                <h3 className="text-xl font-bold mb-3">Building a Cohesive Brand Strategy</h3>
                <p className="text-gray-400 mb-4">
                  How to align your visual identity with your overall business objectives.
                </p>
                <Link href="/blog/cohesive-brand-strategy" className="text-[#a855f7] hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-[#a855f7] to-[#3b82f6]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-white text-[#a855f7] font-bold rounded-full hover:bg-opacity-90 transition-all">
              Start a Project
            </Link>
            <Link href="/portfolio" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:bg-opacity-10 transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}