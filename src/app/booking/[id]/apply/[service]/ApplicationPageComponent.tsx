'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaArrowLeft, FaCalendarAlt, FaEnvelope, FaPhone, FaUser, FaBitcoin, FaUniversity, FaPaypal } from 'react-icons/fa';
import CryptoPaymentModal from '@/components/CryptoPaymentModal';
import PayPalPaymentButton from '@/components/PayPalPaymentButton';

const ApplicationPageComponent = ({
    params,
  }: {
    params: { id: string; service: string };
  }) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const cardTypes = [
      {
        id: 'bronze',
        name: 'Standard / Bronze Card',
        price: 99,
        features: ['Basic access to events', 'Digital autograph', 'Monthly newsletter']
      },
      {
        id: 'silver',
        name: 'Silver Fan Card',
        price: 199,
        features: ['Priority event access', 'Physical card', 'Quarterly meet & greet', 'Exclusive content']
      },
      {
        id: 'gold',
        name: 'Gold Fan Card',
        price: 499,
        features: ['VIP event access', 'Premium card', 'Monthly meet & greet', 'Exclusive merchandise']
      },
      {
        id: 'platinum',
        name: 'Platinum / Elite Fan Card',
        price: 999,
        features: ['All-access pass', 'Limited edition card', 'Weekly meet & greet', 'Personal concierge']
      },
      {
        id: 'event',
        name: 'Event-Based Fan Card',
        price: 299,
        features: ['Single event VIP access', 'Collectible card', 'Event photo opportunity', 'Backstage tour']
      }
    ];
  
    const donationAmounts = [
      { value: '50', label: '$50' },
      { value: '100', label: '$100' },
      { value: '250', label: '$250' },
      { value: '500', label: '$500' },
      { value: 'custom', label: 'Custom Amount' }
    ];
  
    const paymentMethods = [
      {
        id: 'paypal',
        name: 'PayPal',
        icon: FaPaypal,
        description: 'Pay securely with PayPal or your credit/debit card'
      },
      {
        id: 'crypto',
        name: 'Cryptocurrency',
        icon: FaBitcoin,
        description: 'Pay with Bitcoin, Ethereum, or other major cryptocurrencies'
      },
      {
        id: 'bank',
        name: 'Bank Transfer',
        icon: FaUniversity,
        description: 'Direct bank transfer to our secure account'
      }
    ];
  
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      cardType: 'bronze',
      budget: '500',
      donationAmount: '50',
      customAmount: '',
      paymentMethod: 'paypal',
      selectedCrypto: 'btc',
      message: ''
    });
  
    const handleDonationChange = (value: string) => {
      setFormData(prev => ({
        ...prev,
        donationAmount: value,
        customAmount: value === 'custom' ? prev.customAmount : ''
      }));
    };
  
    const [celebrity, setCelebrity] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [availableCryptos, setAvailableCryptos] = useState([]);
    const [createdBooking, setCreatedBooking] = useState<any>(null);

    useEffect(() => {
      const fetchCelebrity = async () => {
        try {
          const res = await fetch(`/api/celebrities/id/${params.id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch celebrity');
          }
          const data = await res.json();
          // Clean the celebrity object to prevent circular references
          const cleanCelebrity = {
            _id: data._id,
            name: data.name,
            profession: data.profession,
            imageUrl: data.imageUrl,
            slug: data.slug,
            bio: data.bio,
            featured: data.featured,
            pricing: data.pricing
          };
          setCelebrity(cleanCelebrity);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load celebrity');
        } finally {
          setLoading(false);
        }
      };

      fetchCelebrity();
    }, [params.id]);
  
    const serviceInfo = {
      'meet-greet': {
        title: 'Meet & Greet Application',
        description: 'Apply for a personal one-on-one meeting with photo opportunities and autograph session.',
        applicationUrl: '#'
      },
      'vip-card': {
        title: 'VIP Fan Card Application',
        description: 'Apply for an exclusive membership card with priority access to events and special content.',
        applicationUrl: '#'
      },
      'donate': {
        title: 'Donation Application',
        description: 'Support charitable causes through your favorite celebrity.',
        applicationUrl: '#'
      }
    }[params.service];
  
    if (!serviceInfo) {
      router.push(`/booking/${params.id}`);
      return null;
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Validate donation amount if this is a donation
        if (params.service === 'donate') {
          const donationValue = formData.donationAmount === 'custom' ? formData.customAmount : formData.donationAmount;
          if (!donationValue || isNaN(parseFloat(donationValue)) || parseFloat(donationValue) <= 0) {
            throw new Error('Please enter a valid donation amount');
          }
        }

        // Calculate amount based on service type
        let calculatedAmount = 0;
        if (params.service === 'donate') {
          calculatedAmount = parseFloat(formData.donationAmount === 'custom' ? formData.customAmount : formData.donationAmount);
        } else if (params.service === 'vip-card') {
          calculatedAmount = cardTypes.find(card => card.id === formData.cardType)?.price || 0;
        } else if (params.service === 'meet-greet') {
          calculatedAmount = parseFloat(formData.budget) || 500;
        }

        // Create booking
        const bookingPayload = {
          celebrityId: params.id,
          service: params.service === 'meet-greet' ? 'meet-and-greet' : 
                  params.service === 'vip-card' ? 'vip-fan-cards' : 'donation',
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          date: formData.date || new Date(),
          amount: calculatedAmount,
          notes: formData.message,
          paymentMethod: formData.paymentMethod === 'crypto' ? 'cryptocurrency' : 
                         formData.paymentMethod === 'paypal' ? 'paypal' : 'bank',
          metadata: {
            serviceType: params.service,
            ...(params.service === 'vip-card' ? { cardType: formData.cardType } : {}),
            ...(params.service === 'donate' ? { 
              donationAmount: calculatedAmount
            } : {})
          }
        };

        console.log('Sending booking:', bookingPayload);

        const bookingRes = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload)
        });

        if (!bookingRes.ok) {
          throw new Error('Failed to create booking');
        }

        const bookingData = await bookingRes.json();
        setCreatedBooking(bookingData.booking);

        // Handle different payment methods
        if (formData.paymentMethod === 'crypto') {
          setShowCryptoModal(true);
        } else if (formData.paymentMethod === 'paypal') {
          // PayPal payment will be handled by the PayPal button component
          // Just keep the booking data for now
        } else {
          setIsSubmitted(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit application');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <div className="relative h-[30vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
          <Image
            src={celebrity?.imageUrl || '/placeholder-celebrity.jpg'}
            alt={celebrity?.name || 'Celebrity'}
            fill
            className="object-cover"
            priority
          />
        </div>
  
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            href={`/booking/${params.id}`}
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Options
          </Link>
  
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">{serviceInfo.title}</h1>
                <p className="text-xl text-gray-300">{serviceInfo.description}</p>
              </div>
  
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
  
                  {/* Email */}
                  <div>
                    <label className="block text-white mb-2">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
  
                  {/* Phone */}
                  <div>
                    <label className="block text-white mb-2">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
  
                  {params.service === 'donate' && (
                    <div className="space-y-8">
                      <label className="block text-white mb-4">Select Donation Amount</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {donationAmounts.map((amount) => (
                          <button
                            key={amount.value}
                            type="button"
                            onClick={() => handleDonationChange(amount.value)}
                            className={`px-4 py-3 rounded-lg text-center transition-all duration-300 ${formData.donationAmount === amount.value
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                              }`}
                          >
                            {amount.label}
                          </button>
                        ))}
                      </div>
  
                      {formData.donationAmount === 'custom' && (
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
                          <input
                            type="number"
                            required
                            min="1"
                            value={formData.customAmount}
                            onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter custom amount"
                          />
                        </div>
                      )}
                      
                      <p className="text-gray-400 text-sm">
                        100% of your donation will go to the celebrity's chosen charity
                      </p>
                    </div>
                  )}
  
                  {params.service === 'meet-greet' && (
                    <div>
                      <label className="block text-white mb-2">Your Budget (USD)</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
                        <input
                          type="number"
                          required
                          min="100"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter your budget"
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">Minimum budget: $100</p>
                    </div>
                  )}
  
                  {params.service === 'vip-card' && (
                    <div>
                      <label className="block text-white mb-4">Select Card Type</label>
                      <div className="grid grid-cols-1 gap-4">
                        {cardTypes.map((card) => (
                          <label
                            key={card.id}
                            className={`relative block p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                              formData.cardType === card.id
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cardType"
                              value={card.id}
                              checked={formData.cardType === card.id}
                              onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                              className="sr-only"
                              required
                            />
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold text-white">{card.name}</h4>
                              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                                ${celebrity?.pricing?.vipCard?.[card.id] || card.price}
                              </span>
                            </div>
                            <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                              {card.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-white mb-2">Preferred Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
  
                  {/* Payment Method */}
                  <div>
                    <label className="block text-white mb-4">Select Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={`relative block p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                              formData.paymentMethod === method.id
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                              className="sr-only"
                              required
                            />
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="w-6 h-6 text-gray-400" />
                              <span className="text-lg font-semibold text-white">{method.name}</span>
                            </div>
                            <p className="text-sm text-gray-400 pl-9">{method.description}</p>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cryptocurrency Selection */}
                  {formData.paymentMethod === 'crypto' && (
                    <div>
                      <label className="block text-white mb-4">Select Cryptocurrency</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { symbol: 'btc', name: 'Bitcoin', icon: '₿' },
                          { symbol: 'eth', name: 'Ethereum', icon: 'Ξ' },
                          { symbol: 'ltc', name: 'Litecoin', icon: 'Ł' },
                          { symbol: 'usdt', name: 'USDT', icon: '₮' }
                        ].map((crypto) => (
                          <label
                            key={crypto.symbol}
                            className={`relative block p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              formData.selectedCrypto === crypto.symbol
                                ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="radio"
                              name="selectedCrypto"
                              value={crypto.symbol}
                              checked={formData.selectedCrypto === crypto.symbol}
                              onChange={(e) => setFormData({ ...formData, selectedCrypto: e.target.value })}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="text-2xl mb-1">{crypto.icon}</div>
                              <div className="text-sm font-semibold text-white">{crypto.name}</div>
                              <div className="text-xs text-gray-400">{crypto.symbol.toUpperCase()}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Additional Message */}
                  <div>
                    <label className="block text-white mb-2">Additional Message (Optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows={4}
                      placeholder="Any specific requests or questions?"
                    />
                  </div>
  
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 mb-6">
                      {error}
                    </div>
                  )}

                  {/* PayPal Payment Button */}
                  {createdBooking && formData.paymentMethod === 'paypal' && !isSubmitted ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-white mb-4">Complete your payment with PayPal</p>
                      </div>
                      <PayPalPaymentButton
                        amount={createdBooking.amount}
                        bookingId={createdBooking._id}
                        onPaymentCreated={(paymentData) => {
                          console.log('PayPal payment created:', paymentData);
                        }}
                        onError={(error) => {
                          setError(error);
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-lg text-white transition-all duration-300 transform ${!isSubmitting && 'hover:from-purple-600 hover:to-pink-600 hover:-translate-y-1'} ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                  )}
                </form>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Application Submitted Successfully!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for your interest! Our support team will contact you within the next 4 hours to confirm your booking and provide additional details.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-8 py-4 bg-white/10 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
                  >
                    Return to Home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Crypto Payment Modal */}
        {createdBooking && (
          <CryptoPaymentModal
            isOpen={showCryptoModal}
            onClose={() => {
              setShowCryptoModal(false);
              setIsSubmitted(true);
            }}
            amount={createdBooking.amount}
            bookingId={createdBooking._id}
            selectedCrypto={formData.selectedCrypto}
            onPaymentCreated={(paymentData) => {
              console.log('Payment created:', paymentData);
            }}
          />
        )}
      </div>
    );
}


export default ApplicationPageComponent