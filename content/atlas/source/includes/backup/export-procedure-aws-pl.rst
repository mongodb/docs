.. procedure::
   :style: normal

   .. step:: Create an |aws| private endpoint by sending a ``POST``
      request to the Cloud Backups :oas-bump-atlas-op:`endpoint
      <creategroupbackupprivateendpoint>`.

      You must create the private endpoint in the same region as both
      the cluster from which you source snapshots and the |s3| bucket
      to which you want to export snapshots. {+service+} doesn't
      support cross-region snapshot export over a private link
      connection.
      
   .. step:: Create an export bucket by sending a ``POST`` request to
      the Cloud Backups :oas-bump-atlas-op:`endpoint
      <creategroupbackupexportbucket>`. To enable this bucket for
      PrivateLink export, you must set the
      ``requirePrivateNetworking`` field to ``true``.

      .. code-block:: javascript

         {
	   "cloudProvider": "AWS",
	   "iamRoleId": "79aa4210be5b28e406c3c305",
	   "bucketName": "exemplary-bucket",
	   "requirePrivateNetworking": true
	 }
