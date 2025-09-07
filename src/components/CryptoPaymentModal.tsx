'use client';

import { useState, useEffect } from 'react';
import { FaBitcoin, FaEthereum, FaCopy, FaExternalLinkAlt, FaSpinner, FaCheck } from 'react-icons/fa';

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  bookingId: string;
  selectedCrypto: string;
  onPaymentCreated: (paymentData: any) => void;
}

const CryptoPaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  bookingId, 
  selectedCrypto,
  onPaymentCreated 
}: CryptoPaymentModalProps) => {
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [availableCryptos, setAvailableCryptos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableCryptos();
    }
  }, [isOpen]);

  const fetchAvailableCryptos = async () => {
    try {
      const response = await fetch('/api/payments/crypto/currencies');
      const data = await response.json();
      if (data.success) {
        setAvailableCryptos(data.currencies);
      }
    } catch (err) {
      console.error('Error fetching cryptocurrencies:', err);
    }
  };

  const createPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/crypto/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: selectedCrypto,
          bookingId,
          description: `Celebrity booking payment for order ${bookingId}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      setPayment(data);
      onPaymentCreated(data);

      // Start checking payment status
      const statusInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`/api/payments/crypto/status/${data.payment_id}`);
          const statusData = await statusResponse.json();
          
          if (statusData.success) {
            setPayment((prev: any) => ({ ...prev, payment_status: statusData.payment_status }));
            
            if (['finished', 'confirmed'].includes(statusData.payment_status)) {
              clearInterval(statusInterval);
              // Payment completed successfully
              setTimeout(() => {
                onClose();
                window.location.href = `/booking/success?order_id=${bookingId}`;
              }, 2000);
            }
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }, 10000); // Check every 10 seconds

      // Clear interval after 30 minutes
      setTimeout(() => {
        clearInterval(statusInterval);
      }, 30 * 60 * 1000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCryptoIcon = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'btc':
        return <FaBitcoin className="text-orange-500" />;
      case 'eth':
        return <FaEthereum className="text-blue-500" />;
      default:
        return <FaBitcoin className="text-gray-500" />;
    }
  };

  const selectedCryptoData = availableCryptos.find((crypto: any) => 
    crypto.symbol === selectedCrypto.toLowerCase()
  ) as any;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            Cryptocurrency Payment
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {!payment ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">
                {getCryptoIcon(selectedCrypto)}
              </div>
              <p className="text-white">
                Pay ${amount} with {selectedCryptoData?.name || selectedCrypto.toUpperCase()}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={createPayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Creating Payment...
                </>
              ) : (
                'Create Payment'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">
                {getCryptoIcon(selectedCrypto)}
              </div>
              <p className="text-white font-semibold">
                Send {payment.pay_amount} {payment.pay_currency?.toUpperCase()}
              </p>
              <p className="text-gray-300 text-sm">
                Payment ID: {payment.payment_id}
              </p>
            </div>

            {payment.payment_status === 'finished' || payment.payment_status === 'confirmed' ? (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                <FaCheck className="text-green-400 text-2xl mx-auto mb-2" />
                <p className="text-green-200 font-semibold">Payment Confirmed!</p>
                <p className="text-green-300 text-sm">Redirecting...</p>
              </div>
            ) : (
              <>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-2">Send to this address:</p>
                  <div className="flex items-center gap-2 bg-black/20 rounded p-2">
                    <code className="text-white text-xs flex-1 break-all">
                      {payment.payment_address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(payment.payment_address)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-400 text-xs mt-1">Copied!</p>
                  )}
                </div>

                <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-3">
                  <p className="text-blue-200 text-sm">
                    ⚠️ Send the exact amount to the address above. 
                    Payment will be confirmed automatically once the transaction is received.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Status: <span className="text-yellow-400 capitalize">{payment.payment_status}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoPaymentModal;