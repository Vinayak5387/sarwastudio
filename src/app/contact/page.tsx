'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Contact() {
  // Use dynamic imports to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  // Define proper type for formData with string[] for services
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add proper event type for input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add proper type for service parameter
  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const updatedServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return {
        ...prev,
        services: updatedServices
      };
    });
  };
  
  // Add proper event type for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the Next.js API route instead of the Python backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        services: []
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}

      
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contact our team
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Got any questions about the product or scaling on our platform? We're here to help.
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>
      </section>
      
      {/* Contact Form Section - Only render when client-side */}
      {isClient && (
        <section className="py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] p-8 rounded-lg border border-gray-800">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="First name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      placeholder="you@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone number
                    </label>
                    <div className="flex">
                      <div className="relative">
                        <select 
                          className="appearance-none w-20 px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option>US</option>
                          <option>UK</option>
                          <option>CA</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      placeholder="Leave us a message..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Services
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-website"
                          checked={formData.services.includes('Website design')}
                          onChange={() => handleServiceToggle('Website design')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-website" className="ml-2 block text-sm text-gray-300">
                          Website design
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-content"
                          checked={formData.services.includes('Content creation')}
                          onChange={() => handleServiceToggle('Content creation')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-content" className="ml-2 block text-sm text-gray-300">
                          Content creation
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-ux"
                          checked={formData.services.includes('UX design')}
                          onChange={() => handleServiceToggle('UX design')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-ux" className="ml-2 block text-sm text-gray-300">
                          UX design
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-strategy"
                          checked={formData.services.includes('Strategy & consulting')}
                          onChange={() => handleServiceToggle('Strategy & consulting')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-strategy" className="ml-2 block text-sm text-gray-300">
                          Strategy & consulting
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-research"
                          checked={formData.services.includes('User research')}
                          onChange={() => handleServiceToggle('User research')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-research" className="ml-2 block text-sm text-gray-300">
                          User research
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="service-other"
                          checked={formData.services.includes('Other')}
                          onChange={() => handleServiceToggle('Other')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label htmlFor="service-other" className="ml-2 block text-sm text-gray-300">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isSubmitting ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-900 hover:bg-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send message'
                    )}
                  </button>
                </form>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Chat with us</h2>
                  <p className="text-gray-400">Speak to our friendly team via live chat.</p>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Start a live chat
                  </button>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Shoot us an email</h2>
                  <p className="text-gray-400">We're here to help.</p>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    hello@untitledui.com
                  </button>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Message us on X</h2>
                  <p className="text-gray-400">Our friendly team is here to help.</p>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.025 10.025 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                    </svg>
                    Message us on X
                  </button>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Call us</h2>
                  <p className="text-gray-400">Call our team Mon-Fri from 8am to 5pm.</p>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +91 93539 35976
                  </button>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Visit us</h2>
                  <p className="text-gray-400">Chat to us in person at our Melbourne HQ.</p>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    100 Smith Street, Collingwood VIC 3066
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Map Section - Only render when client-side */}
      {isClient && (
        <section className="h-96 relative mt-12">
          <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
            <p className="text-gray-500">Map will be displayed here</p>
          </div>
        </section>
      )}
      
       {/* Footer Section */}
      
      
      {/* Success Modal - Show when form is successfully submitted */}
      {submitSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#111111] p-8 rounded-lg border border-gray-800 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Message sent!</h3>
            <p className="text-gray-400 text-center mb-6">
              Thanks for reaching out. We'll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-white transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Mobile Menu - Only shown on mobile */}
      {isClient && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-50 transform transition-transform duration-300 ease-in-out translate-x-full">
          <div className="flex justify-end p-6">
            <button className="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-4">
            <ul className="space-y-6">
              <li><Link href="/" className="text-xl text-white hover:text-gray-300 transition">Home</Link></li>
              <li><Link href="#" className="text-xl text-white hover:text-gray-300 transition">Products</Link></li>
              <li><Link href="#" className="text-xl text-white hover:text-gray-300 transition">Solutions</Link></li>
              <li><Link href="/pricing" className="text-xl text-white hover:text-gray-300 transition">Pricing</Link></li>
              <li><Link href="#" className="text-xl text-white hover:text-gray-300 transition">Resources</Link></li>
              <li><Link href="#" className="text-xl text-white hover:text-gray-300 transition">Company</Link></li>
            </ul>
            <div className="mt-8 space-y-4">
              <Link href="/login" className="block text-center py-3 text-white hover:text-gray-300 transition">Log in</Link>
              <Link href="/demo" className="block text-center py-3 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition">View demo</Link>
              <Link href="/signup" className="block text-center py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-white transition">Get started</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}