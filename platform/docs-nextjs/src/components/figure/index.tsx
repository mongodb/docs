'use client';

import Image from '@/components/image';
import { css, cx } from '@leafygreen-ui/emotion';
import { useState } from 'react';
import { theme } from '@/styles/theme';
import type { FigureNode } from '@/types/ast';

import CaptionLegend from './caption-legend';
import Lightbox from './lightbox';

export type FigureProps = {
  nodeChildren: FigureNode['children'];
  argument: FigureNode['argument'];
  options: FigureNode['options'];
  name: FigureNode['name'];
};

const Figure = ({ argument, options, name, nodeChildren, ...rest }: FigureProps) => {
  const figWidth = parseInt(options?.figwidth || '0', 10);
  const imgWidth = parseInt(options?.width || '0', 10);

  const [isLightboxSize] = useState(figWidth && figWidth / imgWidth < 0.9);

  if (isLightboxSize || (options && options.lightbox)) {
    return <Lightbox argument={argument} name={name} nodeChildren={nodeChildren} options={options} {...rest} />;
  }

  return (
    <div
      className={cx(
        'figure',
        css`
          max-width: 100%;
          margin-top: ${theme.size.medium};
          margin-bottom: ${theme.size.medium};
        `,
      )}
      style={{ width: figWidth || 'auto' }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is handled via options.alt */}
      <Image argument={argument} options={options} {...rest} />
      <CaptionLegend nodeChildren={nodeChildren} {...rest} />
    </div>
  );
};

export default Figure;
