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
       {+data-lake+} source data is stored.

   * - ``cloudProviderConfig.<provider>``
     - object
     - Name of the provider of the cloud service where {+data-lake-short+} 
       can access the S3 Bucket data stores. 

       {+data-lake-short+} only supports ``aws``.

   * - ``cloudProviderConfig.externalId``
     - string
     - Unique identifier associated with the IAM Role that 
       {+data-lake-short+} assumes when accessing the 
       {+data-lake-stores+}. 

   * - ``cloudProviderConfig.aws.
       iamAssumedRoleARN``
     - string
     - Amazon Resource Name (ARN) of the IAM Role that
       {+data-lake-short+} assumes when accessing S3 Bucket 
       {+data-lake-stores+}.

       The IAM Role must support the following actions against each
       S3 bucket:

       - ``s3:GetObject``
       - ``s3:ListBucket``
       - ``s3:GetObjectVersion``

       For more information on S3 actions, see
       `Actions, Resources, and Condition Keys for Amazon S3 
       <https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazons3.html>`_.

   * - ``cloudProviderConfig.aws.
       iamUserARN``
     - string
     - Amazon Resource Name (ARN) of the user that
       {+data-lake-short+} assumes when accessing S3 Bucket 
       {+data-lake-stores+}.

   * - ``cloudProviderConfig.aws.roleId``
     - string
     - Unique identifier of the role that {+data-lake-short+} uses to 
       access the {+data-lake-stores+}.

   * - ``dataProcessRegion``
     - Optional
     - The cloud provider region to which {+data-lake+} routes
       client connections for data processing.

       If ``null``, the {+data-lake+} routes client connections to the
       region nearest to the client based on DNS resolution.

   * - ``dataProcessRegion.cloudProvider``
     - Required
     - Name of the cloud service provider. 

       {+data-lake+} only supports ``AWS``.

   * - ``dataProcessRegion.region``
     - Required
     - Name of the region to which {+data-lake+} routes client 
       connections for data processing.

       {+data-lake+} only supports the following regions:

       - ``SYDNEY_AUS`` (ap-southeast-2)
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
     - The list of hostnames assigned to the {+data-lake+}. Each string 
       in the array is a hostname assigned to the {+data-lake+}.

   * - ``name``
     - string
     - Name of the {+data-lake+}.

   * - ``state``
     - string
     - Current state of the {+data-lake+}:

       - ``ACTIVE`` - The {+data-lake-short+} is active and 
         verified. You can query the {+data-lake-stores+} associated 
         with the {+data-lake+}.

   * - ``storage``
     - object
     - Configuration details for each {+data-lake-store+} and its
       mapping to MongoDB database(s) and collection(s).

   * - ``storage.databases``
     - object
     - Configuration details for mapping each {+data-lake-store+}
       to queryable databases and collections. For complete
       documentation on this object and its nested fields, see 
       :ref:`datalake-databases-reference`.

       An empty object indicates that the {+data-lake-short+}
       has no mapping configuration for any {+data-lake-store+}. 

   * - ``storage.stores``
     - array
     - Each object in the array represents a {+data-lake-store+}.
       {+data-lake-short+} uses the ``storage.databases``
       configuration details to map data in each {+data-lake-store+}
       to queryable databases and collections. For complete
       documentation on this object and its nested fields, see 
       :ref:`datalake-stores-reference`.

       An empty object indicates that the {+data-lake-short+} has 
       no configured {+data-lake-stores+}.
