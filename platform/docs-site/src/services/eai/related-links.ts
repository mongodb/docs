import type { Environments } from '@/utils/env-config';

const env = process.env.NEXT_PUBLIC_ENV as Environments;

const EAI_SERVER_BASE_URL = ['dotcomprd', 'production'].includes(env)
  ? 'https://knowledge.mongodb.com/api/v1'
  : 'https://knowledge-dev.mongodb.com/api/v1';

export type RelatedLink = {
  title: string;
  url: string;
  score: number;
  confidence: 'high' | 'medium';
};

type RelatedLinksResponse = {
  inputUrl: string;
  normalizedUrl: string;
  inputStatus: 'found' | 'not_found';
  results: RelatedLink[];
};

/**
 * Calls the EAI `related-links` endpoint for a 404'd docs URL, client-side.
 * An empty array is a normal, successful "no suggestion" response
 * (the endpoint abstains rather than guess), same as any fetch/network
 * failure -- the 404 page must render fine either way.
 */
export const getRelatedLinks = async (url: string): Promise<RelatedLink[]> => {
  try {
    const response = await fetch(`${EAI_SERVER_BASE_URL}/content/related-links`, {
      method: 'POST',
      // The EAI server's firewall requires an Origin or X-Request-Origin
      // header (any value) to identify the caller -- see the
      // CustomHeaderAuth security scheme in mongodb/ai-assistant's
      // docs/docs/server/openapi.yaml.
      headers: { 'Content-Type': 'application/json', 'X-Request-Origin': 'docs-404' },
      body: JSON.stringify({ url, sourceType: ['tech-docs'] }),
    });

    if (!response.ok) {
      console.warn('related-links request failed', { status: response.status, url });
      return [];
    }

    const data = (await response.json()) as RelatedLinksResponse;
    return data.results ?? [];
  } catch (error) {
    console.warn('related-links request errored', { error: String(error), url });
    return [];
  }
};
