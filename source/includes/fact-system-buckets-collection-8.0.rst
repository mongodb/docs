All ``system.buckets`` collections must have valid :ref:`time series options 
<cmd-sharded-time-series-collection-options>` configured before you upgrade to 
MongoDB 8.0. If you have a ``system.buckets`` collection that isn't a time 
series collection, you cannot upgrade to MongoDB 8.0.
