// @ts-ignore
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// PayPal environment setup
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

  // Use sandbox for development, live for production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export interface PayPalOrderRequest {
  amount: number;
  currency?: string;
  orderId: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export class PayPalClient {
  private paypalClient: any;

  constructor() {
    this.paypalClient = client();
  }

  async createOrder(orderRequest: PayPalOrderRequest): Promise<PayPalOrder> {
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderRequest.orderId,
          description: orderRequest.description || `Celebrity booking payment for order ${orderRequest.orderId}`,
          amount: {
            currency_code: orderRequest.currency || 'USD',
            value: orderRequest.amount.toFixed(2)
          }
        }
      ],
      application_context: {
        return_url: orderRequest.returnUrl,
        cancel_url: orderRequest.cancelUrl,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'Celebrity Booking Platform'
      }
    });

    try {
      const order = await this.paypalClient.execute(request);
      return {
        id: order.result.id,
        status: order.result.status,
        links: order.result.links
      };
    } catch (error: any) {
      console.error('PayPal order creation error:', error);
      throw new Error(error.message || 'Failed to create PayPal order');
    }
  }

  async captureOrder(orderId: string): Promise<any> {
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const capture = await this.paypalClient.execute(request);
      return capture.result;
    } catch (error: any) {
      console.error('PayPal order capture error:', error);
      throw new Error(error.message || 'Failed to capture PayPal order');
    }
  }

  async getOrder(orderId: string): Promise<any> {
    const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

    try {
      const order = await this.paypalClient.execute(request);
      return order.result;
    } catch (error: any) {
      console.error('PayPal get order error:', error);
      throw new Error(error.message || 'Failed to get PayPal order');
    }
  }
}