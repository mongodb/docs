.. list-table:: 
   :header-rows: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - id
     - string 
     - ID of the online archive.

   * - clusterName
     - string
     - Name of the cluster that contains the collection.

   * - collName
     - string
     - Name of the collection.

   * - collectionType
     - string 
     - Type of collection. Value can be one of the following: 

       - ``STANDARD`` - for standard collection 
       - ``TIMESERIES`` - for :manual:`time series 
         </core/timeseries-collections/>` collection

         .. include:: /includes/fact-oa-timeseries-preview.rst

   * - criteria
     - document
     - Criteria to use for archiving data.

   * - criteria.type
     - string
     - Type of criteria. Value can be one of the following: 

       - ``DATE`` - to select documents for archiving based on a date.
       - ``CUSTOM`` - to select documents for archiving based on a 
         custom |json| query. 

   * - criteria.dateField
     - string
     - If ``"criteria.type" : "DATE"``, name of the date field that 
       the online archive is based on. Data is archived when the 
       current date is after the date specified here plus the number of 
       days specified via the ``expireAfterDays`` parameter.

   * - criteria.dateFormat
     - enum
     - If ``"criteria.type" : "DATE"``, the date format. Value can be
       one of the following:

       - ``ISODATE`` - ISO-8601 format date (default)
       - ``EPOCH_SECONDS`` - Unix timestamp in seconds
       - ``EPOCH_MILLIS`` - Unix timestamp in milliseconds
       - ``EPOCH_NANOSECONDS`` - Unix timestamp in nanoseconds

   * - criteria.expireAfterDays
     - int
     - If ``"criteria.type" : "DATE"``, number of days that specifies 
       the age limit for the data in the live |service| cluster. Data is 
       archived when the current date is greater than the value of the 
       date field specified via the ``dateField`` parameter plus the number 
       of days specified here.

   * - criteria.query
     - int
     - If ``"criteria.type" : "CUSTOM"``, |json| query used to select 
       documents for archiving. The specified query is used with the 
       :manual:`db.collection.find(query) 
       </reference/method/db.collection.find/>` command.

   * - dataExpirationRule
     - object
     - Rule that specifies when data should be deleted from the 
       archive. The data expiration rule takes effect only after 24 
       hours.
    
   * - dataExpirationRule.expireAfterDays
     - int 
     - Number of days after which |service| must delete archived data. 
       Value can be between ``7`` and ``9125`` days (25 years). 
       |service| deletes archived data after the number of days you 
       specify here.

   * - dbName
     - string
     - Name of the database that contains the collection.

   * - groupId
     - string
     - Unique identifier of the project that contains the cluster.

   * - partitionFields
     - document array
     - Fields to use to partition data. 

   * - partitionFields.fieldName
     - string
     - Name of the field. 

   * - partitionFields.fieldType
     - string
     - Data type of the field.

   * - partitionFields.order
     - int
     - Position of the field in the partition. Value can be: 

       - ``0`` - for the first position 
       - ``1`` - for the second position
       - ``2`` - for the third position

   * - paused
     - boolean
     - State of the online archive. Value is: 

       - ``true`` if the online archive is in paused state.
       - ``false`` if the online archive is in pending or active state.

   * - state
     - string 
     - Status of the online archive. Valid values are: 

       .. include:: /includes/fact-online-archive-statuses.rst
