'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Blog {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  tags: string[];
}

interface ContactMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs
        const blogsResponse = await fetch('/api/blogs');
        if (!blogsResponse.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData.blogs || []);
        
        // Fetch contact messages
        const messagesResponse = await fetch('/api/contact/messages');
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          setMessages(messagesData.messages || []);
        }
      } catch (err) {
        setError('Error loading data. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sarwa Studio Admin</h1>
            <div className="flex space-x-4">
              <Link href="/" className="text-white hover:text-opacity-80 transition">
                View Site
              </Link>
              <Link href="/blogs" className="text-white hover:text-opacity-80 transition">
                View Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 max-w-6xl">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your content and website settings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/admin/blogs/new" 
              className="px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white rounded-full hover:opacity-90 transition-all"
            >
              Create New Blog
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Total Blogs</h3>
            <p className="text-4xl font-bold text-[#a855f7]">{blogs.length}</p>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">New Messages</h3>
            <p className="text-4xl font-bold text-[#a855f7]">
              {messages.filter(msg => msg.status === 'new').length}
            </p>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
            <p className="text-4xl font-bold text-[#a855f7]">
              {blogs.length > 0 ? formatDate(blogs[0].createdAt) : 'No activity'}
            </p>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Popular Tags</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(
                blogs
                  .flatMap(blog => blog.tags)
                  .reduce((acc: {[key: string]: number}, tag) => {
                    acc[tag] = (acc[tag] || 0) + 1;
                    return acc;
                  }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([tag, count]: [string, number], index: number) => (
                  <span key={index} className="px-3 py-1 bg-[#2a2a2a] rounded-full text-sm">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
        
        {/* Recent Blogs Table */}
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
            <Link href="/admin/blogs" className="text-[#a855f7] hover:underline">
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a855f7]"></div>
              <p className="mt-2">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 text-red-300 p-4 rounded">
              <p>{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No blog posts yet.</p>
              <Link 
                href="/admin/blogs/new" 
                className="mt-4 inline-block px-6 py-2 border border-[#a855f7] text-white rounded-full hover:bg-[#a855f7] transition-colors duration-300"
              >
                Create Your First Blog
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Author</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.slice(0, 5).map((blog) => (
                    <tr key={blog._id} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4">{blog.title}</td>
                      <td className="py-3 px-4">{blog.author}</td>
                      <td className="py-3 px-4">{formatDate(blog.createdAt)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/blogs/${blog._id}`}
                            className="px-3 py-1 bg-[#2a2a2a] rounded text-sm hover:bg-[#3a3a3a]"
                          >
                            View
                          </Link>
                          <Link 
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="px-3 py-1 bg-[#2a2a2a] rounded text-sm hover:bg-[#3a3a3a]"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Recent Contact Messages */}
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Contact Messages</h2>
            <Link href="/admin/messages" className="text-[#a855f7] hover:underline">
              View All Messages →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a855f7]"></div>
              <p className="mt-2">Loading messages...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 text-red-300 p-4 rounded">
              <p>{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No contact messages yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.slice(0, 5).map((message) => (
                    <tr key={message._id} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4">{message.firstName} {message.lastName}</td>
                      <td className="py-3 px-4">{message.email}</td>
                      <td className="py-3 px-4">{formatDate(message.createdAt)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          message.status === 'new' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {message.status === 'new' ? 'New' : 'Read'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link 
                          href={`/admin/messages/${message._id}`}
                          className="px-3 py-1 bg-[#2a2a2a] rounded text-sm hover:bg-[#3a3a3a]"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/admin/blogs/new"
              className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] transition-colors flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mb-3">
                <span className="text-xl">+</span>
              </div>
              <h3 className="font-semibold mb-1">New Blog</h3>
              <p className="text-sm text-gray-400">Create a new blog post</p>
            </Link>
            
            <Link 
              href="/admin/media"
              className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] transition-colors flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mb-3">
                <span className="text-xl">📷</span>
              </div>
              <h3 className="font-semibold mb-1">Media Library</h3>
              <p className="text-sm text-gray-400">Manage your images</p>
            </Link>
            
            <Link 
              href="/admin/settings"
              className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] transition-colors flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center mb-3">
                <span className="text-xl">⚙️</span>
              </div>
              <h3 className="font-semibold mb-1">Settings</h3>
              <p className="text-sm text-gray-400">Configure your site</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}