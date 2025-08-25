.. code-block:: typescript

   const siteVisitTracker = realm.write(() => {
     return realm.create(SiteVisitTracker, {
       nullableSiteVisits: 0,
       siteVisits: 1,
     });
   });

   const myID = siteVisitTracker._id;

   realm.write(() => {
     realm.create(
       SiteVisitTracker,
       { _id: myID, nullableSiteVisits: null },
       UpdateMode.Modified
     );
   });

   realm.write(() => {
     realm.create(
       SiteVisitTracker,
       { _id: myID, nullableSiteVisits: 0 },
       UpdateMode.Modified
     );
   });
