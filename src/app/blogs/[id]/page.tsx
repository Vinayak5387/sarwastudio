'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${blogId}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API error details:', errorData);
          throw new Error(`Failed to fetch blog: ${response.status} ${errorData.details || ''}`);
        }
        
        const data = await response.json();
        
        if (!data.blog) {
          throw new Error('Invalid response format: blog not found');
        }
        
        setBlog(data.blog);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog</h1>
        <p className="text-gray-300 mb-6">{error || 'Blog not found'}</p>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea750] transition-colors"
          >
            Try Again
          </button>
          <Link href="/blogs" className="px-6 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/blogs" className="text-[#22c55e] hover:underline mb-6 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to blogs
        </Link>
        
        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <div className="w-16 h-1 bg-[#22c55e] mb-8"></div>
          
          <div className="flex items-center text-gray-400 mb-8">
            <p>By {blog.author}</p>
            <span className="mx-2">•</span>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
          
          {blog.featuredImage && (
            <div className="relative h-96 w-full mb-8">
              <Image 
                src={blog.featuredImage} 
                alt={blog.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-lg prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-[#333] rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}