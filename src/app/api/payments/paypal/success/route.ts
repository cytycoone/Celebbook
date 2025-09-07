import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token'); // PayPal order ID
    const payerId = searchParams.get('PayerID');
    const bookingId = searchParams.get('booking_id');

    console.log('PayPal success callback:', { token, payerId, bookingId });

    if (!token || !payerId || !bookingId) {
      console.error('Missing required PayPal success parameters');
      return redirect(`/booking/cancel?order_id=${bookingId || 'unknown'}`);
    }

    // Capture the payment
    const captureResponse = await fetch(`${req.nextUrl.origin}/api/payments/paypal/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: token,
        bookingId: bookingId
      })
    });

    const captureResult = await captureResponse.json();

    if (captureResult.success && captureResult.status === 'COMPLETED') {
      // Redirect to success page
      return redirect(`/booking/success?order_id=${bookingId}`);
    } else {
      console.error('PayPal capture failed:', captureResult);
      return redirect(`/booking/cancel?order_id=${bookingId}`);
    }

  } catch (error: any) {
    console.error('Error in PayPal success callback:', error);
    return redirect('/booking/cancel');
  }
}