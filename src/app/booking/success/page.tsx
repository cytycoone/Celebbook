'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheck, FaSpinner } from 'react-icons/fa';

const BookingSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data.booking);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <FaSpinner className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <FaCheck className="text-6xl text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      {booking ? (
        <p>Your booking with ID {booking._id} has been confirmed.</p>
      ) : (
        <p>Your payment was successful. Booking details will arrive shortly.</p>
      )}
      <Link
        href="/"
        className="mt-6 bg-purple-600 py-2 px-4 rounded hover:bg-purple-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default BookingSuccessPage;
