import DeprecatedVersionSelector from '@/components/deprecated-version-selector';
import { VersionContextProvider } from '@/context/version-context';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Docset } from '@/types/data';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

// Mock data for deprecated/EOL versions (docsets with hasEolVersions: true)
const mockedReposBranches: Docset[] = [
  {
    project: 'docs',
    displayName: 'MongoDB Manual',
    repoName: 'docs-mongodb-internal',
    internalOnly: false,
    prodDeployable: true,
    groups: null,
    hasEolVersions: true,
    url: {
      dev: 'https://dev.mongodb.com/',
      dotcomprd: 'https://mongodb.com/',
      dotcomstg: 'https://staging.mongodb.com/',
      prd: 'https://mongodb.com/',
      stg: 'https://staging.mongodb.com/',
      regression: 'https://regression.mongodb.com/',
    },
    prefix: {
      dotcomprd: 'docs',
      dotcomstg: 'docs',
      prd: 'docs',
      stg: 'docs',
    },
    bucket: {
      dev: 'docs-dev',
      dotcomprd: 'docs-prod',
      dotcomstg: 'docs-staging',
      prd: 'docs-prod',
      stg: 'docs-staging',
      regression: 'docs-regression',
    },
    branches: [
      {
        gitBranchName: 'v1.1',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v1.1',
        urlSlug: 'v1.1',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v1.1',
        noIndexing: false,
      },
      {
        gitBranchName: 'v1.11',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v1.11',
        urlSlug: 'v1.11',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v1.11',
        noIndexing: false,
      },
      {
        gitBranchName: 'v1.10',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v1.10',
        urlSlug: 'v1.10',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v1.10',
        noIndexing: false,
      },
      {
        gitBranchName: 'v1.2',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v1.2',
        urlSlug: 'v1.2',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v1.2',
        noIndexing: false,
      },
      {
        gitBranchName: 'v2.2',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v2.2',
        urlSlug: 'v2.2',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v2.2',
        noIndexing: false,
      },
      {
        gitBranchName: 'v2.4',
        active: false,
        eol_type: 'download',
        versionSelectorLabel: 'v2.4',
        urlSlug: 'v2.4',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v2.4',
        noIndexing: false,
      },
      {
        gitBranchName: 'v2.6',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v2.6',
        urlSlug: 'v2.6',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v2.6',
        noIndexing: false,
      },
      {
        gitBranchName: 'v3.0',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'v3.0',
        urlSlug: 'v3.0',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v3.0',
        noIndexing: false,
      },
      {
        gitBranchName: 'v3.2',
        active: false,
        eol_type: 'download',
        versionSelectorLabel: 'v3.2',
        urlSlug: 'v3.2',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v3.2',
        noIndexing: false,
      },
      {
        gitBranchName: 'v3.4',
        active: false,
        eol_type: 'download',
        versionSelectorLabel: 'v3.4',
        urlSlug: 'v3.4',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v3.4',
        noIndexing: false,
      },
    ],
  },
  {
    project: 'docs-clone',
    displayName: 'MongoDB Manual',
    repoName: 'docs-mongodb-internal',
    internalOnly: false,
    prodDeployable: true,
    groups: null,
    hasEolVersions: true,
    url: {
      dev: 'https://dev.mongodb.com/',
      dotcomprd: 'https://mongodb.com/',
      dotcomstg: 'https://staging.mongodb.com',
      prd: 'https://mongodb.com/',
      stg: 'https://staging.mongodb.com/',
      regression: 'https://regression.mongodb.com/',
    },
    prefix: {
      dotcomprd: 'docs/docs-clone',
      dotcomstg: 'docs/docs-clone',
      prd: 'docs/docs-clone',
      stg: 'docs/docs-clone',
    },
    bucket: {
      dev: 'docs-dev',
      dotcomprd: 'docs-prod',
      dotcomstg: 'docs-staging',
      prd: 'docs-prod',
      stg: 'docs-staging',
      regression: 'docs-regression',
    },
    branches: [
      {
        gitBranchName: 'v2.7',
        active: false,
        eol_type: 'download',
        versionSelectorLabel: 'v2.7',
        urlSlug: 'v2.7',
        offlineUrl: 'https://www.mongodb.com/docs/offline/v2.7',
        noIndexing: false,
      },
    ],
  },
  {
    project: 'mongocli',
    displayName: 'MongoDB Command Line Interface',
    repoName: 'docs-mongodb-internal',
    internalOnly: false,
    prodDeployable: true,
    groups: null,
    hasEolVersions: true,
    url: {
      dev: 'https://dev.mongodb.com/',
      dotcomprd: 'https://mongodb.com/',
      dotcomstg: 'https://staging.mongodb.com/',
      prd: 'https://mongodb.com/',
      stg: 'https://staging.mongodb.com/',
      regression: 'https://regression.mongodb.com/',
    },
    prefix: {
      dotcomprd: 'docs/mongocli',
      dotcomstg: 'docs/mongocli',
      prd: 'docs/mongocli',
      stg: 'docs/mongocli',
    },
    bucket: {
      dev: 'docs-dev',
      dotcomprd: 'docs-prod',
      dotcomstg: 'docs-staging',
      prd: 'docs-prod',
      stg: 'docs-staging',
      regression: 'docs-regression',
    },
    branches: [
      {
        gitBranchName: 'v0.5.0',
        active: false,
        eol_type: 'download',
        versionSelectorLabel: 'v0.5.0',
        urlSlug: 'v0.5.0',
        offlineUrl: 'https://www.mongodb.com/docs/offline/mongocli-v0.5.0.tar.gz',
        noIndexing: false,
      },
    ],
  },
  {
    project: 'atlas-open-service-broker',
    displayName: 'MongoDB Atlas Open Service Broker on Kubernetes',
    repoName: 'docs-mongodb-internal',
    internalOnly: false,
    prodDeployable: true,
    groups: null,
    hasEolVersions: true,
    url: {
      dev: 'https://dev.mongodb.com/',
      dotcomprd: 'https://mongodb.com/',
      dotcomstg: 'https://staging.mongodb.com/',
      prd: 'https://mongodb.com/',
      stg: 'https://staging.mongodb.com/',
      regression: 'https://regression.mongodb.com/',
    },
    prefix: {
      dotcomprd: 'docs/atlas-open-service-broker',
      dotcomstg: 'docs/atlas-open-service-broker',
      prd: 'docs/atlas-open-service-broker',
      stg: 'docs/atlas-open-service-broker',
    },
    bucket: {
      dev: 'docs-dev',
      dotcomprd: 'docs-prod',
      dotcomstg: 'docs-staging',
      prd: 'docs-prod',
      stg: 'docs-staging',
      regression: 'docs-regression',
    },
    branches: [
      {
        gitBranchName: 'master',
        active: false,
        eol_type: 'link',
        versionSelectorLabel: 'master',
        urlSlug: '',
        offlineUrl: 'https://www.mongodb.com/docs/offline/master',
        noIndexing: false,
      },
    ],
  },
];

