.. important:: Live Migration (push) Deprecated or Not Supported for Source Deployments Managed or Monitored by Ops Manager
      
  - For source deployments running any MongoDB 6.0.+ versions, where the
    deployments are managed or monitored by |onprem|, live migration (push) is not supported.
  - For source deployments running any MongoDB 5.0 and earlier versions,
    where the deployments are managed or monitored by |onprem|,
    live migration (push) is deprecated.
  - For source deployments running MongoDB 6.0.+, where the deployments
    are monitored by |cloud-short|, live migration (push) is supported.
    To learn more, see
    :atlas:`Live Migrate Your MongoDB Cluster Monitored by Cloud Manager to Atlas </import/c2c-push-live-migration/>`.
