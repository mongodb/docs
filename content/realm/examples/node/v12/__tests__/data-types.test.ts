import Realm, { UpdateMode } from "realm";

import { SiteVisitTracker } from "./models/models.ts";

describe("Counter Updates", () => {
  test("testing normal methods", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

    // :snippet-start:initialize-counter
    const siteVisitTracker = realm.write(() => {
      return realm.create(SiteVisitTracker, { siteVisits: 0 });
    });
    // :snippet-end:

    realm.write(() => {
      // :snippet-start:update-counter
      siteVisitTracker.siteVisits.increment();
      siteVisitTracker.siteVisits.value; // 1
      expect(siteVisitTracker.siteVisits.value).toBe(1); // :remove:
      siteVisitTracker.siteVisits.increment(2);
      siteVisitTracker.siteVisits.value; // 3
      expect(siteVisitTracker.siteVisits.value).toBe(3); // :remove:
      siteVisitTracker.siteVisits.decrement(2);
      siteVisitTracker.siteVisits.value; // 1
      expect(siteVisitTracker.siteVisits.value).toBe(1); // :remove:
      siteVisitTracker.siteVisits.increment(-2);
      siteVisitTracker.siteVisits.value; // -1
      expect(siteVisitTracker.siteVisits.value).toBe(-1); // :remove:
      siteVisitTracker.siteVisits.set(0); // reset counter value to 0
      // :snippet-end:
      expect(siteVisitTracker.siteVisits.value).toBe(0);
    });
  });

  test("testing nullability switching", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

    // :snippet-start:null-updating
    const siteVisitTracker = realm.write(() => {
      return realm.create(SiteVisitTracker, {
        nullableSiteVisits: 0,
        siteVisits: 1,
      });
    });

    const myID = siteVisitTracker._id;
    expect(siteVisitTracker.nullableSiteVisits?.value).toBe(0); // :remove:

    realm.write(() => {
      realm.create(
        SiteVisitTracker,
        { _id: myID, nullableSiteVisits: null },
        UpdateMode.Modified
      );
    });
    expect(siteVisitTracker.nullableSiteVisits).toBe(null); // :remove:

    realm.write(() => {
      realm.create(
        SiteVisitTracker,
        { _id: myID, nullableSiteVisits: 0 },
        UpdateMode.Modified
      );
    });
    // :snippet-end:

    expect(siteVisitTracker.nullableSiteVisits?.value).toBe(0);
  });

  test("testing filtering", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

    // :snippet-start:filtering-with-counter
    const belowThreshold = realm.write(() => {
      return realm.create(SiteVisitTracker, { siteVisits: 0 });
    });

    const atThreshold = realm.write(() => {
      return realm.create(SiteVisitTracker, { siteVisits: 1 });
    });

    const aboveThreshold = realm.write(() => {
      return realm.create(SiteVisitTracker, { siteVisits: 2 });
    });

    const allObjects = realm.objects("SiteVisitTracker");

    let filteredObjects = allObjects.filtered(
      "siteVisits >= $0",
      atThreshold.siteVisits.value
    );
    // :snippet-end:

    let unfilteredExpected = [belowThreshold, atThreshold, aboveThreshold];
    let filteredExpected = [atThreshold, aboveThreshold];

    expect(JSON.stringify(allObjects)).toMatch(
      JSON.stringify(unfilteredExpected)
    );
    expect(JSON.stringify(filteredObjects)).toMatch(
      JSON.stringify(filteredExpected)
    );
  });
});
