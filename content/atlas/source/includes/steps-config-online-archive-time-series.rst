.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-online-archive.rst

   .. step:: Start configuring online archive for your collection.

      To configure an online archive for your collection, click:

      - :guilabel:`Configure Online Archive` button the first time.
      - :guilabel:`Add Archive` button subsequently.

   .. step:: Review the :guilabel:`Online Archive Overview` and click :guilabel:`Next` to proceed.

   .. step:: Create an :guilabel:`Archiving Rule` by providing the following information.

      a. Specify the collection namespace, which includes the database
         name, the dot (``.``) separator, and the collection name
         (that is, ``<database>.<collection>``), in the
         :guilabel:`Namespace` field.

         You can't modify the :manual:`namespace
         </reference/limits/#faq-dev-namespace>` once the online
         archive is created.

      #. Create a compound index on
         ``[control.closed, control.min.<date_field>]`` for the
         underlying ``system.bucket.<collection>`` to ensure optimal
         performance.

      #. Select the cloud provider region where you want to store
         your archived data.

         :gold:`IMPORTANT:` We recommend that you select the same
         region as your {+cluster+} if possible because you might
         incur higher data transfer cost if you choose a different
         region.

         .. include:: /includes/steps-config-online-archive-regions.rst

      #. Select the :guilabel:`This is a Time Series Collection`
         checkbox and specify the following:

         - Name of the field which contains the date in each time
           series document. This must correspond to the
           ``timeField`` in the :manual:`time series collection
           </core/timeseries-collections/>`. To specify a nested
           field, use the :manual:`dot notation
           </core/document/#dot-notation>`. You can't modify the
           time field once the online archive is created.
         - Number of days to keep the data in the |service| cluster.
         - Date format of the specified date field. The date field
           value must be in :term:`ISODate` format.

         .. important::

            .. include:: /includes/fact-online-archive-index-sufficiency-warning.rst

         .. note::

            MongoDB stores time-series data in bucket documents.
            Each bucket represents many logical measurements from
            your time-series collection. MongoDB column-compresses
            each bucket before writing it to WiredTiger pages.
            WiredTiger then :wtdocs-v5.0:`block-compresses
            </compression.html>` the pages for additional
            compression efficiency.

            MongoDB :ref:`Online Archive <online-archive-overview>`
            only operates on full bucket documents, never adding or
            removing individual measurements from each document.
            This prevents fragmentation and maintains column
            compression efficiency for each bucket.

   .. step:: Specify how many days you want to store data in the online archive and a time window when you want |service| to run the archiving job.

      a. (Optional) Specify a :guilabel:`Data Retention Period`.

         By default, |service| doesn't delete archived data.
         However, if you specify the
         :guilabel:`Data Retention Period`, you can specify between
         ``7`` to ``9125`` days (25 years) to keep archived data.
         |service| deletes archived data after the number of days
         you specify here. This data expiration rule takes effect
         ``24`` hours after you set the
         :guilabel:`Data Retention Period`.

         :red:`WARNING:` Once |service| deletes the data, you can't
         recover the data.

      #. (Optional) Specify a :guilabel:`Schedule Archiving Window`.

         By default, |service| periodically :ref:`runs a query to
         archive data <adf-oa-performance-expectations>`. However,
         you can toggle the :guilabel:`Schedule Archiving Window` to
         explicitly schedule the time window during which you want
         |service| to archive data. You can specify the following:

         - Frequency. You can choose to run the job every day, on a
           specific day of the week, or on a specific date every
           month. If you wish to schedule the data archiving job on
           the 29th, 30th, or 31st of every month, |service| doesn't
           run the archiving job for months without these dates (for
           example, February).
         - Time window, in hours. Select the period of time during
           which you want |service| to run the data archiving job.
           You must specify a minimum of two hours. If a running job
           doesn't complete during the specified time window,
           |service| continues to run the job until it completes.

   .. step:: Click :guilabel:`Next` to specify the most commonly queried fields.

   .. step:: Specify the two most frequently queried fields in your collection to create partitions in your online archive.

      :gold:`IMPORTANT:` Archive must have at least one partition
      field.

      .. include:: /includes/fact-oa-partitions-date-criteria-timeseries-collection.rst

      - Choose fields that contain only characters supported on
        |aws|. To learn more about the characters to avoid, see
        `Creating object key names
        <https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html>`__.
        |service| skips and doesn't archive documents that contain
        unsupported characters.
      - Choose fields that do not contain polymorphic data.
        |service| determines the data type of a partition field by
        sampling 10 documents from the collection. |service| will
        not archive a document if the specified field value in a
        document does not match values in other documents in the
        same collection.
      - Choose fields that you query frequently and order them from
        the most frequently queried in the first position to the
        least queried field in the last position.

      :gold:`IMPORTANT:` For {+Online-Archive+}\s created before
      June 2023, MongoDB doesn't recommend ``string`` type fields
      with high cardinality as a query field for
      {+Online-Archive+}\s. For fields of type ``string`` with high
      cardinality, |service| creates a large number of partitions.
      This doesn't apply to {+Online-Archive+}\s created after
      June 2023. To learn more, read the :website:`MongoDB blog post
      </blog/post/new-online-archive-performance-improvements-enhanced-metrics>`.

      |service| supports the following partition attribute types:

      - ``date``
      - ``double``
      - ``int``
      - ``long``
      - ``objectId``
      - ``string``
      - ``boolean``

      To learn more about the supported partition attribute types,
      see :ref:`Partition Attribute Types <adf-path-attribute-types>`.

      :gold:`IMPORTANT:` You can use the :manual:`explain
      </reference/command/explain/>` command to return information
      about the data partitions used to satisfy a query. To learn
      more, see :ref:`adf-diagnostic-cmd-explain`.

      While partitions improve query performance, queries that don't
      contain these fields require a full collection scan of all
      archived documents, which will take longer and increase your
      costs. To learn more about how partitions improve your query
      performance in {+adf+}, see
      :ref:`Data Structure in S3 <optimize-query-perf>`.

   .. step:: Click :guilabel:`Next` to review and confirm the online archive settings.

      You can review the following archiving rule settings:

      - The name of the database and collection
      - The name of the cloud provider and the cloud provider region
      - The name of the time field
      - The number of days to keep data on the |service| cluster
      - The number of days after which to delete archived data
      - The frequency and time window for archiving data
      - The partition fields

      Click :guilabel:`Back` to edit these settings if needed.

   .. step:: Copy and run the displayed query in your {+mongosh+} shell to see the documents that match the criteria in the rule you defined.

      You can run :manual:`explain
      </reference/method/cursor.explain/>` on the query to check
      whether it uses an index. Proceed to the next step to create
      the index if the fields are not indexed. If the fields are
      already indexed, skip to the final step.

   .. step:: (Optional) Copy and run the displayed query in your {+mongosh+} to create the required index. This ensures that your data is indexed for optimal performance.

   .. step:: Verify and confirm your archiving rule.

      a. Click :guilabel:`Begin Archiving` in the
         :guilabel:`Confirm an online archive` tab.

      b. Click :guilabel:`Confirm` in the
         :guilabel:`Begin Archiving` window.

      :red:`WARNING:` Once your document is queued for archiving,
      you can no longer edit the document. See
      :ref:`restore-archived-data` to move archived data back into
      the live |service| cluster.
