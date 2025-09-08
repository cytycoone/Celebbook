'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaTimes, FaSpinner } from 'react-icons/fa';

const BookingCancelPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [cancelInfo, setCancelInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchCancel = async () => {
      try {
        const response = await fetch(`/api/bookings/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setCancelInfo(data.booking);
        }
      } catch (error) {
        console.error('Error fetching booking cancel info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCancel();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <FaSpinner className="text-4xl text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <FaTimes className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Booking Cancelled</h1>
      {cancelInfo ? (
        <p>Your booking with ID {cancelInfo._id} has been cancelled.</p>
      ) : (
        <p>No booking information found.</p>
      )}
      <Link
        href="/"
        className="mt-6 bg-red-600 py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default BookingCancelPage;
