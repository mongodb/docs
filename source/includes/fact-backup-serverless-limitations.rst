- You can't download {+serverless-instance+} snapshots.

- Custom policies are not supported for {+serverless-instance+}
  snapshots. |service| always takes snapshots every six hours.

  If you require finer-grained backups, consider migrating to a 
  {+dedicated-cluster+}.

- |service| doesn't support on-demand snapshots for
  {+serverless-instances+}.

- You can't restore snapshots from {+shared-clusters+}, 
  {+dedicated-clusters+}, or from |mms| to {+serverless-instances+}. 
