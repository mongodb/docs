import OpenAPI from '@/components/openapi';
import type { TextNode } from '@/types/ast';
import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';

const mockSpecJson = {
  openapi: '3.0.0',
  info: {
    version: '1.0.5',
    title: 'Swagger Petstore',
  },
  paths: {},
};

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: () => ({ title: 'Atlas' }),
}));

jest.mock('redoc', () => {
  return {
    RedocStandalone: (props: { specUrl: string }) => (
      <div>
        <span>Redoc Mock</span>
        <span>{props.specUrl}</span>
      </div>
    ),
  };
});

const shallowRender = ({
  nodeValue,
  usesRealm = false,
  usesRst = false,
}: {
  nodeValue: string;
  usesRealm?: boolean;
  usesRst?: boolean;
}) => {
  let mockChildren: TextNode[] = [];
  if (!usesRealm) {
    mockChildren = [
      {
        type: 'text',
        value: JSON.stringify(mockSpecJson),
        position: {
          start: {
            line: 0,
          },
        },
      },
    ];
  }

  return render(
    <OpenAPI
      nodeChildren={mockChildren}
      options={{
        'uses-realm': usesRealm,
        'uses-rst': usesRst,
        preview: false,
        'api-version': '1.0.0',
      }}
    />,
  );
};

describe('OpenAPI', () => {
  const mockNodeValue = 'includes/cloud-openapi.json';

  it('renders with a parsed spec file', () => {
    const wrapper = shallowRender({ nodeValue: mockNodeValue });
    expect(wrapper.getByText('Redoc Mock')).toBeTruthy();
  });

  it('renders loading widget before fetching spec file from Realm', async () => {
    // Used shallow for this test to avoid errors from mounting the Redoc component
    const wrapper = shallowRender({
      nodeValue: 'cloud',
      usesRealm: true,
    });
    expect(wrapper.getByText('Loading')).toBeTruthy();
  });

  it('uses rST to render our custom components', () => {
    const wrapper = shallowRender({
      nodeValue: mockNodeValue,
      usesRst: true,
    });
    expect(
      wrapper.getByText('{"openapi":"3.0.0","info":{"version":"1.0.5","title":"Swagger Petstore"},"paths":{}}'),
    ).toBeTruthy();
  });

  it('passes `src` param into the specUrl prop for the Redoc standalone component', () => {
    mockLocation({ search: '?src=https://raw.githubusercontent.com' });

    const wrapper = shallowRender({
      nodeValue: mockNodeValue,
    });

    expect(wrapper.getByText('https://raw.githubusercontent.com')).toBeTruthy();
  });
});
