import { strict as assert } from "assert";
import { MongoDbPageStore, makeMongoDbPageStore } from "./MongoDbPageStore";
import { PersistedPage } from "./Page";
import "dotenv/config";
import { MongoClient } from "mongodb";
import { MONGO_MEMORY_SERVER_URI } from "../test/constants";

jest.setTimeout(60000);
const moviePages: PersistedPage[] = [
  {
    action: "created",
    body: "The Matrix (1999) comes out",
    format: "md",
    sourceName: "",
    metadata: {
      tags: [],
    },
    updated: new Date("1999-03-31"),
    url: "matrix1",
  },
  {
    action: "created",
    body: "Legally Blonde (2001) comes out",
    format: "md",
    sourceName: "",
    metadata: {
      tags: [],
    },
    updated: new Date("2001-07-13"),
    url: "legally-blonde1",
  },
  {
    action: "created",
    body: "The Matrix: Reloaded (2003) comes out",
    format: "md",
    sourceName: "",
    metadata: {
      tags: [],
    },
    updated: new Date("2003-05-15"),
    url: "matrix2",
  },
  {
    action: "created",
    body: "Legally Blonde 2: Red, White & Blonde (2003) comes out",
    format: "md",
    sourceName: "",
    metadata: {
      tags: [],
    },
    updated: new Date("2003-07-02"),
    url: "legally-blonde2",
  },
  {
    action: "created",
    body: "The Matrix: Revolutions (2003) comes out",
    format: "md",
    sourceName: "",
    metadata: {
      tags: [],
    },
    updated: new Date("2003-11-05"),
    url: "matrix3",
  },
];

const pageUrls = (pages: PersistedPage[]) => pages.map(({ url }) => url);
const uri = MONGO_MEMORY_SERVER_URI;

