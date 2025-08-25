.. code-block:: typescript

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
