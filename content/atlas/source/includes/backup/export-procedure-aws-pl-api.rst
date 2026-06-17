.. procedure::
   :style: normal

   .. step:: Create an |s3| Bucket in |aws|.

      Create an |s3| bucket in |aws| to which you want to export
      snapshots. To learn how to create an |aws| |s3| bucket, see the
      :aws:`Amazon S3 documentation
      </AmazonS3/latest/userguide/create-bucket-overview.html>`.

      .. example:: 

         To create an |s3| bucket named ``exemplary-bucket`` in the
         |aws| region ``us-east-1``, run the following command using
         the :aws:`AWS CLI
         </cli/latest/userguide/getting-started-install.html>`:

         .. code-block:: bash

            aws s3 mb s3://exemplary-bucket --region us-east-1

   .. step:: Create an |aws| backup private endpoint.
    
      Create a backup private endpoint using the 
      :oas-bump-atlas-op:`Create One Object Storage Private Endpoint for Cloud Backups <creategroupbackupprivateendpoint>` 
      endpoint. 

      In the request body, specify the following parameters:  
      
      .. list-table::
         :header-rows: 1
         :widths: 25 60 15

         * - Request Body Parameter
           - Value
           - Necessity
         * - ``cloudProvider``
           - ``AWS``
           - Required
         * - ``regionName``
           - The |aws| region of the |s3| bucket that you want to export
             snapshots to.
           - Required
         * - ``vpcRegionName``
           - The |aws| region of the source cluster where your snapshots
             are stored. {+service+} provisions a |vpc| interface
             endpoint in this region to enable export over a private
             connection between the source cluster and the |s3| bucket
             in the specified ``regionName``. This can be the same or a
             different region from the |s3| bucket that you specify in
             ``regionName``.
              
             Defaults to the value of ``regionName`` if not specified.
           - Optional
         
      .. example:: 
         
         The following request body creates an |aws| backup private 
         endpoint that {+service+} can use to export snapshots from
         an |aws| source cluster in ``us-west-2`` to an |aws| |s3| 
         bucket in ``us-east-1`` over a private connection:

         .. code-block:: javascript

            {
              "cloudProvider": "AWS",
              "regionName": "US_EAST_1",
              "vpcRegionName": "US_WEST_2"
            }
      
   .. step:: Create an {+service+} export bucket configuration with private networking enabled. 
    
      Create a bucket configuration in {+service+} that references an 
      existing |aws| |s3| bucket using the 
      :oas-bump-atlas-op:`Create One Snapshot Export Bucket <creategroupbackupexportbucket>`
      endpoint.
      
      To enable this bucket for export over an |aws| PrivateLink 
      connection, set the ``requirePrivateNetworking`` field to 
      ``true`` . This tells {+service+} to use the private endpoint 
      you created in the previous step to export snapshots to the bucket
      over a private connection.

      .. example:: 
         
         The following request body creates an export bucket 
         configuration for an existing |aws| |s3| bucket named 
         ``exemplary-bucket``. This {+service+} bucket configuration 
         requires {+service+} to export all snapshots over a private 
         endpoint. 

         .. code-block:: javascript

            {
              "cloudProvider": "AWS",
              "iamRoleId": "$ROLE_ID", # Replace with the ID of the cloud provider access role that you created for your AWS IAM role
              "bucketName": "exemplary-bucket",
              "requirePrivateNetworking": true
            }
