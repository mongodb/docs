import { render, screen } from '@testing-library/react';

jest.mock('@/internationalization/catalogs', () => {
  const english = {
    'media.play_video': 'Play video',
    'admonition.note': 'Note',
    'changelog.breaking_change': 'Breaking change',
    'changelog.release_heading': '{date} Release',
    'changelog.select_resource': 'Select Resource',
    'combobox.show_suggestions': 'Show suggestions',
  };
  const spanish = {
    'media.play_video': 'Reproducir video',
    'admonition.note': 'Nota',
    'changelog.breaking_change': 'Cambio disruptivo',
    'changelog.release_heading': 'Lanzamiento del {date}',
    'changelog.select_resource': 'Seleccionar recurso',
    'combobox.show_suggestions': 'Mostrar sugerencias',
  };
  return {
    FALLBACK_LOCALE: 'en-us',
    getCatalog: (locale: string) => (locale === 'es' ? spanish : english),
  };
});

import { Admonition } from '@/mdx-components/Admonition';
import Change from '@/mdx-components/OpenAPIChangelog/components/change';
import FiltersPanel from '@/mdx-components/OpenAPIChangelog/components/filters-panel';
import ReleaseDateBlock from '@/mdx-components/OpenAPIChangelog/components/release-date-block';
import { ALL_VERSIONS } from '@/mdx-components/OpenAPIChangelog/utils/constants';
import VideoPlayButton from '@/mdx-components/Video/VideoPlayButton';

const ORIGINAL_BUILD_LOCALE = process.env.NEXT_PUBLIC_DOCS_LOCALE;

afterEach(() => {
  if (ORIGINAL_BUILD_LOCALE === undefined) {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
  } else {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = ORIGINAL_BUILD_LOCALE;
  }
});

describe('a migrated component', () => {
  it('renders English when no build locale is set', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    render(<VideoPlayButton />);
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
  });

  it('renders Spanish on a Spanish build', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    render(<VideoPlayButton />);
    expect(screen.getByRole('button', { name: 'Reproducir video' })).toBeInTheDocument();
  });
});

describe('a built-in Via label', () => {
  it('renders the callout heading in English when no build locale is set', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    render(<Admonition name="note">Body</Admonition>);
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('renders the callout heading in Spanish on a Spanish build', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    render(<Admonition name="note">Body</Admonition>);
    expect(screen.getByText('Nota')).toBeInTheDocument();
    expect(screen.queryByText('Note')).not.toBeInTheDocument();
  });
});

describe('the OpenAPI changelog', () => {
  const renderFiltersPanel = () =>
    render(
      <FiltersPanel
        versionMode={ALL_VERSIONS}
        resources={['GET /groups']}
        resourceVersions={['2023-01-01']}
        selectedResources={[]}
        setSelectedResources={jest.fn()}
        resourceVersionOne="2023-01-01"
        setVersionMode={jest.fn()}
        setResourceVersionOne={jest.fn()}
        setResourceVersionTwo={jest.fn()}
      />,
    );

  it('renders English when no build locale is set', () => {
    delete process.env.NEXT_PUBLIC_DOCS_LOCALE;
    render(<ReleaseDateBlock date="2025-03-15" paths={[]} />);
    expect(screen.getByRole('heading', { name: '15 March 2025 Release' })).toBeInTheDocument();
  });

  it('translates the release heading and leaves the date as it is', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    render(<ReleaseDateBlock date="2025-03-15" paths={[]} />);
    expect(screen.getByRole('heading', { name: 'Lanzamiento del 15 March 2025' })).toBeInTheDocument();
  });

  it('translates the breaking change label', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    render(<Change change="removed a field" backwardCompatible={false} />);
    expect(screen.getByRole('img', { name: 'Cambio disruptivo' })).toBeInTheDocument();
  });

  it('passes translated labels to the VIA Combobox', () => {
    process.env.NEXT_PUBLIC_DOCS_LOCALE = 'es';
    renderFiltersPanel();
    expect(screen.getByText('Seleccionar recurso')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mostrar sugerencias/ })).toBeInTheDocument();
  });
});
