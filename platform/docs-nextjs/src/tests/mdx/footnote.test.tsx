import { render, screen } from '@testing-library/react';
import { FootnoteProvider } from '@/context/footnote-context';
import { Footnote } from '@/mdx-components/footnote/Footnote';
import { FootnoteReference } from '@/mdx-components/footnote/FootnoteReference';

const Wrapper = ({ children }: { children: React.ReactNode }) => <FootnoteProvider>{children}</FootnoteProvider>;

describe('FootnoteReference', () => {
  it('renders a numbered link', () => {
    render(
      <Wrapper>
        <FootnoteReference />
      </Wrapper>,
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.textContent).toMatch(/\[\d+\]/);
  });

  it('renders correctly (snapshot)', () => {
    const tree = render(
      <Wrapper>
        <FootnoteReference />
      </Wrapper>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });
});

describe('Footnote', () => {
  it('renders footnote content with a label', () => {
    render(
      <Wrapper>
        <FootnoteReference />
        <Footnote>This is a footnote.</Footnote>
      </Wrapper>,
    );
    expect(screen.getByText('This is a footnote.')).toBeInTheDocument();
  });

  it('renders a table with label and content cells', () => {
    const { container } = render(
      <Wrapper>
        <FootnoteReference />
        <Footnote>MongoDB supports Oracle Linux.</Footnote>
      </Wrapper>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
    const tds = container.querySelectorAll('td');
    expect(tds.length).toBe(2);
    expect(tds[1]).toHaveTextContent('MongoDB supports Oracle Linux.');
  });

  it('renders correctly (snapshot)', () => {
    const tree = render(
      <Wrapper>
        <FootnoteReference />
        <Footnote>MongoDB only supports Oracle Linux running the Red Hat Compatible Kernel.</Footnote>
      </Wrapper>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });
});

describe('Multiple footnotes', () => {
  it('assigns sequential labels to multiple references and footnotes', () => {
    const { container } = render(
      <Wrapper>
        <p>
          Oracle Linux <FootnoteReference />, Rocky Linux <FootnoteReference />
        </p>
        <Footnote>First footnote content.</Footnote>
        <Footnote>Second footnote content.</Footnote>
      </Wrapper>,
    );
    const links = container.querySelectorAll('a.footnote-reference');
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe('[1]');
    expect(links[1].textContent).toBe('[2]');

    expect(screen.getByText('First footnote content.')).toBeInTheDocument();
    expect(screen.getByText('Second footnote content.')).toBeInTheDocument();
  });

  it('renders correctly (snapshot)', () => {
    const tree = render(
      <Wrapper>
        <p>
          Oracle Linux <FootnoteReference />, Rocky Linux <FootnoteReference />
        </p>
        <Footnote>First footnote.</Footnote>
        <Footnote>Second footnote.</Footnote>
      </Wrapper>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
