'use client';
import React, { Children, isValidElement, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import { Icon } from '@leafygreen-ui/icon';
import { theme } from '@/styles/theme';
import { NOTRANSLATE_CLASS } from '@/utils/locale';

export const MAX_INIT_OPTIONS = 4;

const containerStyle = css`
  width: 100%;
  border-radius: ${theme.size.medium};
  border: 1px solid var(--wayfinding-border-color);
  background-color: var(--wayfinding-bg-color);
  padding: ${theme.size.medium} ${theme.size.large};
`;

const titleStyle = css`
  margin-bottom: 2px;
  font-weight: 600;
  color: var(--font-color-primary);
`;

// Style attempts to overwrite child nodes to get them to conform to wayfinding styling
const descriptionStyle = css`
  * {
    font-size: ${theme.fontSize.small} !important;
    line-height: 20px !important;
  }

  *:last-child {
    margin-bottom: 0 !important;
  }
`;

const optionsContainerStyle = css`
  margin: ${theme.size.default} 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(133px, 1fr));
  gap: 6px ${theme.size.small};

  @media ${theme.screenSize.mediumAndUp} {
    grid-template-columns: repeat(auto-fill, 164px);
  }
`;

const showAllButtonStyle = css`
  background-color: inherit;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${theme.size.small};
  color: var(--link-color-primary);
  font-size: ${theme.fontSize.small};
  line-height: 20px;
  font-weight: 500;
`;

type WayfindingProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const Wayfinding = ({ title, description, children }: WayfindingProps) => {
  const [showAll, setShowAll] = useState(false);
  const optionChildren = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);

  const { showButtonText, showButtonGlyph } = showAll
    ? {
        showButtonText: 'Collapse',
        showButtonGlyph: 'ChevronUp',
      }
    : {
        showButtonText: 'Show all',
        showButtonGlyph: 'ChevronDown',
      };

  return (
    <div className={cx(containerStyle)}>
      <Body className={cx(titleStyle)}>{title}</Body>
      <div className={cx(descriptionStyle)}>{description}</div>
      <div className={cx(optionsContainerStyle, NOTRANSLATE_CLASS)}>
        {optionChildren.map((child, index) => {
          const hideOption = !showAll && index > MAX_INIT_OPTIONS - 1;
          return React.cloneElement(child as ReactElement<{ hideOption?: boolean }>, {
            hideOption,
            key: child.key ?? index,
          });
        })}
      </div>
      {optionChildren.length > MAX_INIT_OPTIONS && (
        <button className={cx(showAllButtonStyle)} onClick={() => setShowAll((prev) => !prev)}>
          {showButtonText}
          <Icon glyph={showButtonGlyph} />
        </button>
      )}
    </div>
  );
};
