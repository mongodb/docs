import VersionModified from '@/components/version-modified';
import { render } from '@testing-library/react';
import type { Directive } from '@/types/ast';

import { deprecated, versionadded, versionchanged } from '../data/version-modified.test.json';

const shallowRender = (data: Directive) =>
  render(<VersionModified argument={data.argument} nodeChildren={data.children} name={data.name} />);

describe('when rendering a deprecated directive with 0 arguments', () => {
  let wrapper;

  it('renders correctly ', () => {
    wrapper = shallowRender(deprecated as Directive);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe('when rendering a versionadded directive with one argument', () => {
  let wrapper;

  it('renders correctly ', () => {
    wrapper = shallowRender(versionadded as Directive);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe('when rendering a versionchanged directive with two arguments', () => {
  let wrapper;

  it('renders correctly ', () => {
    wrapper = shallowRender(versionchanged as Directive);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
