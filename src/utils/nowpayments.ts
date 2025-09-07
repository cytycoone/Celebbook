import axios from 'axios';

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

export interface NOWPaymentsPayment {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url?: string;
  success_url?: string;
  cancel_url?: string;
}

export interface CreatePaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url?: string;
  success_url?: string;
  cancel_url?: string;
}

export class NOWPaymentsClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async getAvailableCurrencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${NOWPAYMENTS_API_URL}/currencies`, {
        headers: this.getHeaders(),
      });
      return response.data.currencies;
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw new Error('Failed to fetch available currencies');
    }
  }

  async createPayment(request: CreatePaymentRequest): Promise<NOWPaymentsPayment> {
    try {
      const response = await axios.post(
        `${NOWPAYMENTS_API_URL}/payment`,
        request,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error creating payment:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create payment');
    }
  }

  async getPaymentStatus(paymentId: string): Promise<NOWPaymentsPayment> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/payment/${paymentId}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching payment status:', error.response?.data || error.message);
      throw new Error('Failed to fetch payment status');
    }
  }

  async getMinimumPaymentAmount(currencyFrom: string, currencyTo: string): Promise<number> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/min-amount?currency_from=${currencyFrom}&currency_to=${currencyTo}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data.min_amount;
    } catch (error) {
      console.error('Error fetching minimum amount:', error);
      throw new Error('Failed to fetch minimum payment amount');
    }
  }

  async estimatePaymentAmount(amount: number, currencyFrom: string, currencyTo: string) {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/estimate?amount=${amount}&currency_from=${currencyFrom}&currency_to=${currencyTo}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error estimating payment amount:', error);
      throw new Error('Failed to estimate payment amount');
    }
  }
}

// Utility function to verify IPN signature
export function verifyIPNSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha512', secret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');
  return calculatedSignature === signature;
}