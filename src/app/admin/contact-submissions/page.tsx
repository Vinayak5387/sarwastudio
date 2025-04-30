'use client';

import { useEffect, useState } from 'react';
import { getDocuments } from '@/lib/firestore';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const data = await getDocuments('contactSubmissions');
        setSubmissions(data as ContactSubmission[]);
      } catch (err) {
        setError('Failed to load submissions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  // Format timestamp safely
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
    // Handle Firestore Timestamp objects
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleString();
    }
    
    // Handle server timestamp that might come as an object with seconds and nanoseconds
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    
    return 'Unknown date format';
  };

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Form Submissions</h1>
      
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{submission.subject}</h2>
              <p><strong>From:</strong> {submission.name} ({submission.email})</p>
              <p className="mt-2">{submission.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Submitted on: {formatTimestamp(submission.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}