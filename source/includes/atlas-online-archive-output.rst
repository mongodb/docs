.. list-table::
   :header-rows: 1
   :widths: 20 10 60

   * - Field
     - Type
     - Description

   * - ``clusterName``
     - string
     - Name of the cluster that contains the collection.

   * - ``collName``
     - string
     - Name of the collection.

   * - ``criteria``
     - document
     - Criteria to use for archiving data.

   * - ``criteria.dateField``
     - string
     - Name of the date field that the online archive is based on. Data is 
       archived when the current date is greater than the value of the date 
       field plus the number of days specified via the ``archiveAfter`` option.

   * - ``criteria.expireAfterDays``
     - int
     - Number of days after which to archive data as specified using the 
       ``archiveAfter`` option. Data is archived when the current date is 
       greater than the value of the date field specified via the ``dateField`` 
       option plus the number of days specified here.

   * - ``dbName``
     - string
     - Name of the database that contains the collection.

   * - ``groupId``
     - string
     - Unique identifier of the project that contains the cluster.

   * - ``partitionFields``
     - array of documents
     - Fields to use to partition data.

   * - ``partitionFields.fieldName``
     - string
     - Name of the field.

   * - ``partitionFields.fieldType``
     - string
     - Data type of the field.

   * - ``partitionFields.order``
     - int
     - Position of the field in the partition. Value can be: 

       - ``0`` - for the first position
       - ``1`` - for the second position
       - ``2`` - for the third position

   * - ``paused``
     - boolean
     - Whether or not the online archive is paused. Value is: 

       - ``true`` if the online archive is in paused state.
       - ``false`` if the online archive is in pending or active state.

   * - ``state``
     - string
     - State of the online archive. Value can be: 

       - ``PENDING`` - Indicates archiving has not yet started. In this state,
         documents queued for archiving are still on your active |service| 
         cluster, but cannot be modified.
       - ``ACTIVE`` - Indicates archiving has started. In this state, the 
         documents that meet the criteria for archiving are archived or are being archived.
       - ``PAUSED`` - Indicates archiving has been temporarily stopped. In this 
         state, previously archived documents continue to be available on S3, but archiving operation on active cluster is on hold. You can resume archiving for paused archives at any time.
       - ``DELETED`` - Indicates online archive was deleted. When you delete an 
         online archive, associated archived documents are removed from the S3 buckets.
