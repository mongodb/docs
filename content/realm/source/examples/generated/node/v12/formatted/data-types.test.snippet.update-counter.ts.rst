.. code-block:: typescript

   siteVisitTracker.siteVisits.increment();
   siteVisitTracker.siteVisits.value; // 1
   siteVisitTracker.siteVisits.increment(2);
   siteVisitTracker.siteVisits.value; // 3
   siteVisitTracker.siteVisits.decrement(2);
   siteVisitTracker.siteVisits.value; // 1
   siteVisitTracker.siteVisits.increment(-2);
   siteVisitTracker.siteVisits.value; // -1
   siteVisitTracker.siteVisits.set(0); // reset counter value to 0
