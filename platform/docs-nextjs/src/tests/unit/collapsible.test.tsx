import { render, act } from '@testing-library/react';

import { mockLocation } from '../utils/mock-location';
import Collapsible from '@/components/collapsible';
import mockData from '@/tests/data/collapsible.test.json';
import expandedMockData from '@/tests/data/collapsible-expanded.test.json';
import type { CollapsibleNode } from '@/types/ast';

const typedMockData = mockData as CollapsibleNode;
const typedExpandedMockData = expandedMockData as CollapsibleNode;

describe('collapsible component', () => {
  it('renders all the content in the options and children', () => {
    const renderResult = render(
      <Collapsible nodeChildren={typedMockData.children} options={typedMockData.options}></Collapsible>,
    );
    expect(renderResult.asFragment()).toMatchSnapshot();
    expect(renderResult.getByText('This is a heading')).toBeTruthy();
    expect(renderResult.getByText('This is a subheading')).toBeTruthy();
    expect(renderResult.getByText('This is collapsible content')).toBeTruthy();
  });

  it('renders the content and correct icon when interacted', async () => {
    const renderResult = render(
      <Collapsible nodeChildren={typedMockData.children} options={typedMockData.options}></Collapsible>,
    );
    let button = renderResult.getByRole('button');
    const collapsedContent = renderResult.getByText('This is collapsible content');

    let icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Right');

    await act(async () => {
      button.click();
    });

    button = renderResult.getByRole('button');
    icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Down');
    expect(collapsedContent).toBeVisible();
  });

  it('opens the collapsible content if hash is found in the URL', async () => {
    mockLocation({ hash: '#this-is-a-heading' });
    const renderResult = render(
        <Collapsible nodeChildren={typedMockData.children} options={typedMockData.options}></Collapsible>,
      ),
      button = renderResult.getByRole('button'),
      icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Down');
  });

  it('is default expanded if expanded option is truthy', async () => {
    const renderResult = render(
        <Collapsible nodeChildren={typedExpandedMockData.children} options={typedExpandedMockData.options} />,
      ),
      button = renderResult.getByRole('button'),
      icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Down');
  });
});
