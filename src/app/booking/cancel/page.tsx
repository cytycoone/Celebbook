 'use client';
 export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

const BookingCancelPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
          <FaTimes className="text-3xl text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Your payment was cancelled or interrupted. No charges have been made to your account.
          </p>
          
          {orderId && (
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-400 mb-1">Booking Reference:</p>
              <p className="text-white font-mono text-sm">{orderId}</p>
            </div>
          )}
          
          <p className="text-gray-300 text-sm">
            You can try the payment again or choose a different payment method.
          </p>
        </div>

        <div className="space-y-3">
          {orderId && (
            <Link
              href={`/booking/${orderId}`}
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Try Payment Again
            </Link>
          )}
          
          <Link
            href="/"
            className="block w-full bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCancelPage;
