'use client';
import type { ProductUpdateEntry } from '../services/contentstack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { Body, H3 } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import Card from '@leafygreen-ui/card';
import { normalizeDate } from '../utils/to-date';

const containerStyle = css`
  width: 100vw;
  padding: 64px;
`;

const contentStyle = css`
  max-width: 968px;
  margin: 0 auto;
`;

const headerStyle = css`
  margin-bottom: 40px;
`;

const linkTextStyle = css`
  margin-left: 4px;
  color: ${palette.blue.base};
`;

const linkStyle = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
`;

const dateStyle = css`
  font-size: 13px;
  line-height: 20px;
  color: ${palette.gray.dark1};
  margin-bottom: 24px;

  @media ${theme.screenSize.largeAndUp} {
    font-size: 16px;
    line-height: 28px;
  }
`;

const titleStyle = css`
  line-height: 40px;
  margin-bottom: 12px;
  font-weight: 400;
  color: ${palette.black};
  font-family: 'MongoDB Value Serif';

  @media ${theme.screenSize.largeAndUp} {
    font-size: 48px;
    line-height: 64px;
  }
`;

const bodyStyle = css`
  font-size: 16px;
  line-height: 28px;
  color: ${palette.black};
  margin-bottom: 40px;
  white-space: pre-line;

  p {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${palette.blue.base};
    text-decoration: none;
    text-underline-offset: 2px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const relatedContentTitleStyle = css`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 24px;
  color: ${palette.black};
  font-weight: 500;
`;

const relatedContentGridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media ${theme.screenSize.xLargeAndUp} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const relatedContentCardStyle = css`
  display: flex;
  flex-direction: column;
  padding: 24px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  max-width: 472px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const linkLabelStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
  padding: 0 6px;
  width: fit-content;
  border-radius: 6px;
`;

const linkLabelTextStyle = css`
  font-size: 12px;
  line-height: 22px;
  font-weight: 400;
`;

const cardTitleStyle = css`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: ${palette.black};
  margin: 0;
`;

const linkLabelDocsStyle = css`
  background-color: ${palette.blue.light2};
`;

const linkLabelDocsTextStyle = css`
  color: ${palette.blue.dark2};
`;

const linkLabelBlogStyle = css`
  background-color: ${palette.green.light2};
`;

const linkLabelBlogTextStyle = css`
  color: ${palette.green.dark3};
`;

const ProductUpdateDetail = ({ update }: { update: ProductUpdateEntry }) => {
  const router = useRouter();

  const publishedAt = update.published_date;
  const date = normalizeDate(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getLabel = (label: string) => {
    switch (label) {
      case 'Docs':
        return (
          <div className={cx(linkLabelStyle, linkLabelDocsStyle)}>
            <Icon glyph="Note" color={palette.blue.dark2} />
            <Body className={cx(linkLabelTextStyle, linkLabelDocsTextStyle)}>{label}</Body>
          </div>
        );
      case 'Blog':
        return (
          <div className={cx(linkLabelStyle, linkLabelBlogStyle)}>
            <Icon glyph="SMS" color={palette.green.dark2} />
            <Body className={cx(linkLabelTextStyle, linkLabelBlogTextStyle)}>{label}</Body>
          </div>
        );
      default:
        return (
          <div className={cx(linkLabelStyle, linkLabelDocsStyle)}>
            <Body className={cx(linkLabelTextStyle, linkLabelDocsTextStyle)}>{label}</Body>
          </div>
        );
    }
  };

  return (
    <div className={cx(containerStyle)}>
      <div className={cx(contentStyle)}>
        <div className={cx(headerStyle)}>
          <Link href="/products/updates" className={cx(linkStyle)}>
            <Icon glyph="ArrowLeft" className={cx(linkTextStyle)} />
            <Body className={cx(linkTextStyle)}>See all updates</Body>
          </Link>
        </div>

        <div>
          <H3 className={cx(titleStyle)}>{update.title}</H3>
          <Body className={cx(dateStyle)}>{date}</Body>
        </div>

        {update.description && (
          <div className={cx(bodyStyle)} dangerouslySetInnerHTML={{ __html: update.description }} />
        )}
        {update.link_with_label && update.link_with_label.length > 0 && (
          <>
            <H3 className={cx(relatedContentTitleStyle)}>Related Content</H3>
            <div className={cx(relatedContentGridStyle)}>
              {update.link_with_label.map((link) => {
                const label = link.label;
                return (
                  <Card
                    key={link.link.href}
                    className={cx(relatedContentCardStyle)}
                    onClick={() => router.push(link.link.href)}
                  >
                    {getLabel(label)}

                    <Body className={cx(cardTitleStyle)}>{link.link.title}</Body>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductUpdateDetail;
