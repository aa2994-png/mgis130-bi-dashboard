/**
 * Serverless Function: Earnings Transcript Proxy
 * Fetches earnings call transcripts from the API Ninjas endpoint.
 */

const API_ENDPOINT = 'https://api.api-ninjas.com/v1/earningstranscript';

/**
 * @param {import('http').IncomingMessage & { query: Record<string, string | string[]> }} req
 * @param {import('http').ServerResponse} res
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { ticker } = req.query || {};
  const normalizedTicker = Array.isArray(ticker)
    ? ticker[0]
    : ticker;
  const trimmedTicker = typeof normalizedTicker === 'string' ? normalizedTicker.trim().toUpperCase() : '';

  if (!trimmedTicker) {
    return res.status(400).json({
      success: false,
      error: 'Missing ticker parameter'
    });
  }

  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'API_NINJAS_KEY environment variable is not configured'
    });
  }

  const url = new URL(API_ENDPOINT);
  url.searchParams.set('ticker', trimmedTicker);

  let upstreamResponse;

  try {
    upstreamResponse = await fetch(url.toString(), {
      headers: {
        'X-Api-Key': apiKey
      }
    });
  } catch (error) {
    console.error('Error contacting API Ninjas:', error);
    return res.status(502).json({
      success: false,
      error: 'Failed to reach the transcripts provider'
    });
  }

  let rawBody = '';

  try {
    rawBody = await upstreamResponse.text();
  } catch (error) {
    console.error('Error reading API Ninjas response:', error);
    return res.status(502).json({
      success: false,
      error: 'Unable to read response from transcripts provider'
    });
  }

  let parsedBody = null;

  if (rawBody) {
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('Error parsing API Ninjas response:', parseError);

      if (!upstreamResponse.ok) {
        return res.status(upstreamResponse.status).json({
          success: false,
          error: rawBody || 'Transcripts provider returned an error'
        });
      }

      return res.status(502).json({
        success: false,
        error: 'Unexpected response format from transcripts provider'
      });
    }
  }

  if (!upstreamResponse.ok) {
    const providerError = parsedBody && typeof parsedBody === 'object'
      ? parsedBody.error || parsedBody.message || rawBody || 'Provider request failed'
      : rawBody || 'Provider request failed';

    const statusCode = upstreamResponse.status === 200 ? 502 : upstreamResponse.status;

    return res.status(statusCode).json({
      success: false,
      error: providerError
    });
  }

  const hasResults = Array.isArray(parsedBody)
    ? parsedBody.length > 0
    : Boolean(parsedBody && typeof parsedBody === 'object');

  if (!hasResults) {
    return res.status(404).json({
      success: false,
      error: 'No transcript data returned for ticker'
    });
  }

  return res.status(200).json({
    success: true,
    data: parsedBody
  });
}
