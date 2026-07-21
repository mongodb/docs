import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Wayfinding, MAX_INIT_OPTIONS } from '@/mdx-components/Wayfinding/Wayfinding';
import { WayfindingOption } from '@/mdx-components/Wayfinding/WayfindingOption';
import { theme } from '@/styles/theme';

jest.mock('@/utils/report-analytics', () => ({
  reportAnalytics: jest.fn(),
}));

jest.mock('@/utils/current-scroll-position', () => ({
  currentScrollPosition: jest.fn(() => 0),
}));

const mountWayfinding = (ui: React.ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Wayfinding MDX component', () => {
  it('renders correctly', () => {
    const tree = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        <WayfindingOption id="nodejs" title="Node.js" href="https://example.com/node" />
        <WayfindingOption id="python" title="Python" href="https://example.com/python" />
      </Wayfinding>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders title and description', () => {
    const { getByText } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        <WayfindingOption id="nodejs" title="Node.js" href="https://example.com/node" />
      </Wayfinding>,
    );
    expect(getByText('MongoDB with drivers')).toBeTruthy();
    expect(getByText('Choose your driver:')).toBeTruthy();
  });

  it('renders WayfindingOption with formatted driver title', () => {
    const { getByText } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        <WayfindingOption id="nodejs" title="Node.js" href="https://example.com/node" />
      </Wayfinding>,
    );
    expect(getByText('Node.js')).toBeTruthy();
  });

  it(`shows only the first ${MAX_INIT_OPTIONS} options initially`, () => {
    const options = ['nodejs', 'python', 'java-sync', 'csharp', 'go', 'php'];
    const { getAllByRole } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        {options.map((id) => (
          <WayfindingOption key={id} id={id} title={id} href={`https://example.com/${id}`} />
        ))}
      </Wayfinding>,
    );
    const visibleLinks = getAllByRole('link').filter((el) => (el as HTMLElement).style.display !== 'none');
    expect(visibleLinks).toHaveLength(MAX_INIT_OPTIONS);
  });

  it('shows "Show all" button when options exceed MAX_INIT_OPTIONS', () => {
    const options = ['nodejs', 'python', 'java-sync', 'csharp', 'go', 'php'];
    const { getByText } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        {options.map((id) => (
          <WayfindingOption key={id} id={id} title={id} href={`https://example.com/${id}`} />
        ))}
      </Wayfinding>,
    );
    expect(getByText('Show all')).toBeTruthy();
  });

  it('does not show "Show all" button when options are <= MAX_INIT_OPTIONS', () => {
    const { queryByText } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        <WayfindingOption id="nodejs" title="Node.js" href="https://example.com/node" />
        <WayfindingOption id="python" title="Python" href="https://example.com/python" />
      </Wayfinding>,
    );
    expect(queryByText('Show all')).toBeNull();
  });

  it('shows all options when "Show all" is clicked', () => {
    const options = ['nodejs', 'python', 'java-sync', 'csharp', 'go', 'php'];
    const { getByText, getAllByRole } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        {options.map((id) => (
          <WayfindingOption key={id} id={id} title={id} href={`https://example.com/${id}`} />
        ))}
      </Wayfinding>,
    );
    fireEvent.click(getByText('Show all'));
    expect(getByText('Collapse')).toBeTruthy();
    expect(getAllByRole('link')).toHaveLength(options.length);
  });

  it('collapses options and only shows 4 options when "Collapse" is clicked', () => {
    const options = ['nodejs', 'python', 'java-sync', 'csharp', 'go', 'php'];
    const { getByText, getAllByRole } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        {options.map((id) => (
          <WayfindingOption key={id} id={id} title={id} href={`https://example.com/${id}`} />
        ))}
      </Wayfinding>,
    );
    fireEvent.click(getByText('Show all'));
    fireEvent.click(getByText('Collapse'));
    const visibleLinks = getAllByRole('link').filter((el) => (el as HTMLElement).style.display !== 'none');
    expect(visibleLinks).toHaveLength(MAX_INIT_OPTIONS);
  });

  it('renders WayfindingOption as a link with correct href', () => {
    const { getByRole } = mountWayfinding(
      <Wayfinding title="MongoDB with drivers" description="Choose your driver:">
        <WayfindingOption id="nodejs" title="Node.js" href="https://example.com/node" />
      </Wayfinding>,
    );
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/node');
  });
});
