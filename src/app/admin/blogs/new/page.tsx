'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    featuredImage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Convert comma-separated tags to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog post');
      }

      const data = await response.json();
      setSuccess('Blog post created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        author: '',
        tags: '',
        featuredImage: ''
      });
      
      // Redirect to the blog post after a short delay
      setTimeout(() => {
        router.push(`/blogs/${data.blogId}`);
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sarwa Studio Admin</h1>
            <Link href="/blogs" className="text-white hover:text-opacity-80 transition">
              View All Blogs
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 max-w-6xl">
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Blog Post</h1>
          <p className="text-gray-400 mb-8">Share your insights and expertise with the Sarwa Studio audience</p>
          
          {error && (
            <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-900 bg-opacity-20 border-l-4 border-green-500 text-green-300 p-4 mb-6 rounded">
              <p className="font-bold">Success!</p>
              <p>{success}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#a855f7] focus:border-[#a855f7] text-white"
                  placeholder="Enter blog title"
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#a855f7] focus:border-[#a855f7] text-white"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#a855f7] focus:border-[#a855f7] text-white"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">Add a URL to an image that represents your blog post</p>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#a855f7] focus:border-[#a855f7] text-white"
                placeholder="design, video, strategy"
              />
              <p className="mt-1 text-sm text-gray-500">Help readers find your content with relevant tags</p>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#a855f7] focus:border-[#a855f7] text-white"
                placeholder="Write your blog content here..."
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white py-3 px-4 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a855f7] disabled:opacity-50 transition-all duration-200 font-medium text-lg"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link href="/admin/dashboard" className="px-6 py-3 border border-[#a855f7] text-white rounded-full hover:bg-[#a855f7] transition-colors duration-300">
            Back to Dashboard
          </Link>
          <Link href="/blogs" className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:bg-opacity-10 transition-all">
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}