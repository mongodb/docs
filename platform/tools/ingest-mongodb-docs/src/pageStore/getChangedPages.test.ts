import { Page, PageAction } from "./Page";
import { getChangedPages } from "./getChangedPages";

describe("getChangedPages", () => {
  it("gets changed pages", async () => {
    const pageTemplate: Omit<Page, "url"> = {
      title: "page",
      body: "abc",
      format: "md",
      sourceName: "test",
      metadata: {
        tags: [],
      },
    };
    const [page0, page1, page2, page3] = Array(4)
      .fill(0)
      .map((_, i): Page & { action: PageAction } => ({
        ...pageTemplate,
        url: `https://example.com/page/${i}`,
        action: "created",
      }));

    expect(
      page0.url !== page1.url &&
        page1.url !== page2.url &&
        page2.url !== page3.url
    ).toBeTruthy();
    const { created, updated, deleted } = await getChangedPages({
      oldPages: [page0, page1, page2],
      newPages: [
        { ...page1, body: "modified!" }, // modified page
        page3, // new page
        page0, // unmodified page -- order shouldn't matter
        // no page2 --> deleted
      ],
    });
    const changedPages = [...deleted, ...created, ...updated];
    expect(changedPages.length).toBe(3);
    expect(changedPages[0]).toMatchObject({
      action: "deleted",
      url: "https://example.com/page/2",
    });
    expect(changedPages[1]).toMatchObject({
      action: "created",
      url: "https://example.com/page/3",
    });
    expect(changedPages[2]).toMatchObject({
      action: "updated",
      url: "https://example.com/page/1",
    });
  });
  it("detects changed tags", async () => {
    const page: Page = {
      title: "page",
      body: "abc",
      format: "md",
      sourceName: "test",
      url: "test",
      metadata: {
        tags: ["test1", "test2"],
      },
    };

    const { created, updated, deleted } = await getChangedPages({
      oldPages: [{ ...page, action: "updated" }],
      newPages: [
        {
          ...page,
          metadata: { tags: ["newTag", ...(page?.metadata?.tags || [])] },
        },
      ],
    });
    const changedPages = [...deleted, ...created, ...updated];
    expect(changedPages.length).toBe(1);
    expect(changedPages[0]).toMatchObject({
      action: "updated",
      metadata: {
        tags: ["newTag", ...(page?.metadata?.tags || [])],
      },
    });
  });
});
