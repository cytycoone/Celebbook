import { NextRequest, NextResponse } from 'next/server';
import { NOWPaymentsClient } from '@/utils/nowpayments';

const getClient = () => {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) throw new Error('NOWPayments API key not configured');
  return new NOWPaymentsClient(apiKey);
};

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { paymentId } = context.params;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const client = getClient();
    const payment = await client.getPaymentStatus(paymentId);

    return NextResponse.json({ success: true, ...payment });
  } catch (error: any) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}
