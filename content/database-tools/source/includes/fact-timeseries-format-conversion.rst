MongoDB 8.x and MongoDB 9.0 store time series collections in different
formats:

- In MongoDB 8.x, a time series collection consists of a view and a
  separate ``system.buckets.<collection>`` collection.

- Starting in MongoDB 9.0, a time series collection is a single
  collection.

When you use :dbcommand:`setFeatureCompatibilityVersion` to change the
feature compatibility version (FCV) across this boundary, the server
converts each :ref:`time series collection
<manual-timeseries-collection>` to the format that matches the new FCV.
The server records every conversion in the :term:`oplog`.

Each conversion also changes the namespace that bucket writes target,
from ``system.buckets.<collection>`` to ``<collection>``. Oplog entries
recorded before a conversion don't match the collection format that
follows it.