// Mock the fetch API for /api/docsets
const mockFetch = jest.fn();

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  // Use 'current' as the branch name, which matches the gitBranchName in mock-docsets.ts
  // The branch with label "v4.11 (current)" has gitBranchName: 'current'
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'current', eol: false }));

  // Set up global fetch mock
  global.fetch = mockFetch;
});

const mountConsumer = async () => {
  const res = render(
    <VersionContextProvider docsets={mockedReposBranches} slug="/" env="production">
      <DeprecatedVersionSelector />
    </VersionContextProvider>,
  );
  // Wait for the fetch to complete - the component calls fetch on mount
  await waitFor(
    () => {
      expect(mockFetch).toHaveBeenCalledWith('/api/docsets');
    },
    { timeout: 3000 },
  );
  return res;
};

describe('DeprecatedVersionSelector when rendered', () => {
  let wrapper: ReturnType<typeof render>;

  beforeEach(() => {
    // Mock fetch to return the mocked docsets
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockedReposBranches,
    } as Response);
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  afterAll(() => {
    // Clean up global fetch mock
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (global as any).fetch;
  });

  it('shows two dropdowns', async () => {
    wrapper = await mountConsumer();

    const productDropdown = await screen.findAllByText('Select a Product');
    const versionDropdown = await screen.findAllByText('Select a Version');

    expect(productDropdown.length).toBeGreaterThan(0);
    expect(versionDropdown.length).toBeGreaterThan(0);
  });

  it('shows a disabled submit button', async () => {
    wrapper = await mountConsumer();

    const button = await screen.findByTitle('View or Download Documentation');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows a disabled version selector', async () => {
    wrapper = await mountConsumer();

    const buttons = await screen.findAllByRole('button');
    expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not show either dropdown menu', async () => {
    wrapper = await mountConsumer();

    expect(screen.queryAllByText('MongoDB Connector for BI')).toHaveLength(0);
    expect(screen.queryAllByText(mockedReposBranches[0].branches[0].versionSelectorLabel)).toHaveLength(0);
  });

  // Test product dropdown
  describe('when the product button is clicked', () => {
    it('shows the dropdown menu with elements per metadata node', async () => {
      const user = userEvent.setup();
      wrapper = await mountConsumer();

      const productDropdown = wrapper.container.querySelectorAll('button')[0];
      await user.click(productDropdown);

      expect(screen.getByText('MongoDB Manual')).toBeInTheDocument();
      expect(screen.getByText('MongoDB Atlas Open Service Broker on Kubernetes')).toBeInTheDocument();
    });

    it('version dropdown text is correct', async () => {
      const user = userEvent.setup();
      wrapper = await mountConsumer();

      const productDropdown = wrapper.container.querySelectorAll('button')[0];
      await user.click(productDropdown);
      expect(screen.getByText('Version')).toBeInTheDocument();
    });
  });

  describe('when the product button is clicked again', () => {
    it('hides the dropdown menu', async () => {
      const user = userEvent.setup();
      wrapper = await mountConsumer();

      const productDropdown = wrapper.container.querySelectorAll('button')[0];
      await user.click(productDropdown);
      await user.click(productDropdown);

      expect(wrapper.container.querySelectorAll('button')[0]).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('when the selected product has a single deprecated version', () => {
    test.each([
      [
        'MongoDB Command Line Interface',
        'Version 0.5.0',
        'https://www.mongodb.com/docs/offline/mongocli-v0.5.0.tar.gz',
      ],
      [
        'MongoDB Atlas Open Service Broker on Kubernetes',
        'Latest',
        'https://mongodb.com/docs/atlas-open-service-broker/',
      ],
    ])('generates the correct docs URL or download link', async (product, versionSelection, expectedUrl) => {
      const user = userEvent.setup();
      wrapper = await mountConsumer();

      // Wait for the fetch to complete
      await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/docsets'));

      const productDropdown = wrapper.container.querySelectorAll('button')[0];
      await user.click(productDropdown);
      const productOption = await screen.findByText(product);
      await user.click(productOption);

      const versionDropdown = wrapper.container.querySelectorAll('button')[1];
      await user.click(versionDropdown);
      const versionOption = await screen.findByText(versionSelection);
      await user.click(versionOption);

      const button = await screen.findByTitle('View or Download Documentation');
      expect(button).toHaveAttribute('aria-disabled', 'false');
      expect(button.getAttribute('href')).toEqual(expectedUrl);
    });
  });

  it('when the selected product has multiple deprecated versions, versions are sorted correctly', async () => {
    const user = userEvent.setup();
    wrapper = await mountConsumer();
    const productDropdown = wrapper.container.querySelectorAll('button')[0];
    await user.click(productDropdown);
    const product = screen.queryByText('MongoDB Manual');
    expect(product).toBeInTheDocument();
    await user.click(product!);
    const versionDropdown = wrapper.container.querySelectorAll('button')[1];
    await user.click(versionDropdown);
    expect(versionDropdown).toHaveAttribute('aria-expanded', 'true');

    const versionChoices = screen.queryAllByRole('option').slice(3);

    const sortedManualChoices = [
      'Version 1.1',
      'Version 1.2',
      'Version 1.10',
      'Version 1.11',
      'Version 2.2',
      'Version 2.4',
      'Version 2.6',
      'Version 2.7',
      'Version 3.0',
      'Version 3.2',
      'Version 3.4',
    ];

    for (const version in versionChoices) {
      expect(versionChoices[version].textContent).toEqual(sortedManualChoices[version]);
    }
  });

  it('populates the dropdown using build-time data if api fails', async () => {
    // Mock fetch to reject (simulate API failure)
    mockFetch.mockRejectedValue(new Error('API Error'));

    const user = userEvent.setup();
    wrapper = await mountConsumer();

    const productDropdown = wrapper.container.querySelectorAll('button')[0];
    await user.click(productDropdown);

    expect(screen.getByText('MongoDB Manual')).toBeInTheDocument();
    expect(screen.getByText('MongoDB Atlas Open Service Broker on Kubernetes')).toBeInTheDocument();
  });

  it('client-side fetch overwrites build-time data', async () => {
    // Render without VersionContextProvider to test fetch-only behavior
    const user = userEvent.setup();
    wrapper = render(<DeprecatedVersionSelector />);

    // Wait for the fetch to complete
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/docsets'));

    const productDropdown = wrapper.container.querySelectorAll('button')[0];
    await user.click(productDropdown);

    expect(screen.getByText('MongoDB Manual')).toBeInTheDocument();
    expect(screen.getByText('MongoDB Atlas Open Service Broker on Kubernetes')).toBeInTheDocument();
  });
});
