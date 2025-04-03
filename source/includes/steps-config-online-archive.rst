.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-online-archive.rst
      
   .. step:: Start configuring online archive for your collection.

      To configure an online archive for your collection, click: 
      
      - :guilabel:`Configure Online Archive` button the first time.
      - :guilabel:`Add Archive` button subsequently. 
      
   .. step:: Review the :guilabel:`Online Archive Overview` and click :guilabel:`Next` to proceed.
      
   .. step:: Create an :guilabel:`Archiving Rule` by providing the following information.
      
      a. Specify the collection namespace, which includes the database 
         name, the dot (``.``) separator, and the collection name (that is, 
         ``<database>.<collection>``), in the :guilabel:`Namespace` field. 
      
         You can't modify the :manual:`namespace 
         </reference/limits/#faq-dev-namespace>` once the online archive is 
         created. 
      
      #. Select the cloud provider region where you want to store your
         archived data.
      
         .. tip:: 
      
            We recommend that you select the same region as your {+cluster+}
            if possible because you might incur higher data transfer cost if
            you choose a different region.
      
         |service| displays the cloud provider regions based on the cloud
         provider where your cluster is deployed. For multi-cloud clusters,
         |service| displays the cloud provider regions of the highest
         priority provider. |service| displays a :icon-fa5:`star` next to
         the region that closely or exactly matches the region where your
         cluster is deployed. 
      
         .. tabs::
      
            .. tab:: AWS 
               :tabid: aws
      
               For |service| {+cluster+}\s deployed on |aws|, you can select one
               of the following regions: 
      
               .. include:: /includes/list-table-adf-supported-aws-regions.rst
      
            .. tab:: Azure 
               :tabid: azure
      
               For |service| {+cluster+}\s deployed on |azure|, you can select an
               |azure| region only if there are no other {+Online-Archive+}\s on
               the {+cluster+} that are using a different cloud provider. If an existing
               {+Online-Archive+} on the {+cluster+} uses |aws| or |gcp| for storing
               archived data, you can only select |aws| or |gcp| regions for any new
               {+Online-Archive+}\s on that {+cluster+}. 
      
               .. note::
      
                  For a {+cluster+} deployed on |azure|, if you have existing
                  {+Online-Archive+}\s that use |aws| or |gcp| and you delete them, 
                  you must wait five days before you can create a new 
                  {+Online-Archive+} that uses |azure|. Within this five-day period, 
                  any attempts to create a new {+Online-Archive+} still default to 
                  the cloud provider that you originally selected.
      
               For |service| {+cluster+}\s deployed on |azure|, you can select one 
               of the following regions: 
      
               .. include:: /includes/list-table-adf-supported-azure-regions.rst
      
            .. tab:: GCP 
               :tabid: gcp
      
               For |service| {+cluster+}\s deployed on |gcp|, you can select a
               |gcp| region only if there are no other {+Online-Archive+}\s on
               the {+cluster+} that are using a different cloud provider. If an existing
               {+Online-Archive+} on the {+cluster+} uses |aws| or |azure| for storing
               archived data, you can only select |aws| or |azure| regions for any new
               {+Online-Archive+}\s on that {+cluster+}. 
      
               .. note::
      
                  For a {+cluster+} deployed on |gcp|, if you have existing
                  {+Online-Archive+}\s that use |aws| or |azure| and you delete them, 
                  you must wait five days before you can create a new 
                  {+Online-Archive+} that uses |gcp|. Within this five-day period, 
                  any attempts to create a new {+Online-Archive+} still default to 
                  the cloud provider that you originally selected.
            
               For |service| {+cluster+}\s deployed on |gcp|, you can select one 
               of the following regions: 
      
               .. include:: /includes/list-table-adf-supported-gcp-regions.rst
      
         .. note:: 
      
            Once |service| creates the online archive, you can't modify the
            storage region. 
      
      #. Specify the criteria for selecting documents to archive for the 
         type of collection you want to archive.
      
         .. tabs:: 
      
            .. tab:: Standard Collection
               :tabid: standard
      
               For a standard collection, specify the criteria for 
               selecting documents to archive under the :guilabel:`Date 
               Match` or :guilabel:`Custom Criteria` tab in the |service| 
               User Interface.
      
               .. tabs:: 
      
                  .. tab:: Date Match
                     :tabid: date
      
                     To select documents from the collection using a 
                     combination of a date field and number of days:
                
                     - Specify an already indexed date field from the 
                       documents in the collection. To specify a nested 
                       field, use the :manual:`dot notation 
                       </core/document/#dot-notation>`.
                     - Specify the number of days to keep the data in the 
                       |service| cluster.
                     - Choose the date format of the specified date 
                       field. Date can be expressed as an ISO-8601-formatted 
                       date, a timestamp in UNIX epoch format, or an ObjectId. 
                       The UNIX epoch timestamp can be expressed in 
                       nanoseconds, milliseconds, or seconds. 
      
                       If you choose any of the following formats, the 
                       value of specified date field must be the 
                       :manual:`BSON type </reference/bson-types/>`
                       ``long``:
                    
                       - ``EPOCH_SECONDS``
                       - ``EPOCH_MILLIS``
                       - ``EPOCH_NANOSECONDS``
                
                       .. important::
      
                          You can't modify the date field once the online 
                          archive is created.
      
                  .. tab:: Custom Criteria
                     :tabid: custom
      
                     To select documents from the collection using a 
                     custom filter, specify a valid |json| filter to run. 
                     |service| uses the specified custom filter with the 
                     :manual:`db.collection.find(filter) 
                     </reference/method/db.collection.find/>` command. 
                     You can't use the empty document argument (``{}``) 
                     to return all documents. You can use 
                     |service-fullname| :manual:`operators 
                     </reference/operator/query/>` such as :manual:`$expr 
                     </reference/operator/query/expr/#mongodb-query-op.-expr>` 
                     to take advantage of all of the aggregation 
                     operators as shown in the following examples. 
      
                     .. note::
      
                        The following examples assume that all documents
                        include ``bucket_end_date`` fields with datetime
                        values. In the following examples, |service| archives 
                        all documents that don't include a ``bucket_end_date``
                        field and all documents where the ``bucket_end_date``
                        is not a datetime value.
      
                     .. example:: 
      
                        In this custom filter example, when the current 
                        date exceeds the date in the ``bucket_end_date`` 
                        field in the documents, |service| subtracts 
                        thirty days (specified in milliseconds) from the 
                        current date and then archives data after that 
                        many days, hours, and minutes.
      
                        .. code-block:: json 
      
                           { 
                             "$expr": { "$lte": [ 
                               "$bucket_end_date", 
                               { "$subtract": [ "$$NOW", 2592000000 ] } 
                             ] } 
                           }
      
                        In this custom filter example, when the current 
                        date exceeds the date inside an ``objectId``, 
                        |service| subtracts thirty days (specified in 
                        milliseconds) from the current date and then 
                        archives data after that many days, hours, and 
                        minutes.
                   
                        .. code-block:: json
      
                           {
                             "$expr": {
                               "$lte": [
                                 {"$toDate": "$_id"},
                                 { "$subtract": [ "$$NOW", 2592000000 ] }  
                               ]  
                             }
                           }
      
                        If you use :manual:`$expr </reference/operator/query/expr/#mongodb-query-op.-expr>` 
                        in the custom filter, sometimes the |service| 
                        cluster might be unable to use an index for 
                        archiving data. 
      
                        .. note:: 
      
                           ``$NOW`` is only supported on |service| 
                           clusters running MongoDB 4.2 or later.
      
            .. tab:: Time-Series Collection 
               :tabid: timeseries
      
               To archive documents in a :manual:`time series 
               </core/timeseries-collections/>` collection, select the 
               :guilabel:`This is a Time-Series Collection` checkbox and 
               specify the following: 
      
               - Name of the field which contains the date in each time 
                 series document. This must correspond to the ``timeField`` 
                 in the :manual:`time series 
                 </core/timeseries-collections/>` collection. To specify a 
                 nested field, use the :manual:`dot notation 
                 </core/document/#dot-notation>`. You can't modify the time 
                 field once the online archive is created.
               - Number of days to keep the data in the |service| cluster.
               - Date format of the specified date field. The date field 
                 value must be in :term:`ISODate` format. 
      
         .. note:: 
      
            .. include:: /includes/fact-online-archive-index-sufficiency-warning.rst
      
   .. step:: Specify how many days you want to store data in the online archive and a time window when you want |service| to run the archiving job.
      
      a. (Optional) Specify a :guilabel:`Data Retention Period`.
      
         By default, |service| doesn't delete archived data. However, if 
         you specify the :guilabel:`Data Retention Period`, 
         you can specify between ``7`` to ``9125`` days (25 years) to keep 
         archived data. |service| deletes archived data after the number of 
         days you specify here. This data expiration rule takes effect 
         ``24`` hours after you set the :guilabel:`Data Retention Period`. 
      
         .. warning:: 
      
            Once |service| deletes the data, you can't recover the data.
      
      #. (Optional) Specify a :guilabel:`Schedule Archiving Window`.
      
         By default, |service| periodically :ref:`runs a query to archive 
         data <online-archive-job>`. However, you can toggle the 
         :guilabel:`Schedule Archiving Window` to explicitly schedule the 
         time window during which you want |service| to archive data. You 
         can specify the following: 
      
         - Frequency. You can choose to run the job every day, on a 
           specific day of the week, or on a specific date every month. If 
           you wish to schedule the data archiving job on the 29th, 30th, 
           or 31st of every month, |service| doesn't run the archiving job 
           for months without these dates (for example, February). 
         - Time window, in hours. Select the period of time during which you
           want |service| to run the data archiving job. You must specify a 
           minimum of two hours. If a running job doesn't complete during 
           the specified time window, |service| continues to run the job 
           until it completes.
      
   .. step:: Click :guilabel:`Next` to specify the most commonly queried fields.
      
   .. step:: Specify the two most frequently queried fields in your collection to create partitions in your online archive.
      
      .. note::
      
         Archive must have at least one partition field. 
      
      .. tabs:: 
         :hidden:
      
         .. tab:: Standard Collection
            :tabid: standard
      
            .. tabs::
               :hidden:
      
               .. tab:: Date Match
                  :tabid: date 
            
                  .. include:: /includes/fact-oa-partitions-date-criteria-timeseries-collection.rst
      
               .. tab:: Custom Criteria
                  :tabid: custom
      
                  Enter up to two most commonly queried fields in the 
                  documents in the :guilabel:`Most commonly queried field` 
                  and :guilabel:`Second most commonly queried field` fields 
                  respectively. To specify nested fields, use the 
                  :manual:`dot notation </core/document/#dot-notation>`. Do 
                  not include quotes (``""``) around nested fields that you 
                  specify using :manual:`dot notation 
                  </core/document/#dot-notation>`.
      
                  The specified fields are used to partition your archived 
                  data. Partitions are similar to folders. The order of 
                  fields listed in the path is important in the same way as 
                  it is in :manual:`Compound Indexes 
                  </core/index-compound/>`. Data in the specified path is 
                  partitioned first by the value of the first field, and 
                  then by the value of the next field. |service| supports 
                  queries on the specified fields using the partitions. 
      
                  For example, suppose you are configuring the online 
                  archive for the ``movies`` collection in the 
                  ``sample_mflix`` database. If your most queried field is 
                  the ``genres`` field and your second queried field is 
                  ``title``, your partition will look similar to the 
                  following: 
      
                  .. code-block:: sh 
                     :copyable: false 
      
                     /genres/title
      
                  |service| creates partitions first for the ``genres`` 
                  field, followed by  the ``title`` field. |service| uses 
                  the partitions for queries on the following fields:
      
                  - the ``genres`` field,
                  - the ``genres`` field and the ``title`` field.
      
                  |service| can also use the partitions to support a query 
                  on the ``title`` field only. However, in this case,
                  |service| wouldn't be as efficient in supporting the 
                  query as it would be if the query were on the ``genres`` 
                  field only or the ``genres`` and ``title`` fields. 
                  Partitions are parsed in order; if a query omits a 
                  particular partition, |service| is less efficient in 
                  making use of any partitions that follow that. Since a 
                  query on ``title`` omits ``genres``, |service| doesn't 
                  use the ``genres`` partition to support this query. 
                  Also, |service| is less efficient in using the partitions 
                  to support a query on the ``title`` field followed by the 
                  ``genres`` field.
      
                  |service| can't use the partitions to support queries on 
                  fields not specified here. 
      
         .. tab:: Time-Series Collection 
            :tabid: timeseries
      
            .. include:: /includes/fact-oa-partitions-date-criteria-timeseries-collection.rst
      
      - Choose fields that contain only characters supported on 
        |aws|. To learn more about the characters to avoid, see 
        `Creating object key names
        <https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html>`__. 
        |service| skips and doesn't archive documents that contain unsupported
        characters.
      - Choose fields that do not contain polymorphic data. |service| 
        determines the data type of a partition field by sampling 10 
        documents from the collection. |service| will not archive a 
        document if the specified field value in a document does not match 
        values in other documents in the same collection.
      - Choose fields that you query frequently and order them from the 
        most frequently queried in the first position to the least queried 
        field in the last position. For example, if you frequently query on 
        the date field, then leave the date field in the first position. 
        But if you frequently query on another field, then that field 
        should be in the first position. 
      
      .. note:: 
      
         For {+Online-Archive+}\s created before June 2023, MongoDB doesn't
         recommend ``string`` type fields with high cardinality as a query
         field for {+Online-Archive+}\s. For fields of type ``string`` with
         high cardinality, |service| creates a large number of partitions.
         This doesn't apply to {+Online-Archive+}\s created after June 2023.
         To learn more, read the :website:`MongoDB blog post </blog/post/new-online-archive-performance-improvements-enhanced-metrics>`.
      
      |service| supports the following partition attribute types: 
      
      - ``date`` 
      - ``double``
      - ``int``
      - ``long``
      - ``objectId``
      - ``string`` 
      - ``boolean``
      
      To learn more about the supported partition attribute types, see 
      :ref:`Partition Attribute Types <adf-path-attribute-types>`.
      
      .. note:: 
      
         You can use the :manual:`explain
         </reference/command/explain/>` command to return information
         about the data partitions used to satisfy a query. To learn more,
         see :ref:`adf-diagnostic-cmd-explain`.
      
      While partitions improve query performance, queries that don't 
      contain these fields require a full collection scan of all archived 
      documents, which will take longer and increase your costs. To learn 
      more about how partitions improve your query performance in {+adf+}, 
      see :ref:`Data Structure in S3 <optimize-query-perf>`.
      
   .. step:: Click :guilabel:`Next` to review and confirm the online archive settings.
      You can review the following archiving rule settings: 
      
      - The name of the database and collection 
      - The name of the cloud provider and the cloud provider region 
      - The name of the date field (for :guilabel:`Date Match` only)
      - The number of days to keep data on the |service| cluster (for 
        :guilabel:`Date Match` only)
      - The number of days after which to delete archived data 
      - The frequency and time window for archiving data
            
      - The custom query to use to identify data to archive (for 
        :guilabel:`Custom Criteria` only)
      - The partition fields
      
      Click :guilabel:`Back` to edit these settings if needed.
      
   .. step:: Copy and run the displayed query in your {+mongosh+} shell to see the documents that match the criteria in the rule you defined in step 5.
      You can run :manual:`explain </reference/method/cursor.explain/>` on 
      the query to check whether it uses an index. Proceed to the next step 
      to create the index if the fields are not indexed. If the fields are 
      already indexed, skip to step 11.
      
   .. step:: (Optional) Copy and run the displayed query in your {+mongosh+} to create the required index. This ensures that your data is indexed for optimal performance.
      
   .. step:: Verify and confirm your archiving rule.
      
      a. Click :guilabel:`Begin Archiving` in the :guilabel:`Confirm an 
         online archive` tab.
      
      b. Click :guilabel:`Confirm` in the :guilabel:`Begin Archiving` 
         window.
      
      .. note:: 
      
         Once your document is queued for archiving, you can no longer edit 
         the document. See :ref:`restore-archived-data` to move archived 
         data back into the live |service| cluster.
