import { Version } from '@/mdx-components/Version';
import { render } from '@testing-library/react';

it('versionadded component renders correctly', () => {
  const tree = render(
    <Version changeType="versionadded" version="1.0.0">
      This is a new version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('versionchanged component renders correctly', () => {
  const tree = render(
    <Version changeType="versionchanged" version="2.0.0">
      This is a changed version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('deprecated component renders correctly', () => {
  const tree = render(
    <Version changeType="deprecated" version="3.0.0">
      This is a deprecated version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
