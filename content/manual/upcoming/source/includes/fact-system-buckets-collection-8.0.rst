When you upgrade to MongoDB 8.0, if you have any ``system.buckets``
collections that are not time-series collections, you might need to
:method:`drop <db.collection.drop()>` or :method:`rename
<db.collection.renameCollection()>` those collections before you
upgrade, depending on your 8.0 patch release:

MongoDB 8.0.5 and later
  You do not need to drop ``system.buckets`` collections that aren't
  time-series collections before you upgrade. However, you must drop or
  rename them after you complete your upgrade.

MongoDB 8.0.4 and earlier
  You must drop or rename ``system.buckets`` collections that aren't
  time-series collections before you upgrade. All ``system.buckets``
  collections must have valid :ref:`time series options
  <cmd-sharded-time-series-collection-options>` configured before you
  upgrade to versions 8.0.0 - 8.0.4.

To determine whether you have ``system.buckets`` collections that are
not time-series collections, use the :method:`db.getCollectionInfos()`
method with a filter:

.. code-block:: javascript

   db.getCollectionInfos(
      { 
         $and: [
            { name: { $regex: /^system\.buckets/ } },
            { 'options.timeseries': { $exists: false } }
         ]
      }
   )
