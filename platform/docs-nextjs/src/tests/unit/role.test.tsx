import { render } from '@testing-library/react';

import { RoleAbbr, RoleGUILabel, RoleFile } from '@/components/roles/';
import type { ASTNode, TextNode } from '@/types/ast';

import mockDataGUILabel from '@/tests/data/role-guilabel.test.json';
import mockDataFile from '@/tests/data/role-file.test.json';
import mockDataAbbr from '@/tests/data/role-abbr.test.json';

describe('GUI Label', () => {
  it('correctly renders a "guilabel" role', () => {
    const tree = render(<RoleGUILabel nodeChildren={mockDataGUILabel.children as ASTNode[]} />);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});

describe('File', () => {
  it('correctly renders a "file" role', () => {
    const tree = render(<RoleFile nodeChildren={mockDataFile.children as ASTNode[]} />);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});

describe('Abbr', () => {
  it('correctly renders a "Abbr" role', () => {
    const abbr = render(<RoleAbbr nodeChildren={mockDataAbbr.children as [TextNode]} />);
    expect(abbr.asFragment()).toMatchSnapshot();
  });

  describe('when passed a value with format "ABBR (Full Name Here)"', () => {
    const mockValidAbbr = mockDataAbbr;
    mockValidAbbr.children[0].value = 'Display (Extended)';

    it('parses and strips whitespace from the display value', () => {
      const abbr = render(<RoleAbbr nodeChildren={mockValidAbbr.children as [TextNode]} />);
      expect(abbr.getByText('Display')).toBeTruthy();
    });
  });
});