describe("MongoDbPageStore", () => {
  let store: MongoDbPageStore | undefined;
  beforeAll(async () => {
    store = await makeMongoDbPageStore({
      connectionUri: uri,
      databaseName: "test-database",
    });
  });
  afterEach(async () => {
    await store?.drop();
  });
  afterAll(async () => {
    await store?.close();
  });

  it("handles pages", async () => {
    assert(store);

    const page: PersistedPage = {
      action: "created",
      body: "foo",
      format: "md",
      sourceName: "source1",
      metadata: {
        tags: [],
      },
      updated: new Date(),
      url: "/x/y/z",
    };

    let pages = await store.loadPages({ sources: ["source1"] });
    expect(pages).toStrictEqual([]);

    await store.updatePages([
      { ...page, url: "1" },
      { ...page, url: "2" },
      { ...page, url: "3" },
    ]);

    pages = await store.loadPages({ sources: ["source1"] });
    expect(pages.length).toBe(3);
    expect(pages.find(({ url }) => url === "2")).toMatchObject({
      url: "2",
      action: "created",
    });

    await store.updatePages([{ ...page, url: "2", action: "deleted" }]);

    pages = await store.loadPages({ sources: ["source1"] });
    expect(pages.length).toBe(3);
    expect(pages.find(({ url }) => url === "2")).toMatchObject({
      url: "2",
      action: "deleted",
    });
  });

  it("loads pages that have changed since the given date", async () => {
    assert(store);

    await store.updatePages(moviePages);

    const changedPages = await store.loadPages({
      updated: new Date("2000-01-01"),
    });

    expect(changedPages.length).toBe(4);
    expect(pageUrls(changedPages).sort()).toEqual([
      "legally-blonde1",
      "legally-blonde2",
      "matrix2",
      "matrix3",
    ]);
  });

  it("loads pages by URL", async () => {
    assert(store);

    await store.updatePages(moviePages);

    const pages = await store.loadPages({
      urls: ["matrix3", "legally-blonde2"],
    });

    expect(pages.length).toBe(2);
    expect(pageUrls(pages).sort()).toEqual(["legally-blonde2", "matrix3"]);
  });

  it("supports custom MongoDB queries", async () => {
    assert(store);

    expect(store.queryType).toBe("mongodb");

    await store.updatePages(moviePages);

    const sequels = await store.loadPages({
      query: {
        $and: [{ url: /matrix/ }, { updated: { $gt: new Date("2000-01-01") } }],
      },
    });

    expect(sequels.length).toBe(2);
    expect(pageUrls(sequels).sort()).toEqual(["matrix2", "matrix3"]);
  });

  it("supports built-in filter arguments alongside custom MongoDB queries", async () => {
    assert(store);

    expect(store.queryType).toBe("mongodb");

    await store.updatePages(moviePages);

    const sequels = await store.loadPages({
      query: { url: "matrix3" },
      updated: new Date("2000-01-01"),
    });

    expect(sequels.length).toBe(1);
    expect(pageUrls(sequels).sort()).toEqual(["matrix3"]);
  });

  it("rejects custom queries that are not MongoDB queries", async () => {
    assert(store);

    expect(store.queryType).toBe("mongodb");

    await store.updatePages(moviePages);

    const sqlQueryPromise = store.loadPages({
      // @ts-expect-error: Testing that the query type matches expectation
      query: "SELECT * FROM pages WHERE url = 'matrix1'",
    });

    expect(sqlQueryPromise).rejects.toThrow(
      "Invalid query - MongoDbPageStore expects a MongoDB query filter. Instead, got: SELECT * FROM pages WHERE url = 'matrix1'"
    );
  });

  it("has an overridable default collection name", async () => {
    assert(store);

    expect(store.metadata.collectionName).toBe("pages");

    const storeWithCustomCollectionName = await makeMongoDbPageStore({
      connectionUri: uri,
      databaseName: store.metadata.databaseName,
      collectionName: "custom-pages",
    });

    expect(storeWithCustomCollectionName.metadata.collectionName).toBe(
      "custom-pages"
    );
  });

  it("initialized the store with indexes", async () => {
    assert(store);
    const mongoClient = new MongoClient(uri);
    try {
      await store.init();
      const db = mongoClient.db(store.metadata.databaseName);
      const indexes = await db
        .collection(store.metadata.collectionName)
        .listIndexes()
        .toArray();
      expect(indexes).toMatchObject([
        { v: 2, key: { _id: 1 }, name: "_id_" },
        { v: 2, key: { url: 1 }, name: "url_1" },
        { v: 2, key: { sourceName: 1 }, name: "sourceName_1" },
      ]);
    } finally {
      await mongoClient.close();
    }
  });

  describe("deletePages", () => {
    beforeEach(async () => {
      assert(store);
      const moviePagesWithSource = moviePages.map((page, index) => ({
        ...page,
        sourceName: `source-${index}`,
      }));
      await store.updatePages(moviePagesWithSource);
    });

    it("marks all pages as deleted", async () => {
      assert(store);
      await store.deletePages({});

      const pages = await store.loadPages();
      const pagesMarkedDeleted = pages.filter(
        ({ action }) => action === "deleted"
      );
      expect(pagesMarkedDeleted.length).toBe(5);
    });

    it("permanently deletes pages", async () => {
      assert(store);
      await store.deletePages({ permanent: true });

      const pages = await store.loadPages();
      expect(pages.length).toBe(0);
    });

    it("deletes pages of a specific dataSource", async () => {
      assert(store);
      await store.deletePages({
        dataSources: ["source-1", "source-2"],
        permanent: true,
      });

      const pages = await store.loadPages();
      expect(pages.length).toBe(3);
    });

    it("deletes pages belonging to all dataSources NOT listed", async () => {
      assert(store);
      await store.deletePages({
        dataSources: ["source-1", "source-2"],
        permanent: true,
        inverse: true,
      });

      const pages = await store.loadPages();
      const pageDataSources = pages.map(({ sourceName }) => sourceName);
      expect(pages.length).toBe(2);
      expect(pageDataSources).toContain("source-1");
      expect(pageDataSources).toContain("source-2");
      expect(pageDataSources).not.toContain("source-0");
      expect(pageDataSources).not.toContain("source-3");
      expect(pageDataSources).not.toContain("source-4");
    });
  });

  describe("getMissingPagesByUrl", () => {
    beforeEach(async () => {
      assert(store);
      await store.updatePages(moviePages);
    });

    it("returns the missing pages by URL", async () => {
      assert(store);
      const missingUrls = await store.getMissingPagesByUrl({
        expectedUrls: ["matrix1", "legally-blonde1", "non-existent-url"],
      });

      expect(missingUrls).toEqual(["non-existent-url"]);
    });

    it("returns an empty array when all pages exist", async () => {
      assert(store);
      const missingUrls = await store.getMissingPagesByUrl({
        expectedUrls: ["matrix2", "legally-blonde2"],
      });

      expect(missingUrls).toEqual([]);
    });

    it("supports URL transformation", async () => {
      assert(store);
      const missingUrls = await store.getMissingPagesByUrl({
        expectedUrls: ["MATRIX2", "LEGALLY-BLONDE2"],
        urlTransformer: (url) => url.toLowerCase(),
      });

      expect(missingUrls).toEqual([]);
    });
  });
});
