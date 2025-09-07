import { NextRequest, NextResponse } from 'next/server';
import { PayPalClient } from '@/utils/paypal';
import { connectDb } from '@/config';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
  try {
    const { orderId, bookingId } = await req.json();

    if (!orderId || !bookingId) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, bookingId' },
        { status: 400 }
      );
    }

    const paypalClient = new PayPalClient();

    console.log('Capturing PayPal order:', orderId);

    // Capture the PayPal order
    const captureResult = await paypalClient.captureOrder(orderId);

    // Connect to database and update booking
    await connectDb();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      console.error(`Booking not found for ID: ${bookingId}`);
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update booking based on capture result
    let updateData: any = {
      transactionId: orderId,
      paymentMethod: 'paypal',
    };

    if (captureResult.status === 'COMPLETED') {
      updateData.paymentStatus = 'paid';
      updateData.status = 'confirmed';
    } else {
      updateData.paymentStatus = 'pending';
    }

    // Update the booking
    await Booking.findByIdAndUpdate(bookingId, updateData);

    console.log(`Updated booking ${bookingId} with PayPal payment status: ${captureResult.status}`);

    return NextResponse.json({
      success: true,
      capture_id: captureResult.id,
      status: captureResult.status,
      payment_status: updateData.paymentStatus,
    });

  } catch (error: any) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}