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
 * Serverless Function: Earnings Transcript Handler
 * Provides stored earnings call transcript data for supported tickers.
 */

const TRANSCRIPTS = {
  MSFT: {
    date: '2024-01-30',
    timestamp: 1706653800,
    ticker: 'MSFT',
    cik: '789019',
    year: '2024',
    quarter: '2',
    earnings_timing: 'after_market',
    transcript:
      "Operator: Greetings, and welcome to the Microsoft Fiscal Year 2024 Second Quarter Earnings Conference Call. At this time, all participants are in a listen-only mode. A question-and-answer session will follow the formal presentation. [Operator Instructions] As a reminder, this conference is being recorded. I would now like to turn the conference over to your host, Brett Iversen, Vice President of Investor Relations. Please go ahead.\nBrett Iversen: Good afternoon, and thank you for joining us today. On the call with me are Satya Nadella, Chairman and Chief Executive Officer; Amy Hood, Chief Financial Officer; Alice Jolla, Chief Accounting Officer; and Keith Dolliver, Corporate Secretary and Deputy General Counsel. On the Microsoft Investor Relations website, you can find our earnings press release and financial summary slide deck, which is intended to supplement our prepared remarks during today's call, and provides the reconciliation of differences between GAAP and non-GAAP financial measures...",
    participants: [
      {
        name: 'Operator',
        role: 'Operator',
        company: 'Microsoft'
      },
      {
        name: 'Brett Iversen',
        role: 'Investor Relations',
        company: 'Microsoft'
      },
      {
        name: 'Satya Nadella',
        role: 'Chairman and Chief Executive Officer',
        company: 'Microsoft'
      },
      {
        name: 'Amy Hood',
        role: 'Chief Financial Officer',
        company: 'Microsoft'
      },
      {
        name: 'Mark Moerdler',
        role: 'Analyst',
        company: 'Bernstein Research'
      },
      '...'
    ],
    transcript_split: [
      {
        company: 'Microsoft',
        role: 'Operator',
        text: 'Greetings, and welcome to the Microsoft Fiscal Year 2024 Second Quarter Earnings Conference Call. At this time, all participants are in a listen-only mode. A question-and-answer session will follow the formal presentation. [Operator Instructions] As a reminder, this conference is being recorded. I would now like to turn the conference over to your host, Brett Iversen, Vice President of Investor Relations. Please go ahead.',
        speaker: 'Operator'
      },
      {
        company: 'Microsoft',
        role: 'Investor Relations',
        text: 'Good afternoon, and thank you for joining us today. On the call with me are Satya Nadella, Chairman and Chief Executive Officer; Amy Hood, Chief Financial Officer; Alice Jolla, Chief Accounting Officer; and Keith Dolliver, Corporate Secretary and Deputy General Counsel. On the Microsoft Investor Relations website, you can find our earnings press release and financial summary slide deck, which is intended to supplement our prepared remarks during today\'s call, and provides the reconciliation of differences between GAAP and non-GAAP financial measures. More detailed outlook slides will be available on the Microsoft Investor Relations website, when we provide outlook commentary on today\'s call. Microsoft, completed the acquisition of Activision Blizzard this quarter and we are reporting its results in our More Personal Computing segment, beginning on October 13, 2023. Accordingly, our Xbox content and services revenue growth investor metric includes the net impact of Activision. Additionally, our press release and slide deck contains supplemental information regarding the net impact of the Activision acquisition on our financial results. On this call, ...',
        speaker: 'Brett Iversen'
      },
      {
        company: 'Microsoft',
        role: 'Chairman and Chief Executive Officer',
        text: 'Thank you, Brett. It was a record quarter driven by the continued strength of Microsoft Cloud, which surpassed $33 billion in revenue, up 24%. We’ve moved from talking about AI to applying AI at scale by infusing AI across every layer of our tech stack, we are winning new customers and helping drive new benefits and productivity gains. Now I\'ll highlight examples of our momentum and progress starting with Azure. Azure again took share this quarter with our AI advantage. Azure offers the top performance for AI training and inference in the most diverse selection of AI accelerators, including the latest from AMD and NVIDIA, as well as our own first-party silicon Azure Maia. And with Azure AI, we provide access to the best selection of foundation and open-source models, including both LLM and SLMs, all integrated deeply with infrastructure, data, and tools on Azure. We now have 53,000 Azure AI customers, over one-third are new to Azure over the past 12 months. Our new models of service offering makes it easy for developers to use LLM\'s from our partners like Cohere, Meta, and Mistral on Azure, without having to manage underlying infrastructure. We have also built the world\'s most popular SLMs, which offer performance comparable to larger models, but are small enough to run on a laptop or mobile device. Anker, Ashley, AT&T, EY, and Thomson Reuters, for example, are all already exploring how to use our SLM-5 for their applications. And we have great momentum with Azure OpenAI Service. This quarter we added support for OpenAI\'s latest models including GPT-4 Turbo, GPT-4 with Vision, DALL-E 3 as well as fine-tuning. We are seeing increased usage from AI-first start-ups like Moveworks, Perplexity, SymphonyAI, as well as some of the world\'s largest companies. Over half of the Fortune 500 use Azure OpenAI today including Ally Financial, Coca-Cola, and Rockwell Automation...',
        speaker: 'Satya Nadella'
      },
      {
        company: 'Microsoft',
        role: 'Chief Financial Officer',
        text: 'Thank you, Satya, and good afternoon, everyone. This quarter, revenue was $62 billion, up 18% and 16% in constant currency. When adjusted for the prior year\'s Q2 charge, operating income increased 25% and 23% in constant currency, and earnings per share was $2.93, which increased 26% and 23% in constant currency. Results exceeded expectations and we delivered another quarter of double-digit top and bottom-line growth. Strong execution by our sales teams and partners drove share gains again this quarter across many of our businesses, as Satya referenced. In our commercial business, strong demand for our Microsoft cloud offerings, including AI services drove better-than-expected growth and large long-term Azure contracts. Microsoft 365 suite strength contributed to ARPU expansion for our office commercial business, while new business growth continued to be moderated for standalone products sold outside the Microsoft 365 suite. Commercial bookings were ahead of expectations and increased 17% and 9% in constant currency on a low expiry base. The strength in long-term Azure contracts mentioned earlier, along with strong execution across our core annuity sales motions, including healthy renewals drove our results. Commercial remaining performance obligation increased 17% and 16% in constant currency to $222 billion, roughly 45% will be recognized in revenue in the next 12 months, up 15% year-over-year...',
        speaker: 'Amy Hood'
      },
      '...'
    ]
  }
};

/**
 * Main serverless function handler.
 * @param {import('http').IncomingMessage & { query: Record<string, string | string[]> }} req
 * @param {import('http').ServerResponse} res
 */
export default function handler(req, res) {
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
  const normalizedTicker = typeof ticker === 'string' ? ticker.toUpperCase() : Array.isArray(ticker) ? ticker[0].toUpperCase() : '';

  if (!normalizedTicker) {
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
  const transcript = TRANSCRIPTS[normalizedTicker];

  if (!transcript) {
    return res.status(404).json({
      success: false,
      error: 'Transcript not found for ticker'
    });
  }

  return res.status(200).json({
    success: true,
    data: parsedBody
    data: transcript
  });
}
