import { DefinitionListItem } from '@/mdx-components/DefinitionListItem';
import { DefinitionDescription } from '@/mdx-components/DefinitionDescription';
import { render } from '@testing-library/react';
import Literal from '@/components/literal';

it('DefinitionList renders correctly', () => {
  const tree = render(
    <dl>
      <DefinitionListItem>
        <dt>
          <Literal>MongoDefaultPartitioner</Literal>
        </dt>
        <DefinitionDescription>
          <strong>Default</strong>. Wraps the MongoSamplePartitioner and provides help for users of older versions of
          MongoDB.
        </DefinitionDescription>
      </DefinitionListItem>
    </dl>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
