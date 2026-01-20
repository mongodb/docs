import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import envConfig from '@/utils/env-config';
import { generateProductUpdatesSlug } from '@/app/products/updates/utils/generate-product-updates-slug';

interface ContentstackWebhookPayload {
  module: string;
  api_key: string;
  event: string;
  bulk: boolean;
  data: {
    locale: string;
    status: string;
    action: string;
    entry: {
      uid: string;
      locale: string;
      title: string;
      description: string | null;
      tags: string[];
      tags_category: string[];
      tags_offerings: string[];
      tags_product: string[];
      is_featured: boolean;
      link_with_label: Array<{ url: string; label: string }>;
      beamer_created_at: string | null;
      published_date: string;
      created_at: string;
      updated_at: string;
      aha_feature_link: string | null;
    };
    content_type: {
      uid: string;
      title: string;
    };
    environment: {
      name: string;
      api_key: string;
    };
  };
  triggered_at: string;
}

function getProductionUrl(title: string): string {
  const slug = generateProductUpdatesSlug(title);
  return `https://www.mongodb.com/products/updates/${slug}`;
}

/**
 * Extracts the Aha domain and feature ID from an Aha feature URL.
 * Expected format: https://{domain}.aha.io/features/{feature_id}
 */
function parseAhaFeatureUrl(url: string): { domain: string; featureId: string } | null {
  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch {
    // new URL() throws TypeError for invalid URLs
    console.warn('Invalid Aha feature URL format:', url);
    return null;
  }

  const match = urlObj.pathname.match(/^\/features\/(.+)$/);

  if (!match) {
    console.warn('Invalid Aha feature URL format:', url);
    return null;
  }

  // Extract domain from hostname (e.g., "mongodb.aha.io" -> "mongodb")
  const hostnameParts = urlObj.hostname.split('.');
  if (hostnameParts.length < 3 || !hostnameParts[1].includes('aha')) {
    console.warn('Invalid Aha feature URL format:', url);
    return null;
  }

  const domain = hostnameParts[0];
  const featureId = match[1];

  return { domain, featureId };
}

async function updateAhaFeatureWhatsNewPost(domain: string, featureId: string, whatsNewPostUrl: string): Promise<void> {
  const apiKey = envConfig.AHA_API_KEY;

  if (!apiKey) {
    throw new Error('AHA_API_KEY is not set in environment variables');
  }

  const apiUrl = `https://${domain}.aha.io/api/v1/features/${featureId}`;

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      feature: {
        custom_fields: {
          whats_new_post_url: whatsNewPostUrl,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Aha API request failed: ${response.status} ${response.statusText}. ${errorText}`);
  }

  const responseBody = await response.json();

  // Verify the update was successful by checking the response
  if (!responseBody.feature) {
    throw new Error('Aha API response missing feature data');
  }
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  try {
    // Get request body
    let body: ContentstackWebhookPayload;
    try {
      body = await request.json();
    } catch {
      return withCORS(NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 }));
    }

    // Only process product_update entries
    if (body.data.content_type.uid !== 'product_update') {
      return withCORS(NextResponse.json({ success: true, message: 'Ignored: not a product_update entry' }));
    }

    // Only process publish events
    if (body.event !== 'publish') {
      return withCORS(NextResponse.json({ success: true, message: `Ignored: event type ${body.event}` }));
    }

    const { entry } = body.data;

    // Generate the production URL for this entry
    const productionUrl = getProductionUrl(entry.title);

    const ahaFeatureUrl = body.data.entry.aha_feature_link;

    if (!ahaFeatureUrl) {
      return withCORS(NextResponse.json({ success: true, message: 'No Aha feature URL found' }));
    }

    // Parse the Aha feature URL to extract domain and feature ID
    const parsedUrl = parseAhaFeatureUrl(ahaFeatureUrl);

    if (!parsedUrl) {
      console.error('Invalid Aha feature URL format:', ahaFeatureUrl);
      return withCORS(
        NextResponse.json(
          {
            error: 'Invalid Aha feature URL format',
            url: ahaFeatureUrl,
          },
          { status: 400 },
        ),
      );
    }

    // Update the Aha feature with the production URL
    try {
      await updateAhaFeatureWhatsNewPost(parsedUrl.domain, parsedUrl.featureId, productionUrl);
    } catch (err) {
      console.error('Failed to update Aha feature:', err);
      return withCORS(
        NextResponse.json(
          {
            error: 'Failed to update Aha feature',
            details: err instanceof Error ? err.message : String(err),
          },
          { status: 500 },
        ),
      );
    }

    return withCORS(NextResponse.json({ success: true, message: 'Webhook received and processed' }));
  } catch (err) {
    console.error('Error processing webhook:', err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
