.. _data-lakes-api-full-response:
  
.. list-table::
   :header-rows: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``cloudProviderConfig``
     - object
     - Configuration information related to the cloud service where 
       {+fdi+} source data is stored.

   * - ``cloudProviderConfig.<provider>``
     - object
     - Name of the provider of the cloud service where the {+fdi+} 
       can access the S3 Bucket data stores. 

       {+df+} only supports ``aws``.

   * - ``cloudProviderConfig.externalId``
     - string
     - Unique identifier associated with the IAM Role that the
       {+fdi+} assumes when accessing the 
       |aws| |s3| buckets. 

   * - ``cloudProviderConfig.aws.
       iamAssumedRoleARN``
     - string
     - Amazon Resource Name (ARN) of the IAM Role that the
       {+fdi+} assumes when accessing the S3 Buckets.

       The IAM Role must support the following actions against each
       S3 bucket:

       - ``s3:GetObject``
       - ``s3:ListBucket``
       - ``s3:GetObjectVersion``

         .. note::

            ``s3:PutObject`` is optional. This action is required only if you want to use 
            :ref:`$out to S3 <adf-out-stage>`.

       For more information on S3 actions, see
       `Actions, Resources, and Condition Keys for Amazon S3 
       <https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazons3.html>`_.

   * - ``cloudProviderConfig.aws.
       iamUserARN``
     - string
     - Amazon Resource Name (ARN) of the user that the
       {+fdi+} uses when accessing the S3 Buckets.

   * - ``cloudProviderConfig.aws.roleId``
     - string
     - Unique identifier of the role that the {+fdi+} uses to 
       access the S3 Buckets.

   * - ``dataProcessRegion``
     - Optional
     - The cloud provider region to which {+df+} routes
       client connections for data processing.

       If ``null``, {+df+} routes client connections to the
       region nearest to the client based on DNS resolution.

   * - ``dataProcessRegion.cloudProvider``
     - Required
     - Name of the cloud service provider. 

       {+df+} only supports ``AWS``.

   * - ``dataProcessRegion.region``
     - Required
     - Name of the region to which {+df+} routes client 
       connections for data processing.

       {+df+} only supports the following regions:

       - ``SYDNEY_AUS`` (ap-southeast-2)
       - ``MUMBAI_IND`` (ap-south-1)
       - ``FRANKFURT_DEU`` (eu-central-1)
       - ``DUBLIN_IRL`` (eu-west-1)
       - ``LONDON_GBR`` (eu-west-2)
       - ``VIRGINIA_USA`` (us-east-1)
       - ``OREGON_USA`` (us-west-2)

   * - ``groupId``
     - string
     - The unique identifier for the project.

   * - ``hostnames``
     - array
     - The list of hostnames assigned to the {+fdi+}. Each string 
       in the array is a hostname assigned to the {+fdi+}.

   * - ``name``
     - string
     - Name of the {+fdi+}.

   * - ``state``
     - string
     - Current state of the {+fdi+}:

       - ``ACTIVE`` - The {+fdi+} is active and 
         verified. You can query it.

   * - ``storage``
     - object
     - Configuration details for each {+fdi+} and its
       mapping to MongoDB database(s) and collection(s).

   * - ``storage.databases``
     - object
     - Configuration details for mapping each {+fdi+}
       to queryable databases and collections. For complete
       documentation on this object and its nested fields, see 
       :ref:`datalake-databases-reference`.

       An empty object indicates that the {+fdi+}
       has no mapping configuration for any {+fdi+}. 

   * - ``storage.stores``
     - array
     - Each object in the array represents a {+fdi+}.
       {+df+} uses the ``storage.databases``
       configuration details to map data in each {+fdi+}
       to queryable databases and collections. For complete
       documentation on this object and its nested fields, see 
       :ref:`datalake-stores-reference`.

       An empty object indicates that the {+fdi+} has 
       no configured sources.
