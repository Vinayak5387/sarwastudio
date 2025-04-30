import Link from 'next/link';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Message Details | Sarwa Studio Admin',
  description: 'View contact message details',
};

// Update the type definition to match Next.js 15.2.1 expectations
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetail({ params }: PageProps) {
  // Resolve the params promise
  const resolvedParams = await params;
  let message: ContactMessage | null = null;
  let error = '';
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/contact/messages/${resolvedParams.id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch message');
    }
    
    const data = await response.json();
    message = data.message;
    
    if (message && message.status === 'new') {
      await fetch(`${baseUrl}/api/contact/messages/${resolvedParams.id}/read`, {
        method: 'PUT',
        cache: 'no-store'
      });
    }
  } catch (err) {
    error = 'Error loading message. Please try again.';
    console.error(err);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
              <Link href="/admin/messages" className="text-white hover:text-opacity-80 transition">
                All Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 max-w-4xl">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-[#a855f7] hover:underline flex items-center">
            ← Back to Dashboard
          </Link>
        </div>
        
        {error ? (
          <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 text-red-300 p-4 rounded">
            <p>{error}</p>
          </div>
        ) : message ? (
          <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Message from {message.firstName} {message.lastName}</h1>
                <p className="text-gray-400">Received on {formatDate(message.createdAt)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                message.status === 'new' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {message.status === 'new' ? 'New' : 'Read'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Email</h3>
                <p className="text-lg">{message.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Phone</h3>
                <p className="text-lg">{message.phone || 'Not provided'}</p>
              </div>
            </div>
            
            {message.services && message.services.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Interested Services</h3>
                <div className="flex flex-wrap gap-2">
                  {message.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-[#2a2a2a] rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Message</h3>
              <div className="bg-[#2a2a2a] p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href={`mailto:${message.email}`}
                className="px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white rounded-full hover:opacity-90 transition-all"
              >
                Reply via Email
              </a>
              <Link 
                href="/admin/messages"
                className="px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-[#2a2a2a] transition-all"
              >
                Back to Messages
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-8 text-center">
            <p>Message not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}