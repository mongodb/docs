import { render, act } from '@testing-library/react';
import { Collapsible } from '@/mdx-components/Collapsible';
import { Paragraph } from '@/mdx-components/Paragraph';
import Code from '@/components/code';
import { mockLocation } from '../utils/mock-location';

jest.mock('github-slugger', () => {
  return jest.fn().mockImplementation(() => ({
    slug: (val: string) => val.toLowerCase().replace(/\s+/g, '-'),
  }));
});

describe('collapsible component', () => {
  it('renders all the content in the options and children', () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
        <Code
          type="code"
          lang="javascript"
          copyable={true}
          emphasize_lines={[]}
          value="This is code within collapsible content"
          linenos={false}
        />
      </Collapsible>,
    );
    expect(renderResult.asFragment()).toMatchSnapshot();
    expect(renderResult.getByText('This is a heading')).toBeTruthy();
    expect(renderResult.getByText('This is a subheading')).toBeTruthy();
    expect(renderResult.getByText('This is collapsible content')).toBeTruthy();
  });

  it('renders the content and correct icon when interacted', async () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
        <Code
          type="code"
          lang="javascript"
          copyable={true}
          emphasize_lines={[]}
          value="This is code within collapsible content"
          linenos={false}
        />
      </Collapsible>,
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
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const button = renderResult.getByRole('button');
    const icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Down');
  });

  it('is default expanded if expanded option is truthy', async () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading" expanded={true}>
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const button = renderResult.getByRole('button');
    const icon = button.querySelector('[role=img]');
    expect(icon?.getAttribute('aria-label')).toContain('Chevron');
    expect(icon?.getAttribute('aria-label')).toContain('Down');
  });
});
