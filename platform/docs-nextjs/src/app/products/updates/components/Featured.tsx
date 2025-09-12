'use client';
import { css, cx } from '@leafygreen-ui/emotion';
import { H3 } from '@leafygreen-ui/typography';
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import { palette } from '@leafygreen-ui/palette';
import { Chip } from '@leafygreen-ui/chip';
import type { ProductUpdateEntry } from '../services/contentstack';
import { useRouter } from 'next/navigation';
import { theme } from '@/styles/theme';

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
  color: ${palette.gray.dark2};
  margin-bottom: 16px;
`;

const titleStyle = css`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
  color: ${palette.black};
`;

const bodyStyle = css`
  font-size: 16px;
  line-height: 24px;
  color: ${palette.black};
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

const Featured = ({ updates }: { updates: ProductUpdateEntry[] }) => {
  const router = useRouter();

  // Filter and limit to 3 most recent featured updates
  const limitedFeaturedUpdates = updates
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(0, 3);

  return (
    <div className={cx(featuredContainerStyle)}>
      <H3>Featured Updates</H3>
      <div className={cx(featuredContentStyle)}>
        {limitedFeaturedUpdates.map((update: ProductUpdateEntry) => {
          const createdAt = update.beamer_created_at || update.created_at;
          const date = new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const slug = update.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          return (
            <Card
              key={update.uid}
              className={cx(featuredCardStyle)}
              onClick={() => router.push(`/products/updates/${slug}`)}
            >
              <Body className={cx(dateStyle)}>{date}</Body>
              <H3 className={cx(titleStyle)}>{update.title}</H3>
              <Body className={cx(bodyStyle)}>{update.multi_line}</Body>
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
