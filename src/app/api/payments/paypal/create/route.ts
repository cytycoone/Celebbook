import { NextRequest, NextResponse } from 'next/server';
import { PayPalClient } from '@/utils/paypal';

export async function POST(req: NextRequest) {
  try {
    const { amount, bookingId, description } = await req.json();

    if (!amount || !bookingId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, bookingId' },
        { status: 400 }
      );
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      );
    }

    const paypalClient = new PayPalClient();

    // Get the base URL for callbacks
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    
    const orderRequest = {
      amount: parseFloat(amount),
      currency: 'USD',
      orderId: bookingId,
      description: description || `Celebrity booking payment for order ${bookingId}`,
      returnUrl: `${baseUrl}/api/payments/paypal/success?booking_id=${bookingId}`,
      cancelUrl: `${baseUrl}/booking/cancel?order_id=${bookingId}`,
    };

    console.log('Creating PayPal order:', orderRequest);

    const order = await paypalClient.createOrder(orderRequest);

    // Find the approval URL
    const approvalUrl = order.links.find(link => link.rel === 'approve')?.href;

    return NextResponse.json({
      success: true,
      order_id: order.id,
      approval_url: approvalUrl,
      status: order.status,
    });

  } catch (error: any) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}