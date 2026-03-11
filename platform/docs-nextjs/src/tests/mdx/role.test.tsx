import { render } from '@testing-library/react';

import { GUILabel } from '@/mdx-components/GUILabel';

describe('GUI Label', () => {
  it('correctly renders a "guilabel" role', () => {
    const tree = render(<GUILabel>Yes</GUILabel>);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
