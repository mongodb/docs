'use client';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { DRIVER_ICON_MAP } from '@/components/icons/DriverIconMap';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const optionStyle = ({ hideOption }: { hideOption: boolean }) => css`
  padding: 6px 12px;
  text-decoration: none;
  display: ${hideOption ? 'none' : 'flex'};
  align-items: center;
  min-height: 36px;
  border-radius: ${theme.size.small};
  border: 1px solid var(--wayfinding-border-color);
  color: var(--font-color-primary);
  background-color: var(--background-color-primary);
  font-size: ${theme.fontSize.small};
  line-height: 20px;

  :hover {
    border-color: ${palette.gray.base};
  }
`;

const imgStyle = css`
  margin-right: 12px;
`;

type DriverIconMapKey = keyof typeof DRIVER_ICON_MAP;

type WayfindingOptionProps = {
  id: string;
  href: string;
  title?: string;
  lang?: string;
  hideOption?: boolean;
};

export const WayfindingOption = ({ id, href, title, lang, hideOption = false }: WayfindingOptionProps) => {
  const Icon = DRIVER_ICON_MAP[id as DriverIconMapKey] || DRIVER_ICON_MAP[lang as DriverIconMapKey];

  return (
    <a
      className={cx(optionStyle({ hideOption }))}
      href={href}
      target={'_self'}
      onClick={() => {
        reportAnalytics('Click', {
          position: 'wayfinding option',
          label: id,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
    >
      {Icon && <Icon className={imgStyle} width={24} height={24} />}
      <span>{title}</span>
    </a>
  );
};
