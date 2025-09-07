import { NextRequest, NextResponse } from 'next/server';
import { verifyIPNSignature } from '@/utils/nowpayments';
import { connectDb } from '@/config';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-nowpayments-sig');

    if (!signature) {
      console.error('Missing NOWPayments signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    if (!ipnSecret) {
      console.error('NOWPayments IPN secret not configured');
      return NextResponse.json({ error: 'IPN secret not configured' }, { status: 500 });
    }

    // Verify the webhook signature
    if (!verifyIPNSignature(rawBody, signature, ipnSecret)) {
      console.error('Invalid NOWPayments signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const webhookData = JSON.parse(rawBody);
    console.log('NOWPayments webhook received:', webhookData);

    const {
      payment_id,
      payment_status,
      order_id,
      price_amount,
      price_currency,
      pay_amount,
      pay_currency,
      actually_paid,
    } = webhookData;

    // Connect to database
    await connectDb();

    // Find the booking by order_id (which should be the booking ID)
    const booking = await Booking.findById(order_id);
    if (!booking) {
      console.error(`Booking not found for order_id: ${order_id}`);
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update booking based on payment status
    let updateData: any = {
      transactionId: payment_id,
      paymentMethod: 'cryptocurrency',
    };

    switch (payment_status) {
      case 'finished':
      case 'confirmed':
        updateData.paymentStatus = 'paid';
        updateData.status = 'confirmed';
        break;
      case 'partially_paid':
        updateData.paymentStatus = 'pending';
        break;
      case 'failed':
      case 'expired':
        updateData.paymentStatus = 'failed';
        updateData.status = 'cancelled';
        break;
      case 'refunded':
        updateData.paymentStatus = 'refunded';
        updateData.status = 'cancelled';
        break;
      default:
        updateData.paymentStatus = 'pending';
    }

    // Update the booking
    await Booking.findByIdAndUpdate(order_id, updateData);

    console.log(`Updated booking ${order_id} with payment status: ${payment_status}`);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error processing NOWPayments webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}