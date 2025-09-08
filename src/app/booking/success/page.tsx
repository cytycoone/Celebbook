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
    const fetchBooking = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
          <FaCheck className="text-3xl text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        
        {booking ? (
          <div className="space-y-4 mb-6">
            <p className="text-gray-300">
              Your booking has been confirmed and payment has been processed successfully.
            </p>
            <div className="bg-white/5 rounded-lg p-4 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Booking ID:</span>
                  <span className="text-white font-mono">{booking._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white">${booking.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Status:</span>
                  <span className="text-green-400 capitalize">{booking.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-white capitalize">{booking.service}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              You will receive a confirmation email shortly with all the details.
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-300">
              Your payment has been processed successfully! You will receive a confirmation email shortly.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Return to Home
          </Link>
          
          {booking && (
            <Link
              href={`/booking/${booking.celebrityId}`}
              className="block w-full bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Book Another Service
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
