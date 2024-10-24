- You can't disable backup of {+Serverless-instances+}.

- You can't download {+Serverless-instance+} snapshots.

- Custom policies are not supported for {+Serverless-instance+}
  snapshots. |service| always takes snapshots every six hours.

  If you require finer-grained backups, consider migrating to a 
  {+dedicated-cluster+}.

- |service| doesn't support on-demand snapshots for
  {+Serverless-instances+}.

- You can't restore snapshots from {+Shared-clusters+}, 
  {+dedicated-clusters+}, or from |mms| to {+Serverless-instances+}. 
