'use client';

import { useState } from 'react';
import { FaPaypal, FaSpinner } from 'react-icons/fa';

interface PayPalPaymentButtonProps {
  amount: number;
  bookingId: string;
  onPaymentCreated: (paymentData: any) => void;
  onError: (error: string) => void;
}

const PayPalPaymentButton = ({ 
  amount, 
  bookingId, 
  onPaymentCreated, 
  onError 
}: PayPalPaymentButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayPalPayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/payments/paypal/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          bookingId,
          description: `Celebrity booking payment for order ${bookingId}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create PayPal payment');
      }

      onPaymentCreated(data);

      // Redirect to PayPal for payment approval
      if (data.approval_url) {
        window.location.href = data.approval_url;
      } else {
        throw new Error('No PayPal approval URL received');
      }

    } catch (err: any) {
      console.error('PayPal payment error:', err);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayPalPayment}
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Creating PayPal Payment...
        </>
      ) : (
        <>
          <FaPaypal className="text-xl" />
          Pay with PayPal (${amount})
        </>
      )}
    </button>
  );
};

export default PayPalPaymentButton;