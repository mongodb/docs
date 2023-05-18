- You can't select an ``M0`` (Free Tier) or ``M2/M5`` shared cluster as
  the destination for live migration. To migrate data from an ``M0`` (Free 
  Tier) or ``M2/M5`` shared {+cluster+} to a paid {+cluster+}, see 
  :doc:`/scale-cluster`.
- You can't live migrate from |com| to an |service| destination {+cluster+}
  that has |bic| enabled.
- You can't live migrate from |onprem| in :opsmgr:`local mode 
  </tutorial/configure-local-mode/#local-mode>` to an |service| destination
  {+cluster+}.
- .. include:: /includes/fact-live-migration-host-alerts.rst
