import { Version, VersionArgument } from '@/mdx-components/Version';
import { render } from '@testing-library/react';

it('versionadded component renders correctly', () => {
  const tree = render(
    <Version changeType="versionadded" version="1.0.0" endPunctuation=":">
      This is a new version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('versionchanged component renders correctly', () => {
  const tree = render(
    <Version changeType="versionchanged" version="2.0.0" endPunctuation=":">
      This is a changed version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('deprecated component renders correctly', () => {
  const tree = render(
    <Version changeType="deprecated" version="3.0.0" endPunctuation=":">
      This is a deprecated version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('ends with a period when no endPunctuation is passed', () => {
  const tree = render(<Version changeType="versionadded" version="4.0.0" />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders argument text inside the label, keeping its markup', () => {
  const tree = render(
    <Version changeType="versionadded" version="7.2" endPunctuation=":">
      <VersionArgument>
        (<em>Also available in 7.0.5</em>)
      </VersionArgument>
      This is a new version.
    </Version>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
