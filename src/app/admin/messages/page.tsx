'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contact/messages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        setError('Error loading messages. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
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
              <Link href="/admin/dashboard" className="text-white hover:text-opacity-80 transition">
                Dashboard
              </Link>
              <Link href="/" className="text-white hover:text-opacity-80 transition">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Contact Messages</h1>
            <p className="text-gray-400">Manage inquiries from your contact form</p>
          </div>
          <Link 
            href="/admin/dashboard" 
            className="px-6 py-3 border border-[#a855f7] text-white rounded-full hover:bg-[#a855f7] transition-colors duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
        
        {/* Messages Table */}
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6">
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
                  {messages.map((message) => (
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
                        <div className="flex space-x-2">
                          <Link 
                            href={`/admin/messages/${message._id}`}
                            className="px-3 py-1 bg-[#2a2a2a] rounded text-sm hover:bg-[#3a3a3a]"
                          >
                            View
                          </Link>
                          <a 
                            href={`mailto:${message.email}`}
                            className="px-3 py-1 bg-[#2a2a2a] rounded text-sm hover:bg-[#3a3a3a]"
                          >
                            Reply
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}