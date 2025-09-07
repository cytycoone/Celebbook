import { NextRequest, NextResponse } from 'next/server';
import { NOWPaymentsClient } from '@/utils/nowpayments';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'NOWPayments API key not configured' },
        { status: 500 }
      );
    }

    const client = new NOWPaymentsClient(apiKey);
    const currencies = await client.getAvailableCurrencies();

    // Filter to popular cryptocurrencies for better UX
    const popularCrypto = [
      'btc', 'eth', 'ltc', 'bch', 'xrp', 'ada', 'dot', 'link',
      'xlm', 'usdt', 'usdc', 'dai', 'bnb', 'matic', 'avax', 'sol'
    ];

    const availableCrypto = currencies.filter(currency => 
      popularCrypto.includes(currency.toLowerCase())
    );

    // Add display names for better UX
    const cryptoWithNames = availableCrypto.map(currency => {
      const names: { [key: string]: string } = {
        'btc': 'Bitcoin',
        'eth': 'Ethereum',
        'ltc': 'Litecoin',
        'bch': 'Bitcoin Cash',
        'xrp': 'Ripple',
        'ada': 'Cardano',
        'dot': 'Polkadot',
        'link': 'Chainlink',
        'xlm': 'Stellar',
        'usdt': 'Tether',
        'usdc': 'USD Coin',
        'dai': 'Dai',
        'bnb': 'Binance Coin',
        'matic': 'Polygon',
        'avax': 'Avalanche',
        'sol': 'Solana'
      };

      return {
        symbol: currency.toLowerCase(),
        name: names[currency.toLowerCase()] || currency.toUpperCase(),
        displayName: `${names[currency.toLowerCase()] || currency.toUpperCase()} (${currency.toUpperCase()})`
      };
    });

    return NextResponse.json({
      success: true,
      currencies: cryptoWithNames
    });

  } catch (error: any) {
    console.error('Error fetching cryptocurrencies:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch available cryptocurrencies' },
      { status: 500 }
    );
  }
}