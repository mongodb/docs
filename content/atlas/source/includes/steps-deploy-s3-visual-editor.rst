a. Select the dataset for your {+fdi+} from the :guilabel:`Data Sources`
   section.

   Click :guilabel:`Add Data Sources` to select your data store.

#. Specify your data store.

   Choose :guilabel:`Amazon S3` to configure a {+fdi+} for data in |aws| 
   |s3| buckets.

   Corresponds to :datalakeconf-aws:`stores.[n].provider` |json| 
   configuration setting.

#. Select an |aws| IAM role for |service|.

   You can select an existing |aws| IAM role that |service| is 
   authorized for from the role selection dropdown list or choose 
   :guilabel:`Authorize an AWS IAM Role` to authorize a new role. 
  
   If you selected an existing role that |service| is authorized for, 
   proceed to the next step to list your |aws| |s3| buckets. 
  
   If you are authorizing |service| for an existing role or are creating 
   a new role, complete the following steps before proceeding to the 
   next step:
  
   i. Select :guilabel:`Authorize an AWS IAM Role` to authorize a new 
      role or select an existing role from the dropdown and click 
      :guilabel:`Next`.

   #. Use the |aws| :abbr:`ARN (Amazon Resource Name)` and unique 
      External ID in the :guilabel:`Add Atlas to the trust relationships 
      of your AWS IAM role` section to add |service| to the trust 
      relationships of an existing or new |aws| IAM role. 

      In the |service| UI, click and expand one of the following:

      - The :guilabel:`Create New Role with the AWS CLI` shows how to 
        use the |arn| and the unique External ID to add |service| to the 
        trust relationships of a new |aws| |iam| role. Follow the steps 
        in the |service| UI for creating a new role. To learn more, see  
        :atlas:`Create New Role with the AWS CLI 
        </security/set-up-unified-aws-access/#procedure>`. 

        When authorizing a new role, if you quit the ``Configure a New 
        Data Lake`` workflow: 
     
        - Before validating the role, |service| will not create the 
          {+fdi+}. You can go to the |service| :guilabel:`Integrations` 
          page to :atlas:`authorize 
          </security/set-up-unified-aws-access/>` a new role. You can 
          :atlas:`resume </security/set-up-unified-aws-access/#resume-an-authorization-procedure>` 
          the workflow when you have the |aws| IAM role |arn|.
        - After validating the role, |service| will not create the 
          {+fdi+}. However, the role is available in the role selection 
          dropdown and can be used to create a {+fdi+}. You do not need 
          to authorize the role again. 

      - The :guilabel:`Add Trust Relationships to an Existing Role` 
        shows how to use the |arn| and the unique External ID to add 
        |service| to the trust relationships of an existing |aws| |iam| 
        role. Follow the steps in the |service| UI for adding |service| 
        to the trust relationship to an existing role. To learn more, 
        see :atlas:`Add Trust Relationships to an Existing Role 
        </security/set-up-unified-aws-access/#procedure>` . 

      :gold:`IMPORTANT:` If you modify your custom |aws| role |arn| in 
      the future, verify that the access policy for the role includes the 
      appropriate access to the |s3| resources for the {+fdi+}.

      For further information, see
        - :atlas:`Set Up Unified AWS Access 
          </security/set-up-unified-aws-access/>`
        - :oas-bump-atlas-op:`Create a Cloud Provider Access Role 
          <creategroupcloudprovideraccess>`

   #. Click :guilabel:`Next`.

#. Enter the S3 bucket information.

   i. Enter the name of your S3 bucket.

      Corresponds to :datalakeconf-aws:`stores.[n].bucket` |json| 
      configuration setting.

   #. Specify whether the bucket is :guilabel:`Read-only` or both 
      :guilabel:`Read and write`. 

      |service| can only query :guilabel:`Read-only` buckets; if you 
      wish to query and save query results to your |s3| bucket, choose 
      :guilabel:`Read and write`. To save query results to your |s3| 
      bucket, the role policy that grants |service| access to your |aws| 
      resources must include the ``s3:PutObject`` and 
      ``s3:DeleteObject`` permissions in addition to the 
      ``s3:ListBucket``, ``s3:GetObject``, ``s3:GetObjectVersion``, and 
      ``s3:GetBucketLocation`` permissions, which grant read access. See 
      step 4 below to learn more about assigning access policy to your 
      |aws| |iam| role.
  
   #. Select the region of the |s3| bucket. 

      Corresponds to :datalakeconf-aws:`stores.[n].region` |json| 
      configuration setting.

      :gold:`IMPORTANT:` You can't create a {+fdi+} if {+adf+} is unable 
      to retrieve the region of the specified |s3| bucket.
  
   #. **Optional**. Specify a prefix that {+df+} should use when 
      searching the files in the |s3| bucket. If omitted, {+df+} 
      does a recursive search for all files from the root of the |s3| 
      bucket.

      Corresponds to :datalakeconf-aws:`stores.[n].prefix` |json| 
      configuration setting.

   #. Click :guilabel:`Next`.

