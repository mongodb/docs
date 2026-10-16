import { render, act } from '@testing-library/react';
import { Collapsible } from '@/mdx-components/Collapsible';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Code } from '@/mdx-components/Code';
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

  it('renders the heading around the trigger button', () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading" headingLevel={3}>
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const heading = renderResult.getByRole('heading', { level: 3 });
    const button = renderResult.getByRole('button', { name: /This is a heading/ });
    expect(heading).toContainElement(button);
    expect(button.querySelector('h1, h2, h3, h4, h5, h6, p, div')).toBeNull();
  });

  it('names the permalink after the heading', () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const link = renderResult.getByRole('link', { name: 'Permalink to This is a heading' });
    expect(link).toHaveAttribute('href', '#this-is-a-heading');
  });

  it('announces when the permalink is copied', async () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    expect(renderResult.getByRole('status')).toBeEmptyDOMElement();

    await act(async () => {
      renderResult.getByRole('link', { name: 'Permalink to This is a heading' }).click();
    });

    expect(renderResult.getByRole('status')).toHaveTextContent('Link copied');
  });

  it('expands the content when the trigger is pressed', async () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const button = renderResult.getByRole('button', { name: /This is a heading/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await act(async () => {
      button.click();
    });

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(renderResult.getByText('This is collapsible content')).toBeVisible();
  });

  it('opens the collapsible content if hash is found in the URL', async () => {
    mockLocation({ hash: '#this-is-a-heading' });
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading">
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const button = renderResult.getByRole('button', { name: /This is a heading/ });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('is default expanded if expanded option is truthy', async () => {
    const renderResult = render(
      <Collapsible heading="This is a heading" subHeading="This is a subheading" expanded={true}>
        <Paragraph>This is collapsible content</Paragraph>
      </Collapsible>,
    );
    const button = renderResult.getByRole('button', { name: /This is a heading/ });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
