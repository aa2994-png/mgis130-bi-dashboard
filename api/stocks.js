/**
 * Serverless Function: Stock Price API Handler
 * Fetches real-time stock data from API Ninjas for major tech companies
 * Deployed on Vercel as /api/stocks
 */

// Company ticker mapping for clear display names
const COMPANIES = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft Corporation',
  GOOGL: 'Alphabet Inc.',
  META: 'Meta Platforms Inc.',
  AMZN: 'Amazon.com Inc.'
};

/**
 * Fetches stock price for a single ticker
 * @param {string} ticker - Stock ticker symbol
 * @param {string} apiKey - API Ninjas API key
 * @returns {Promise<Object>} Stock data object
 */
async function fetchStockPrice(ticker, apiKey) {
  const url = `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`;
  
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${ticker}: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    ticker,
    company: COMPANIES[ticker],
    price: data.price,
    timestamp: new Date().toISOString()
  };
}

/**
 * Main serverless function handler
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
export default async function handler(req, res) {
  // Set CORS headers for client-side access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Retrieve API key from environment variables
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error('API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API key not configured'
      });
    }

    // Fetch all stock prices concurrently for better performance
    const tickers = Object.keys(COMPANIES);
    const stockPromises = tickers.map(ticker => 
      fetchStockPrice(ticker, apiKey)
    );

    // Wait for all requests to complete
    const stocks = await Promise.all(stockPromises);

    // Return successful response with stock data
    return res.status(200).json({
      success: true,
      data: stocks,
      timestamp: new Date().toISOString(),
      count: stocks.length
    });

  } catch (error) {
    // Log error for debugging (visible in Vercel logs)
    console.error('Stock API Error:', error);

    // Return error response to client
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data',
      message: error.message
    });
  }
}
