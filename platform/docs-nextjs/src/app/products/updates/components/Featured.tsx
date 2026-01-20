'use client';
import { css, cx } from '@leafygreen-ui/emotion';
import { H3 } from '@leafygreen-ui/typography';
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import { Chip } from '@leafygreen-ui/chip';
import type { ProductUpdateEntry } from '../services/contentstack';
import { useRouter } from 'next/navigation';
import { theme } from '@/styles/theme';
import { normalizeDate } from '../utils/to-date';
import { generateProductUpdatesSlug } from '@/app/products/updates/utils/generate-product-updates-slug';
import { stripHtml } from '../utils/strip-html';

const featuredContainerStyle = css`
  max-width: 1440px;
  margin: 48px auto 0;
  padding: 0 24px;
  margin-bottom: 60px;

  @media ${theme.screenSize.mediumAndUp} {
    padding: 0 32px;
  }

  @media ${theme.screenSize.largeAndUp} {
    padding: 0 32px;
  }

  @media ${theme.screenSize['2XLargeAndUp']} {
    padding: 0 8px;
  }
`;

const featureHeaderStyle = css`
  color: #000;
`;

const featuredContentStyle = css`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 26px;

  @media ${theme.screenSize.mediumAndUp} {
    gap: 16px;
  }

  @media ${theme.screenSize.largeAndUp} {
    gap: 24px;
  }
`;

const featuredCardStyle = css`
  flex: 0 0 100%;
  min-width: 0;
  padding: 24px;
  min-height: 360px;

  @media ${theme.screenSize.mediumAndUp} {
    flex: 0 0 calc(50% - 8px);
    padding: 32px;
  }

  @media ${theme.screenSize.largeAndUp} {
    flex: 0 0 calc(33.333% - 16px);
    padding: 40px;
  }
`;

const dateStyle = css`
  font-size: 13px;
  line-height: 20px;
  color: var(--whats-new-gray-dark1);
  margin-bottom: 16px;
`;

const titleStyle = css`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
  color: var(--whats-new-black);
`;

const bodyStyle = css`
  font-size: 16px;
  line-height: 24px;
  color: var(--whats-new-black);
  margin-bottom: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const chipsStyle = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

const chipStyle = css`
  font-size: 16px;
  padding: 2px;
`;

const Featured = ({ updates: limitedFeaturedUpdates }: { updates: ProductUpdateEntry[] }) => {
  const router = useRouter();

  return (
    <div className={cx(featuredContainerStyle)}>
      <H3 className={cx(featureHeaderStyle)}>Featured Updates</H3>
      <div className={cx(featuredContentStyle)}>
        {limitedFeaturedUpdates.map((update: ProductUpdateEntry) => {
          const publishedAt = update.published_date;
          const date = normalizeDate(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const slug = generateProductUpdatesSlug(update.title);

          return (
            <Card
              key={update.uid}
              data-testid="featured-update"
              className={cx(featuredCardStyle)}
              onClick={() => router.push(`/products/updates/${slug}`)}
            >
              <Body className={cx(dateStyle)}>{date}</Body>
              <H3 className={cx(titleStyle)}>{update.title}</H3>
              {update.description && <div className={cx(bodyStyle)}>{stripHtml(update.description)}</div>}
              <div className={cx(chipsStyle)}>
                {/* Display all tags from the three tag fields */}
                {[
                  ...(update.tags_category || []),
                  ...(update.tags_offerings || []),
                  ...(update.tags_product || []),
                ].map((tag: string) => (
                  <Chip key={tag} label={tag} className={cx(chipStyle)} />
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
