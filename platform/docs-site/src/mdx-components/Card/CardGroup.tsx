'use client';

import { Children, type ReactNode, type CSSProperties } from 'react';
import { clsx } from 'clsx';
import type { CardGroupNode } from '@/types/ast';
import { usePageContext } from '@/context/page-context';
import { CardGroupContextProvider } from './card-group-context';
import styles from './card-group.module.scss';

const getColumnValue = (props: { columns?: number; children?: ReactNode }) =>
  props.columns || Children.count(props.children);

export type CardGroupProps = {
  children: React.ReactNode;
  className?: string;
  columns: CardGroupNode['options']['columns'];
  layout: CardGroupNode['options']['layout'];
  style: CardGroupNode['options']['style'];
  type: CardGroupNode['options']['type'];
};

const CardGroup = ({ children, className, columns, layout, style, type }: CardGroupProps) => {
  const { template } = usePageContext();
  const isCompact = style === 'compact';
  const isExtraCompact = style === 'extra-compact';
  const isCarousel = layout === 'carousel';
  // Keep "type" for backwards compatibility, but it might be good to generalize to "style"
  const isCenterContentStyle = type === 'drivers' || style === 'center-content';
  const isLargeIconStyle = style === 'large-icon';
  const isDriversTemplate = template === 'drivers-index';
  const isLanding = template === 'landing';

  const columnValue = getColumnValue({ columns, children });

  const gridStyle: CSSProperties & Record<'--cg-columns' | '--cg-carousel-count', number> = {
    '--cg-columns': columnValue,
    '--cg-carousel-count': Children.count(children),
  };

  return (
    <CardGroupContextProvider
      isCompact={isCompact}
      isExtraCompact={isExtraCompact}
      isCenterContentStyle={isCenterContentStyle}
      isLargeIconStyle={isLargeIconStyle}
    >
      <div
        className={clsx('card-group', styles.grid, className)}
        style={gridStyle}
        data-drivers={isDriversTemplate || undefined}
        data-landing={isLanding || undefined}
        data-columns={isLanding ? columns : undefined}
        data-carousel={isCarousel || undefined}
      >
        {children}
      </div>
    </CardGroupContextProvider>
  );
};

export default CardGroup;
