import Realm from "realm";

describe("test compaction on launch", () => {
  test("shouldCompact", async () => {
    let wasCalled;

    // TODO: Test that realm is compacted once it meets criteria

    //:snippet-start: shouldCompactNode

    const shouldCompact = (totalBytes, usedBytes) => {
      // totalBytes refers to the size of the file on disk in bytes (data + free space)
      // usedBytes refers to the number of bytes used by data in the file
      //:remove-start:
      wasCalled = true;
      //:remove-end:

      // Compact if the file is over 100MB in size and less than 50% 'used'
      const oneHundredMB = 100 * 1024 * 1024;

      return totalBytes > oneHundredMB && usedBytes / totalBytes < 0.5;
    };
    //:uncomment-start:
    // const config = { shouldCompact };
    //:uncomment-end:

    //:remove-start:
    const config = {
      path: "realm-files/compacting-realm",
      shouldCompact,
    };
    //:remove-end:
    let realm = await Realm.open(config);

    //:snippet-end:
    expect(wasCalled).toBe(true);

    realm.close();
  });

  test("compact", async () => {
    //:snippet-start: compactNode
    const realm = new Realm("my.realm");

    try {
      const compactSuccess = realm.compact();
      //:remove-start:
      expect(compactSuccess).toBe(true);
      //:remove-end:
    } catch (err) {
      if (err instanceof Error) {
        // handle error for compacting
      }
    }
    //:snippet-end:

    realm.close();
  });
});
