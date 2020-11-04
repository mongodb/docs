.. list-table:: 
   :header-rows: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - ``id`` 
     - string 
     - ID of the online archive.

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
     - Name of the date field that the online archive is based on. 
       Data is archived when the current date is greater than the 
       value of the date field specified here plus the number of days 
       specified via the ``expireAfterDays`` parameter.

   * - ``criteria.expireAfterDays``
     - int
     - Number of days that specifies the age limit for the data 
       in the live |service| cluster. Data is archived when the current 
       date is greater than the value of the date field specified via 
       the ``dateField`` parameter plus the number of days specified 
       here.

   * - ``dbName``
     - string
     - Name of the database that contains the collection.

   * - ``groupId``
     - string
     - Unique identifier of the project that contains the cluster.

   * - ``partitionFields``
     - document array
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
     - State of the online archive. Value is: 

       - ``true`` if the online archive is in paused state.
       - ``false`` if the online archive is in pending or active state.

   * - ``state``
     - string 
     - Status of the online archive. Valid values are: 

       .. include:: /includes/fact-online-archive-statuses.rst
