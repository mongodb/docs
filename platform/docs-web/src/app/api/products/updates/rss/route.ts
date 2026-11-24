import { NextResponse, type NextRequest } from 'next/server';
import { getProductUpdates } from '@/app/products/updates/services/contentstack';
import { withCORS } from '@/app/lib/with-cors';
import { escapeXml, toRFC2822Date } from '@/utils/xml-utils';
import { generateProductUpdatesSlug } from '@/app/products/updates/utils/generate-product-updates-slug';
import { stripHtml } from '@/app/products/updates/utils/strip-html';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mongodb.com';
const blogUrl = `${baseUrl}/products/updates`;

// Utility function to filter entries by tags
// Uses OR logic within a category: entries must match ANY specified filter in the list
function filterByTags<T>({
  entries,
  filterList,
  getTagsFromEntry,
}: {
  entries: T[];
  filterList: string[] | undefined;
  getTagsFromEntry: (entry: T) => string[] | undefined;
}): T[] {
  if (!filterList || filterList.length === 0) return entries;

  return entries.filter((entry) => {
    const tags = getTagsFromEntry(entry);
    if (!tags) return false;
    // Check that any filter matches at least one tag (OR logic within category)
    return filterList.some((filter) => tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()));
  });
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  try {
    const { entries } = await getProductUpdates({ limit: 10000, skip: 0 });

    // Parse filter parameters
    const searchParams = request.nextUrl.searchParams;
    const categoryFilter = searchParams.get('category')?.split(',').filter(Boolean);
    const offeringsParam = searchParams.get('offerings') || searchParams.get('offering');
    const offeringsFilter = offeringsParam?.split(',').filter(Boolean);
    const productFilter = searchParams.get('product')?.split(',').filter(Boolean);

    // Filter entries based on parameters
    let filteredEntries = entries;

    filteredEntries = filterByTags({
      entries: filteredEntries,
      filterList: categoryFilter,
      getTagsFromEntry: (e) => e.tags_category,
    });
    filteredEntries = filterByTags({
      entries: filteredEntries,
      filterList: offeringsFilter,
      getTagsFromEntry: (e) => e.tags_offerings,
    });
    filteredEntries = filterByTags({
      entries: filteredEntries,
      filterList: productFilter,
      getTagsFromEntry: (e) => e.tags_product,
    });

    // Build RSS XML
    const currentUrl = new URL(request.url);
    const feedUrl = `${baseUrl}/products/updates/rss${currentUrl.search}`;

    // Update feed title and description based on filters
    const baseTitle = 'MongoDB Product Updates';
    const filterDescriptions = [];
    if (categoryFilter && categoryFilter.length > 0) {
      filterDescriptions.push(`Categories: ${categoryFilter.join(' or ')}`);
    }
    if (offeringsFilter && offeringsFilter.length > 0) {
      filterDescriptions.push(`Offerings: ${offeringsFilter.join(' or ')}`);
    }
    if (productFilter && productFilter.length > 0) {
      filterDescriptions.push(`Products: ${productFilter.join(' or ')}`);
    }

    const feedTitle = filterDescriptions.length > 0 ? `${baseTitle} - ${filterDescriptions.join(', ')}` : baseTitle;

    const feedDescription =
      filterDescriptions.length > 0
        ? `Latest updates and features from MongoDB (filtered by: ${filterDescriptions.join(', ')})`
        : 'Latest updates and features from MongoDB';

    const itemsXml = filteredEntries
      .map((entry) => {
        const slug = generateProductUpdatesSlug(entry.title);

        const itemUrl = `${blogUrl}/${slug}`;
        const pubDate = toRFC2822Date(entry.published_date);
        const descriptionText = entry.description ? stripHtml(entry.description) : entry.title;
        const description = escapeXml(descriptionText);

        return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(itemUrl)}</link>
      <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${
        entry.tags_category
          ? entry.tags_category.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')
          : ''
      }
      ${
        entry.tags_offerings
          ? entry.tags_offerings.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')
          : ''
      }
      ${
        entry.tags_product
          ? entry.tags_product.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')
          : ''
      }
    </item>`;
      })
      .join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(
      feedUrl,
    )}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${itemsXml}
  </channel>
</rss>`;

    const response = new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        // Always invalidate cache - no caching at any level
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });

    return withCORS(response);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return withCORS(
      NextResponse.json(
        {
          error: 'Failed to generate RSS feed',
        },
        { status: 500 },
      ),
    );
  }
}