#. Assign an access policy to your |aws| IAM role.

   i. Follow the steps in the |service| user interface to assign an 
      access policy to your |aws| IAM role.

      Your role policy for read-only or read and write access should look similar to the following:

      .. tabs:: 

         .. tab:: Read-Only Access 
            :tabid: readonly

            .. code-block:: json 
              
               {
                 "Version": "2012-10-17",
                 "Statement": [
                   {
                     "Effect": "Allow",
                     "Action": [
                       "s3:ListBucket",
                       "s3:GetObject",
                       "s3:GetObjectVersion",
                       "s3:GetBucketLocation"
                     ],
                     "Resource": [
                       <role arn>
                     ]
                   }
                 ]
               }

         .. tab:: Read-Write Access 
            :tabid: readwrite

            .. code-block:: json 
              
               {
                 "Version": "2012-10-17",
                 "Statement": [
                   {
                     "Effect": "Allow",
                     "Action": [
                       "s3:ListBucket",
                       "s3:GetObject",
                       "s3:GetObjectVersion",
                       "s3:GetBucketLocation",
                       "s3:PutObject",
                       "s3:DeleteObject"
                     ],
                     "Resource": [
                       <role arn>
                     ]
                   }
                 ]
               }

   #. Click :guilabel:`Next`.

#. Define the path structure for your files in the |s3| bucket and click
   :guilabel:`Next`.

   For example: 

   .. code-block:: sh
     
      s3://<bucket-name>/<path>/<to>/<files>/<filename>.<file-extension>

   To add additional paths to data on your |s3| bucket, click 
   :guilabel:`Add Data Source` and enter the path. To learn more about 
   paths, see :ref:`adf-path-syntax`.

   Corresponds to 
   :datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].path` 
   |json| configuration setting.

#. Create the virtual databases, collections, and views and map the
   databases, collections, and views to your data store.

   i. (Optional) Click the :icon-fa4:`pencil` for the:

      - Database to edit the database name. Defaults to ``VirtualDatabase[n]``. 

        Corresponds to ``databases.[n].name`` |json| configuration 
        setting.

      - Collection to edit the collection name. Defaults to 
        ``VirtualCollection[n]``. 
       
        Corresponds to ``databases.[n].collections.[n].name`` |json| 
        configuration setting.

      - View to edit the view name. 

      You can click: 
     
      - :guilabel:`Add Database` to add databases and collections. 
      - :icon-fa4:`plus` associated with the database to add collections 
        to the database. 
      - :icon-fa4:`plus` associated with the collection to add 
        :manual:`views </core/views/>` on the collection. To create a 
        view, you must specify: 
       
        - The name of the view.
        - The :manual:`pipeline 
          </core/aggregation-pipeline/#std-label-aggregation-pipeline>` 
          to apply to the view.

          The view definition pipeline cannot include the ``$out`` or 
          the ``$merge`` stage. If the view definition includes 
          nested pipeline stages such as ``$lookup`` or ``$facet``, 
          this restriction applies to those nested pipelines as well.

        To learn more about views, see: 

        - :manual:`Views </core/views/>`
        - :manual:`db.createView </reference/method/db.createView/>`

      - :icon-fa4:`trash-o` associated with the database, collection, or 
        view to remove it.

   #. Select :guilabel:`AWS S3` from the dropdown in the 
      :guilabel:`Data Sources` section.
   #. Drag and drop the data store to map with the collection.

      Corresponds to ``databases.[n].collections.[n].dataSources`` 
      |json| configuration setting.
