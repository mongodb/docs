- You can't select an ``M0`` (Free Tier), a {+Flex-cluster+}, or an ``M2/M5`` shared cluster as
  the destination for legacy live migration (push). To migrate data from an ``M0`` (Free 
  Tier), {+Flex-cluster+}, or ``M2/M5`` shared {+cluster+} to a paid {+cluster+}, see 
  :doc:`/scale-cluster`.
- You can't use legacy live migration (push) to migrate source {+clusters+} that contain :manual:`time series collections </core/timeseries-collections/>`.
- You can't use legacy live migration (push) to |a-service| destination {+cluster+} that has |bic| enabled.
- You can't use legacy live migration (push) to migrate to |a-service| destination {+cluster+} if you
  use |onprem| in :opsmgr:`local mode </tutorial/configure-local-mode/#local-mode>`.
- .. include:: /includes/fact-live-migration-host-alerts.rst
