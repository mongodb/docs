import { render } from '@testing-library/react';

import { GUILabel } from '@/mdx-components/GUILabel';
import { Highlight } from '@/mdx-components/Highlight';

describe('GUI Label', () => {
  it('correctly renders a "guilabel" role', () => {
    const tree = render(<GUILabel>Yes</GUILabel>);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});

describe('Highlight', () => {
  it('correctly renders a "highlight-blue" role', () => {
    const tree = render(<Highlight color="blue">I am so blue</Highlight>);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
