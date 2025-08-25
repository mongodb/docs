.. code-block:: typescript

   const siteVisitTracker = realm.write(() => {
     return realm.create(SiteVisitTracker, { siteVisits: 0 });
   });
