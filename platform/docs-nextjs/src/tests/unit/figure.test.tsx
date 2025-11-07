import { render } from '@testing-library/react';
import Figure from '@/components/figure';
import type { FigureNode } from '@/types/ast';

import { withMockImageContext } from '../utils/mock-image-context';

import mockData from '../data/figure.test.json';
import borderData from '../data/figure-border.test.json';
import lightboxData from '../data/figure-lightbox.test.json';

const typedMockData = mockData as FigureNode;
const typedBorderData = borderData as FigureNode;
const typedLightboxData = lightboxData as FigureNode;

it('renders correctly', () => {
  const checksum = typedMockData.options?.checksum ?? '';
  const Wrapper = withMockImageContext({
    [checksum]: { key: checksum, data: '/mock/figure-image.jpg' },
  });

  const tree = render(
    <Figure
      nodeChildren={typedMockData.children}
      argument={typedMockData.argument}
      options={typedMockData.options}
      name={typedMockData.name}
    />,
    { wrapper: Wrapper },
  );

  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders border correctly when specified as an option', () => {
  const checksum = typedBorderData.options?.checksum ?? '';
  const Wrapper = withMockImageContext({
    [checksum]: { key: checksum, data: '/mock/border-image.jpg' },
  });

  const tree = render(
    <Figure
      nodeChildren={typedBorderData.children}
      argument={typedBorderData.argument}
      options={typedBorderData.options}
      name={typedBorderData.name}
    />,
    { wrapper: Wrapper },
  );

  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders lightbox correctly when specified as an option', () => {
  const checksum = typedLightboxData.options?.checksum ?? '';
  const Wrapper = withMockImageContext({
    [checksum]: { key: checksum, data: '/mock/lightbox-image.jpg' },
  });

  const tree = render(
    <Figure
      nodeChildren={typedLightboxData.children}
      argument={typedLightboxData.argument}
      options={typedLightboxData.options}
      name={typedLightboxData.name}
    />,
    { wrapper: Wrapper },
  );

  expect(tree.asFragment()).toMatchSnapshot();
});
