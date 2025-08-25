import Realm, { UpdateMode } from "realm";

import { SiteVisitTracker } from "./models/models.js";

// This test exists to ensure that the JS model definition works that same way
// as the TS model definition. There are no snippets generated from this file,
// as it's the exact same code as what's in the TS file.

describe("Counter Updates", () => {
  test("testing normal methods", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

    const siteVisitTracker = realm.write(() => {
      return realm.create(SiteVisitTracker, { siteVisits: 0 });
    });

    realm.write(() => {
      siteVisitTracker.siteVisits.increment();
      siteVisitTracker.siteVisits.value; // 1
      expect(siteVisitTracker.siteVisits.value).toBe(1);
      siteVisitTracker.siteVisits.increment(2);
      siteVisitTracker.siteVisits.value; // 3
      expect(siteVisitTracker.siteVisits.value).toBe(3);
      siteVisitTracker.siteVisits.decrement(2);
      siteVisitTracker.siteVisits.value; // 1
      expect(siteVisitTracker.siteVisits.value).toBe(1);
      siteVisitTracker.siteVisits.increment(-2);
      siteVisitTracker.siteVisits.value; // -1
      expect(siteVisitTracker.siteVisits.value).toBe(-1);
      siteVisitTracker.siteVisits.set(0); // reset counter value to 0

      expect(siteVisitTracker.siteVisits.value).toBe(0);
    });
  });

  test("testing nullability switching", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

    const siteVisitTracker = realm.write(() => {
      return realm.create(SiteVisitTracker, {
        nullableSiteVisits: 0,
        siteVisits: 1,
      });
    });

    const myID = siteVisitTracker._id;
    expect(siteVisitTracker.nullableSiteVisits?.value).toBe(0);

    realm.write(() => {
      realm.create(
        SiteVisitTracker,
        { _id: myID, nullableSiteVisits: null },
        UpdateMode.Modified
      );
    });
    expect(siteVisitTracker.nullableSiteVisits).toBe(null);

    realm.write(() => {
      realm.create(
        SiteVisitTracker,
        { _id: myID, nullableSiteVisits: 0 },
        UpdateMode.Modified
      );
    });

    expect(siteVisitTracker.nullableSiteVisits?.value).toBe(0);
  });

  test("testing filtering", async () => {
    const realm = await Realm.open({
      schema: [SiteVisitTracker],
    });

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
