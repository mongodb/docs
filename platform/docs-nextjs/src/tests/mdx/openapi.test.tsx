import { OpenAPI } from '@/mdx-components/OpenAPI';
import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';

interface DefaultSpec {
  openapi: string;
  info: {
    version: string;
    title: string;
  };
  paths: object;
}

jest.mock('@/mdx-components/OpenAPI/constants', () => ({
  DEFAULT_SPEC: {
    openapi: '3.0.0',
    info: {
      version: '1.0.5',
      title: 'Swagger Petstore',
    },
    paths: {},
  },
}));

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: () => ({ title: 'Atlas' }),
}));

jest.mock('redoc', () => {
  return {
    RedocStandalone: (props: { specUrl?: string; spec?: DefaultSpec }) => (
      <div>
        <span>Redoc Mock</span>
        <span>{props.specUrl}</span>
        <span>{props.spec?.info.title}</span>
      </div>
    ),
  };
});

describe('OpenAPI', () => {
  it('passes `src` param into the specUrl prop for the Redoc standalone component', () => {
    mockLocation({ search: '?src=https://raw.githubusercontent.com' });

    const wrapper = render(<OpenAPI />);

    expect(wrapper.getByText('https://raw.githubusercontent.com')).toBeTruthy();
  });
  it('renders the default spec', () => {
    const wrapper = render(<OpenAPI />);

    expect(wrapper.getByText('Swagger Petstore')).toBeTruthy();
  });
});
