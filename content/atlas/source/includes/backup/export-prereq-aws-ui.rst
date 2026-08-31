.. procedure::
   :style: normal

   .. step:: Set up AWS access for |service|.
    
      Follow the directions in :ref:`set-up-unified-aws-access` to 
      create and authorize an |aws| access role in |service|. A cloud 
      provider access role is a record in |service| that identifies an 
      :aws:`AWS IAM role </IAM/latest/UserGuide/id_roles_use.html>` in 
      your |aws| account and allows |service| to assume the role to 
      access your |aws| resources.

      Save the ``roleId`` value of the access role for later use when
      you :ref:`configure an export bucket
      <cloud-backup-configure-snapshot-policy-aws>` in |service|.

   .. step:: Create an |aws| |s3| bucket.
    
      If you do not have an existing |aws| |s3| bucket to store
      your exported snapshots, create an Amazon |s3| general purpose
      bucket in the region of your choice.

      To learn how to create an |aws| |s3| bucket, see the :aws:`Amazon
      S3 documentation
      </AmazonS3/latest/userguide/create-bucket-overview.html>`.

   .. step:: Attach a bucket access policy to the |aws| IAM role.
     
      Create and attach an :aws:`identity-based policy </IAM/latest/UserGuide/access_policies_create.html>`
      to the |aws| IAM role that grants it write access permissions to the 
      |aws| |s3| bucket.

      a. Save the following example policy to a file named
         ``s3-access-policy.json`` and replace the ``<bucketName>``
         placeholders with the name of your |aws| |s3| bucket. 
         
         The policy grants ``s3:PutObject`` and ``s3:GetBucketLocation``
         permissions to the |aws| IAM role for the specified bucket.

         .. code-block:: json
            :copyable: true
            :caption: s3-access-policy.json

            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": "s3:GetBucketLocation",
                  "Resource": "arn:aws:s3:::<bucketName>"
                },
                {
                  "Effect": "Allow",
                  "Action": "s3:PutObject",
                  "Resource": "arn:aws:s3:::<bucketName>/*"
                }
              ]
            }

      b. Copy the following |aws| CLI commands and replace the
         ``<roleName>`` placeholders with your |aws| IAM role name.
         Then, run the commands from the command prompt to create and
         attach the policy to the |aws| IAM role.

         To install the AWS CLI, see the :aws:`AWS CLI documentation
         </cli/latest/userguide/cli-chap-install.html>`.

         .. code-block:: bash
            :copyable: true
            :caption: Attach policy to IAM role

            # Get your AWS account ID
            AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

            # Create policy
            aws iam create-policy \
              --policy-name MongoDBAtlasSnapshotExportPolicy \
              --policy-document file://s3-access-policy.json

            # Attach to role
            aws iam attach-role-policy \
              --role-name <roleName> \
              --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/MongoDBAtlasSnapshotExportPolicy

         These commands grant the same permissions as the
         ``put-role-policy`` command that the {+atlas-ui+} displays when
         you :ref:`create the export bucket configuration
         <cloud-backup-configure-snapshot-policy-aws>`. If you attach
         the policy now, you only need to confirm it in the
         {+atlas-ui+}.

      To learn how to create an |aws| identity-based policy using the
      |aws| Management Console or other methods, see the :aws:`Amazon S3
      policies documentation
      </IAM/latest/UserGuide/access_policies_create.html>`.

   .. step:: (Optional) Create a {+Cloud-Backup+} private endpoint using the {+atlas-admin-api+} for export over |aws| PrivateLink.

      If you want to enable snapshot exports over |aws| PrivateLink,
      create a {+Cloud-Backup+} PrivateLink endpoint by sending a ``POST``
      request to the {+Cloud-Backup+} :oas-bump-atlas-op:`Create One
      Object Storage Private Endpoint
      <creategroupbackupprivateendpoint>` endpoint. This creates a
      private connection between the cluster from which you source
      snapshots and the |s3| bucket to which you want to export
      snapshots.

      In the request body, specify the following fields:  
      
      .. list-table::
         :header-rows: 1
         :widths: 25 60 15

         * - Request Body Field
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
         
         The following request body defines an |aws| backup private 
         endpoint that {+service+} can use to export snapshots from
         an |aws| source cluster in ``us-west-2`` to an |aws| |s3| 
         bucket in ``us-east-1`` over a private connection:

         .. code-block:: javascript

            {
              "cloudProvider": "AWS",
              "regionName": "US_EAST_1",
              "vpcRegionName": "US_WEST_2"
            }
