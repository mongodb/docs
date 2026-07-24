import { render } from '@testing-library/react';
import { Field } from '@/mdx-components/Field';
import { FieldList } from '@/mdx-components/FieldList';
import { getPlaintext } from '@/utils/get-plaintext';
import type { FieldListNode } from '@/types/ast';

import mockData from '../data/field-list.test.json';
const typedMockData = mockData as FieldListNode;

it('Field renders correctly', () => {
  const fieldNode = typedMockData.children[0];
  const content = getPlaintext(fieldNode.children);
  const tree = render(
    <table>
      <tbody>
        <Field label={fieldNode.label} name={fieldNode.name}>
          {content}
        </Field>
      </tbody>
    </table>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('FieldList renders correctly', () => {
  const tree = render(
    <FieldList>
      {typedMockData.children.map((fieldNode, index) => (
        <Field key={index} label={fieldNode.label} name={fieldNode.name}>
          {getPlaintext(fieldNode.children)}
        </Field>
      ))}
    </FieldList>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
