import { GET } from '@/app/api/markdown-tabs/[...path]/route';

const ORIGIN = 'https://www.mongodb.com';
const BASE_PATH = '/docs';
const DOCS_PATH = ['manual', 'current', 'foo'];

// The route only reads `url`, so this avoids needing jsdom to provide `Request`.
function fakeRequest(search = ''): Request {
  return { url: `${ORIGIN}${BASE_PATH}/manual/current/foo.md${search}` } as unknown as Request;
}

// next/server is a manual mock here (see __mocks__/next/server.ts) and jsdom
// provides no `Response`, so stub the only members the route reads.
function fakeUpstream(body: string, status = 200) {
  return { ok: status >= 200 && status < 300, status, text: async () => body } as unknown as Response;
}

const ALL_TABS_DOC = [
  '<!--tab tabid="shell" tabset="drivers"-->',
  '',
  '### MongoDB Shell',
  '',
  '<!--/tab-->',
  '',
  '<!--tab tabid="nodejs" tabset="drivers"-->',
  '',
  '### Node.js',
  '',
  '<!--/tab-->',
  '',
].join('\n');

const DEFAULT_DOC = '### MongoDB Shell\n';

const call = (search?: string) => GET(fakeRequest(search), { params: { path: DOCS_PATH } });

describe('GET /api/markdown-tabs/[...path]', () => {
  const originalFetch = global.fetch;
  let fetchSpy: jest.Mock;

  beforeEach(() => {
    fetchSpy = jest.fn();
    global.fetch = fetchSpy as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  // Routes the export URLs by path so a test does not depend on call order.
  function serveExports({ all, def }: { all?: Response; def?: Response }) {
    fetchSpy.mockImplementation((url: URL) =>
      Promise.resolve(url.pathname.includes('/api/markdown-all/') ? all : def),
    );
  }

  it('keeps only the requested tab', async () => {
    serveExports({ all: fakeUpstream(ALL_TABS_DOC) });

    const res = await call('?tabs=nodejs');
    const body = await res.text();

    expect(body).toContain('### Node.js');
    expect(body).not.toContain('### MongoDB Shell');
  });

  // The subrequest must carry the full public URL, basePath included, and the
  // trailing slash `trailingSlash: true` requires — without it the export
  // answers 308 and this silently falls back to the default one.
  it('reads the all-tabs export at its basePath-prefixed, slash-terminated URL', async () => {
    serveExports({ all: fakeUpstream(ALL_TABS_DOC) });

    await call('?tabs=nodejs');

    expect((fetchSpy.mock.calls[0][0] as URL).toString()).toBe(
      `${ORIGIN}${BASE_PATH}/api/markdown-all/manual/current/foo/`,
    );
  });

  it('sets the markdown content type, per-tab-set cache key, and CORS headers', async () => {
    serveExports({ all: fakeUpstream(ALL_TABS_DOC) });

    const res = await call('?tabs=nodejs');

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8');
    expect(res.headers.get('Netlify-Vary')).toBe('query=tabs|allTabs,header=Accept');
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  // `?tabs=` that names nothing is a request for no particular tab, so it must
  // not fall through to emitting every tab.
  it.each(['?tabs=', '?tabs=,%20,'])('serves the default export for %s', async (search) => {
    serveExports({ def: fakeUpstream(DEFAULT_DOC) });

    const res = await call(search);

    expect(await res.text()).toBe(DEFAULT_DOC);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect((fetchSpy.mock.calls[0][0] as URL).pathname).toBe(`${BASE_PATH}/api/markdown/manual/current/foo/`);
  });

  it('serves every tab, unfiltered, for ?allTabs=true', async () => {
    serveExports({ all: fakeUpstream(ALL_TABS_DOC) });

    const res = await call('?allTabs=true');

    expect(await res.text()).toBe(ALL_TABS_DOC);
  });

  it('serves every tab when both params are present', async () => {
    serveExports({ all: fakeUpstream(ALL_TABS_DOC) });

    const res = await call('?tabs=nodejs&allTabs=true');

    expect(await res.text()).toBe(ALL_TABS_DOC);
  });

  // A page with no tabs has no all-tabs export (see renderPageMarkdown), and its
  // default export already says everything an all-tabs one would.
  it.each(['?tabs=nodejs', '?allTabs=true'])(
    'falls back to the default export for %s when the all-tabs export is missing',
    async (search) => {
      serveExports({ all: fakeUpstream('not found', 404), def: fakeUpstream(DEFAULT_DOC) });

      const res = await call(search);

      expect(res.status).toBe(200);
      expect(await res.text()).toBe(DEFAULT_DOC);
    },
  );

  it('404s when neither export exists', async () => {
    serveExports({ all: fakeUpstream('not found', 404), def: fakeUpstream('not found', 404) });

    expect((await call('?tabs=nodejs')).status).toBe(404);
  });

  it('400s when no path segments are given', async () => {
    const res = await GET(fakeRequest('?tabs=nodejs'), { params: { path: [] } });

    expect(res.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
