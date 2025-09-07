import { NextRequest, NextResponse } from 'next/server';
import { NOWPaymentsClient } from '@/utils/nowpayments';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, bookingId, description } = await req.json();

    if (!amount || !currency || !bookingId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, bookingId' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'NOWPayments API key not configured' },
        { status: 500 }
      );
    }

    const client = new NOWPaymentsClient(apiKey);

    // Get the base URL for callbacks
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    
    const paymentRequest = {
      price_amount: parseFloat(amount),
      price_currency: 'USD',
      pay_currency: currency.toUpperCase(),
      order_id: bookingId,
      order_description: description || `Celebrity booking payment for order ${bookingId}`,
      ipn_callback_url: `${baseUrl}/api/payments/crypto/webhook`,
      success_url: `${baseUrl}/booking/success?order_id=${bookingId}`,
      cancel_url: `${baseUrl}/booking/cancel?order_id=${bookingId}`,
    };

    console.log('Creating NOWPayments payment:', paymentRequest);

    const payment = await client.createPayment(paymentRequest);

    return NextResponse.json({
      success: true,
      payment_id: payment.payment_id,
      payment_address: payment.pay_address,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      payment_status: payment.payment_status,
      order_id: payment.order_id,
    });

  } catch (error: any) {
    console.error('Error creating crypto payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create crypto payment' },
      { status: 500 }
    );
  }
}