- You can't select an ``M0`` (Free Tier) or ``M2/M5`` shared cluster as
  the destination for live migration. To migrate data from an ``M0`` (Free 
  Tier) or ``M2/M5`` shared {+cluster+} to a paid {+cluster+}, see 
  :doc:`/scale-cluster`.
- You can't live migrate using this migration procedure to |a-service|
  destination {+cluster+} that has |bic| enabled.
- You can't live migrate to |a-service| destination {+cluster+} if you
  use |onprem| in :opsmgr:`local mode </tutorial/configure-local-mode/#local-mode>`.
- .. include:: /includes/fact-live-migration-host-alerts.rst
