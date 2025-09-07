import { NextRequest, NextResponse } from 'next/server';
import { NOWPaymentsClient } from '@/utils/nowpayments';

export async function GET(
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const { paymentId } = params;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
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
    const payment = await client.getPaymentStatus(paymentId);

    return NextResponse.json({
      success: true,
      payment_id: payment.payment_id,
      payment_status: payment.payment_status,
      pay_address: payment.pay_address,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      price_amount: payment.price_amount,
      price_currency: payment.price_currency,
      order_id: payment.order_id,
    });

  } catch (error: any) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}