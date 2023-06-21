
The following 7.0 features are not compatible with earlier versions of
MongoDB. To downgrade from MongoDB 7.0 to an earlier version, you must
remove data that uses any of the following features:

- :ref:`Capped collections <manual-capped-collection>` with a size that
  is not a multiple of 256 bytes

- Collections with ``encryptedFields`` with :ref:`range indexes
  <sharding-ranged>`

- Config servers that have collections with
  ``changeStreamPreAndPostImages`` enabled

- Config shards

- Secondary :ref:`TTL indexes <index-feature-ttl>` with :ref:`partial
  filters <index-type-partial>` on :ref:`time series collections
  <manual-timeseries-collection>`

- Time series collections with custom bucketing parameters
