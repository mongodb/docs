import { updatePages, persistPages } from "./updatePages";
import { makeMockPageStore } from "../test/MockPageStore";
import { DataSource } from "../sources/DataSource";
import { Page, PersistedPage } from "./Page";

const examplePage: Page = {
  title: "Example",
  body: "",
  format: "md",
  sourceName: "test",
  metadata: {
    tags: [],
  },
  url: "https://example.com/test",
};

describe("persistPages", () => {
  it("persists pages in the page store", async () => {
    const store = makeMockPageStore();

    await persistPages({
      pages: [{ ...examplePage }],
      store,
      sourceName: "test",
    });

    const pages = await store.loadPages();
    expect(pages.length).toBe(1);
    expect(pages[0]).toMatchObject<Partial<PersistedPage>>({
      ...examplePage,
      action: "created",
    });
  });

  it("deletes pages when the base url changed", async () => {
    const store = makeMockPageStore();

    await persistPages({
      pages: [{ ...examplePage }],
      store,
      sourceName: "test",
    });

    let pages = await store.loadPages();
    expect(pages.length).toBe(1);
    expect(pages[0]).toMatchObject<Partial<PersistedPage>>({
      ...examplePage,
      action: "created",
    });
    const v2Url = `${examplePage.url}/v2`;
    await persistPages({
      pages: [{ ...examplePage, url: v2Url }],
      store,
      sourceName: "test",
    });

    pages = await store.loadPages();
    expect(pages.length).toBe(2);
    expect(pages[0]).toMatchObject<Partial<PersistedPage>>({
      ...examplePage,
      action: "deleted",
    });
    expect(pages[1]).toMatchObject<Partial<PersistedPage>>({
      ...examplePage,
      url: v2Url,
      action: "created",
    });
  });
});

describe("updatePages", () => {
  it("fetches pages from data sources concurrently", async () => {
    const pageStore = makeMockPageStore();

    const source1: DataSource = {
      name: "source1",
      fetchPages: jest.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate async delay
        return [examplePage];
      }),
    } as unknown as DataSource;

    const source2: DataSource = {
      name: "source2",
      fetchPages: jest.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate async delay
        return [examplePage];
      }),
    } as unknown as DataSource;

    const sources = [source1, source2];

    const startTimes: number[] = [];
    const endTimes: number[] = [];

    sources.forEach((source) => {
      jest.spyOn(source, "fetchPages").mockImplementationOnce(async () => {
        const startTime = Date.now();
        startTimes.push(startTime);
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate async delay
        const endTime = Date.now();
        endTimes.push(endTime);
        return [examplePage];
      });
    });

    await updatePages({
      sources,
      pageStore,
      concurrencyOptions: { processDataSources: 2 },
    });

    const executionPairs = startTimes.map((startTime, i) => ({
      startTime,
      endTime: endTimes[i],
    }));

    // Ensure some overlaps indicating concurrency
    expect(
      executionPairs.some((pair, i, pairs) =>
        pairs.some(
          (otherPair, j) =>
            i !== j &&
            pair.startTime < otherPair.endTime &&
            otherPair.startTime < pair.endTime
        )
      )
    ).toBe(true);
  });
});
