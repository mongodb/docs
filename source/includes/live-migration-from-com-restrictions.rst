- You can't select an ``M0`` (Free Tier) or ``M2/M5`` shared cluster as
  the target for live migration. To migrate data from an ``M0`` (Free Tier)
  or ``M2/M5`` shared cluster to a paid cluster, see :doc:`/scale-cluster`.
- You can't live migrate from |com| to a |service| target cluster that
  has |bic| enabled.
- You can't live migrate :manual:`TTL indexes
  </core/index-ttl>`. Drop any existing TTL indexes and rebuild
  them when the migration process is complete. If you do not want to drop 
  an existing index because it is important for query performance, 
  :ref:`contact MongoDB Support <request-support>` for alternative options.