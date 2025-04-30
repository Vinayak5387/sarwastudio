'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the Blog type
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  createdAt: string;
  tags: string[];
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API error details:', errorData);
          throw new Error(`Failed to fetch blogs: ${response.status} ${errorData.details || ''}`);
        }
        
        const data = await response.json();
        
        // Check if blogs property exists and is an array
        if (!data.blogs || !Array.isArray(data.blogs)) {
          throw new Error('Invalid response format: blogs array not found');
        }
        
        setBlogs(data.blogs);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blogs</h1>
        <p className="text-gray-300 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea750] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Blog</h1>
        <div className="w-16 h-1 bg-[#22c55e] mb-8"></div>
        <p className="text-xl text-gray-300 max-w-2xl mb-16">
          Insights, updates, and stories from our creative team.
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No blog posts yet</h2>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <div className="h-48 relative">
                    <Image
                      src={blog.featuredImage || '/images/blog-placeholder.jpg'}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <p className="text-gray-400 mb-4">
                      {new Date(blog.createdAt).toLocaleDateString()} • {blog.author}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags && blog.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#333] rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}